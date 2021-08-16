import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

type textContentType =
  | 'none' //disable autofill
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password';

type props = {
  defaultValue: any;
  onChangeText: any;
  placeholder: string;
  textContentType: textContentType;
  icon?: string;
  secureTextEntry?: boolean;
  rightIcon?: boolean;
  maxLength?: number;
  autoFocus?: boolean;
  error?: string;
};

const ICON_SIZE = Width * 0.07;

const CustomTextField: FC<props> = ({
  placeholder,
  icon,
  defaultValue,
  onChangeText,
  textContentType,
  secureTextEntry,
  rightIcon,
  maxLength,
  autoFocus,
  error,
}) => {
  const [Security, setSecurity] = useState(secureTextEntry);

  return (
    <>
      <View
        style={[
          styles.textFieldContainer,
          {
            borderColor: error
              ? darkColors.TOMATO_COLOR
              : darkColors.SHADOW_COLOR,
          },
        ]}>
        <TextInput
          placeholder={placeholder}
          style={styles.textField}
          value={defaultValue}
          onChangeText={onChangeText}
          placeholderTextColor={darkColors.TEXT_COLOR}
          textContentType={textContentType}
          secureTextEntry={Security === true ? Security : false}
          maxLength={maxLength}
          autoFocus={autoFocus}
        />
        {rightIcon && (
          <TouchableWithoutFeedback
            onPress={() => setSecurity(!Security)}
            style={styles.iconContainer}>
            <Ionicons
              name={Security ? 'eye-outline' : 'eye-off-outline'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
              style={styles.icon}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      <Text style={styles.errorText}>{error}</Text>
    </>
  );
};

export default CustomTextField;

const styles = StyleSheet.create({
  textFieldContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    width: Width * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textField: {
    color: darkColors.TEXT_COLOR,
    width: Width * 0.68,
    fontSize: Sizes.normal,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
  },
  errorText: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.small,
  },
});
