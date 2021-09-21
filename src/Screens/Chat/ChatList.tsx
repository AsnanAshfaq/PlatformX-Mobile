import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import ChatCard from './ChatCard';
import {chatData} from '../../Constants/sample';
import {darkColors} from '../../Constants/Colors';
import {Sizes} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const Chat: FC<props> = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [state, dispatch] = useStateValue();

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        title={'Chat'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[state.theme.TEXT_COLOR]}
            progressBackgroundColor={state.theme.SHADOW_COLOR}
            progressViewOffset={20}
            size={Sizes.large}
          />
        }>
        <>
          {chatData.map(chat => (
            <ChatCard
              chat={chat}
              navigation={navigation}
              key={chat.id}
              onPress={e => navigation.navigate('ChatScreen')}
            />
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
  scrollViewContainer: {
    flex: 1,
  },
});
