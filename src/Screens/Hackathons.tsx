import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const Hackathons = () => {
  return (
    <View style={styles.parent}>
      <Text>This is the Hackathon componenet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export default Hackathons;
