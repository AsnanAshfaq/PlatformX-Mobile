import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import CustomHeader from '../Components/CustomHeader';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader title={'PlatFormX'} navigation={navigation} />
      <Text>This is the Post componenet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

export default Posts;
