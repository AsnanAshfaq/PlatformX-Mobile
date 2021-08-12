// TODO:
// header containing username, back button, menu button on right side
// on component mount, enable isLoading
// make connection with the web socket
// get date from the web socket in array form

import React, {useState, FC, useEffect, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import CustomHeader from '../../Components/CustomHeader';
import {darkColors} from '../../Constants/Colors';
import getSocketInstance from '../../Utils/Socket';

type props = {
  navigation: any;
};

const Chat: FC<props> = ({navigation}) => {
  const [Messages, setMessages] = useState<Array<any>>([]);
  const [isLoading, setisLoading] = useState(true);

  const socket = useMemo(() => getSocketInstance('chat/angelic/'), []);

  const onClose = () => {};

  const onSend = (message: any[]) => {
    const [{text}] = message;
    // send message to the socket
    socket.send(text);
  };

  socket.onmessage = e => {
    console.log(e);
    // append message to message array
    setMessages(prev => [
      {
        _id: Math.random() * 1000,
        text: e.data,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    // connect with web socket

    socket.onopen = function () {
      console.log('Socket connection');
    };
    return () => {
      // close the socket connection
      // onClose();
      console.log('Component unmounted');
      socket.onclose = event => {
        if (event.wasClean) {
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
          );
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log('[close] Connection died');
        }
      };
    };
  }, [socket]);

  // const onSend = useCallback((messages = []) => {
  //   socket.send(messages[0].text);
  //   console.log(messages);
  //   // socket.send(messages);
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  // }, []);

  return (
    <View style={styles.parent}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'Angelic'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <GiftedChat
        messages={Messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
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
});
