// TODO:
// header containing username, back button, menu button on right side
// on component mount, enable isLoading
// make connection with the web socket
// get date from the web socket in array form

import React, {useState, FC, useEffect, useMemo, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Message,
} from 'react-native-gifted-chat';
import CustomHeader from '../../Components/CustomHeader';
import {darkColors} from '../../Constants/Colors';
//@ts-ignore
import {BASE_ADDRESS} from 'react-native-dotenv';
import {useStateValue} from '../../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Sizes, Width} from '../../Constants/Size';

type props = {
  navigation: any;
};

const ICON_SIZE = Width * 0.07;

const Chat: FC<props> = ({navigation}) => {
  const [Messages, setMessages] = useState<Array<any>>([]);
  const [isLoading, setisLoading] = useState(true);
  const [Input, setInput] = useState('');
  // global state
  const [state, dispatch] = useStateValue();

  const textInput = useRef<any>(null);

  const socket = useMemo(
    () => new WebSocket(`ws://${BASE_ADDRESS}/ws/chat/cakemonster/testing/`),
    [],
  );

  const onSend = message => {
    // const [{text}] = message;
    if (Input !== '') {
      setInput('');
      socket.send(message);
    }
  };

  // lose the focus of text input when keyboard is not showing
  Keyboard.addListener('keyboardDidHide', e => {
    console.log('Listening to keyboard');
    if (textInput !== null && textInput.current !== null) {
      textInput.current.blur();
    }
  });

  socket.onmessage = function (e) {
    const response = JSON.parse(e.data);

    const timestamp =
      response.timestamp.slice(0, 10) +
      'T' +
      response.timestamp.slice(11, response.timestamp.length);
    setMessages(prev => [
      {
        _id: response.id,
        text: response.message,
        createdAt: new Date(timestamp),
        user: {
          _id: response.user_name,
          name: response.user_name,
          // avatar: 'https://placeimg.com/140/140/any',
        },
        sent: true,
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    socket.onopen = function () {
      console.log('Socket connection');
    };

    return () => {
      console.log('Unmounting');
      socket.onclose = function () {
        console.log('Closing socket connection');
      };
    };
  }, []);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'Angelic'}
        back
        onBackPress={() => {
          // close the socket connection
          socket.close = function () {
            console.log('Closing socket connection');
          };
          navigation.goBack();
        }}
      />

      <GiftedChat
        messages={Messages}
        user={{
          _id: state.user.userName,
          name: 'Angelic',
        }}
        // onSend={message => onSend(message)}
        scrollToBottom
        alignTop
        alwaysShowSend
        bottomOffset={10}
        // keyboardShouldPersistTaps="never"
        renderSend={props => {
          return (
            <Send
              {...props}
              containerStyle={styles.sendContainer}
              onSend={message => onSend(message)}>
              <TouchableOpacity
                style={{
                  paddingVertical: 20,
                }}
                onPress={e => onSend(Input.trim())}>
                <Text
                  style={{
                    color: state.theme.TOMATO_COLOR,
                    fontSize: Sizes.normal,
                  }}>
                  Send
                </Text>
              </TouchableOpacity>
            </Send>
          );
        }}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              borderTopColor: state.theme.TOMATO_COLOR,
              backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
            }}
          />
        )}
        renderComposer={() => {
          return (
            <View
              style={[
                styles.messageInputContainer,
                {
                  backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR,
                },
              ]}>
              <TextInput
                placeholder={'Type a message...'}
                style={[
                  styles.messageInputField,
                  {
                    borderColor: state.theme.TOMATO_COLOR,
                    color: state.theme.TEXT_COLOR,
                  },
                ]}
                ref={textInput}
                placeholderTextColor={state.theme.TEXT_COLOR}
                value={Input}
                onChangeText={setInput}
                onFocus={e => {
                  console.log('Text input focus');
                  // Keyboard.addListener('keyboardWillShow', () =>
                  //   console.log('Opening keyboard'),
                  // );
                }}
                onBlur={e => console.log('text input  blur')}
                multiline
                // autoFocus={focusTextInput ? true : false}
                scrollEnabled
                showSoftInputOnFocus={true}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  messageInputContainer: {
    flex: 0.9,
  },
  messageInputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    fontSize: Sizes.normal * 0.9,
  },
  sendContainer: {
    flex: 0.1,
    marginRight: 10,
    marginBottom: 5,
    height: 60,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
