// small, normal, large

import React, {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {darkColors} from '../Constants/Colors';

type props = {
  size: 'small' | 'large' | number;
  color?: string;
};
const Loading: FC<props> = ({size, color}) => {
  return (
    <View style={styles.parent}>
      <ActivityIndicator
        size={size}
        color={color ? color : darkColors.SHADOW_COLOR}
      />
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
