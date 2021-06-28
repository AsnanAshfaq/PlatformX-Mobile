import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {darkColors} from '../Constants/Colors';

type props = {
  size: number;
  onPress: (isChecked: boolean | undefined) => void;
};
const CheckBox: FC<props> = ({size, onPress}) => {
  return (
    <BouncyCheckbox
      size={size}
      fillColor={darkColors.BADGE_COLOR}
      unfillColor="#FFFFFF"
      disableText={true}
      iconStyle={{borderColor: darkColors.SHADOW_COLOR}}
      // textStyle={{fontFamily: 'JosefinSans-Regular'}}
      onPress={isChecked => onPress(isChecked)}
      style={{marginRight: 10}}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
