import React, {FC} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import CustomHeader from '../Components/CustomHeader';

type props = {
  navigation: any;
};
const Workshop: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Workshops'} navigation={navigation} />
      <Text>This is the Workshop componenet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
export default Workshop;
