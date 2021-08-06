import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import ChatCard from '../../Components/ChatCard';
import {chatData} from '../../Constants/sample';

type props = {
  navigation: any;
};
const Chat: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        title={'Chat'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <>
          {chatData.map(chat => (
            <ChatCard chat={chat} navigation={navigation} key={chat.id} />
          ))}
        </>
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
