// small, normal, large

import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {darkColors} from '../Constants/Colors';

type props = {
  size: 'small' | 'large' | number;
};
const Loading: FC<props> = ({size}) => {
  return (
    <View style={styles.parent}>
      <ActivityIndicator size={size} color={darkColors.SHADOW_COLOR} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
