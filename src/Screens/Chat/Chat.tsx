// TODO:
// header containing username, back button, menu button on right side
// on component mount, enable isLoading
// make connection with the web socket
// get date from the web socket in array form

import React, {useState, FC, useEffect, useMemo, useRef} from 'react';
import {StyleSheet, Text, View, TextInput, Keyboard, Image} from 'react-native';
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

  const [state, dispatch] = useStateValue();

  const textInput = useRef<any>(null);

  const socket = useMemo(
    () =>
      new WebSocket(
        `ws://${BASE_ADDRESS}/ws/chat/${state.user.userName}/cakemonster/`,
      ),
    [],
  );

  const onSend = message => {
    const [{text}] = message;
    socket.send(text);
  };

  // lose the focus of text input when keyboard is not showing
  Keyboard.addListener('keyboardDidHide', e => {
    if (textInput !== null && textInput.current !== null) {
      textInput.current.blur();
    }
  });

  useEffect(() => {
    socket.onopen = function () {
      console.log('Socket connection');
    };

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
        },
        ...prev,
      ]);
    };
    return () => {
      // console.log('Unmounting');
      // socket.onclose = function () {
      //   console.log('Closing socket connection');
      // };
    };
  }, []);

  return (
    <View style={styles.parent}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'Angelic'}
        back
        onBackPress={() => {
          // close the socket connection
          // socket.close = function () {
          //   console.log('Closing socket connection');
          // };
          navigation.goBack();
        }}
      />
      <GiftedChat
        messages={Messages}
        user={{
          _id: state.user.userName,
          name: 'Angelic',
        }}
        onSend={message => onSend(message)}
        scrollToBottom
        alignTop
        keyboardShouldPersistTaps="never"
        // renderSend={props => {
        //   return (
        //     <Send
        //       {...props}
        //       onSend={message => onSend(message)}
        //       containerStyle={{backgroundColor: 'white'}}>
        //       <View
        //         style={{
        //           // flex: 0.1,
        //           paddingVertical: 20,
        //           backgroundColor: darkColors.TOMATO_COLOR,
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //         }}>
        //         <Ionicons
        //           name={'md-send'}
        //           size={ICON_SIZE}
        //           color={darkColors.TOMATO_COLOR}
        //         />
        //       </View>
        //     </Send>
        //   );
        // }}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              borderTopColor: darkColors.SCREEN_BACKGROUND_COLOR,
              backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
            }}
          />
        )}
        renderComposer={() => {
          return (
            <View
              style={{
                backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
                flex: 0.9,
              }}>
              <TextInput
                placeholder={'Type a message...'}
                style={styles.messageInputField}
                ref={textInput}
                placeholderTextColor={darkColors.TEXT_COLOR}
                // value={Input.trim() === '' ? '' : Input}
                // onChangeText={setInput}
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
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  messageInputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: darkColors.TOMATO_COLOR,
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
});
