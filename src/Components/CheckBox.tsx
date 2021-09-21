import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
// import {darkColors} from '../Constants/Colors';
import {useStateValue} from '../Store/StateProvider';

type props = {
  size: number;
  onPress: (isChecked: boolean | undefined) => void;
};
const CheckBox: FC<props> = ({size, onPress}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <BouncyCheckbox
      size={size}
      fillColor={theme.BADGE_COLOR}
      unfillColor="#FFFFFF"
      disableText={true}
      iconStyle={{borderColor: theme.SHADOW_COLOR}}
      // textStyle={{fontFamily: 'JosefinSans-Regular'}}
      onPress={isChecked => onPress(isChecked)}
      style={{marginRight: 10}}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
