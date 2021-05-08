import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';

const Workshop = () => {
  return (
    <View style={styles.parent}>
      <Text>This is the Workshop componenet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});
export default Workshop;
