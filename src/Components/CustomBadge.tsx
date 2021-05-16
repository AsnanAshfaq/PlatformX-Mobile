import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {darkColors} from '../Constants/Colors';

type props = {
  value?: number;
};
const CustomBadge: FC<props> = ({value}) => {
  return (
    <View style={styles.badgeStyle}>
      <Text style={styles.badgeText}>{value !== undefined ? value : 2}</Text>
    </View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 21,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.BADGE_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkColors.BADGE_COLOR,
  },
  badgeText: {
    color: darkColors.BADGE_TEXT_COLOR,
  },
});
