import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import NotificationCard from '../../Components/NotificationCard';
import {notificationData} from '../../Constants/sample';

type props = {
  navigation: any;
};

const Notification: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        title={'Notifications'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <>
          {notificationData.map(notify => (
            <NotificationCard
              notification={notify}
              navigation={navigation}
              key={notify.id}
            />
          ))}
        </>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
