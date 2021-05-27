import React, {FC} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';

type props = {
  defaultValue: any;
  onChangeText: any;
  icon?: string;
  placeholder: string;
  textContentType: string | 'name';
};
const CustomTextField: FC<props> = ({
  placeholder,
  icon,
  defaultValue,
  onChangeText,
  textContentType,
}) => {
  return (
    <View style={styles.textFieldContainer}>
      <TextInput
        placeholder={placeholder}
        style={styles.textField}
        value={defaultValue}
        onChangeText={onChangeText}
        placeholderTextColor={darkColors.TEXT_COLOR}
        textContentType={textContentType}
      />
    </View>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  textFieldContainer: {
    marginVertical: 5,
  },
  textField: {
    width: Width * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    borderColor: darkColors.SHADOW_COLOR,
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
});
