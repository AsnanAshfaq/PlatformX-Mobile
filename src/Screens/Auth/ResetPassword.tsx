import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {darkColors} from '../../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Height, Sizes, Width} from '../../Constants/Size';
import CustomTextField from '../../Components/CustomTextField';

type props = {
  navigation: any;
};

const ICON_SIZE = Width * 0.07;

const ResetPassword: FC<props> = ({navigation}) => {
  const [Email, setEmail] = useState({
    value: 'roger@gmail.com',
    error: '',
  });

  const sendCode = () => {
    console.log('Sending code on user email');
  };

  return (
    <View style={styles.parent}>
      {/* Back button  */}
      <View style={styles.backContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <FontAwesome
            name={'arrow-left'}
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
            size={ICON_SIZE}
          />
        </TouchableWithoutFeedback>
      </View>
      {/* title  */}

      <View style={styles.mainContainer}>
        <CustomTextField
          defaultValue={Email.value}
          onChangeText={text =>
            setEmail(props => {
              return {
                ...props,
                value: text,
              };
            })
          }
          placeholder={'Email Address'}
          textContentType={'emailAddress'}
        />
        <View style={styles.textContainer}>
          <Text style={styles.simpleText}>
            Enter the email associated with your account and we'll send an email
            with a code to reset your password.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => sendCode()}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  backContainer: {
    paddingVertical: (Height * 0.09) / 4,
    paddingLeft: 15,
    height: Height * 0.09,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.08,
  },
  textContainer: {
    marginVertical: 20,
  },
  simpleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
  buttonContainer: {
    width: Width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
  },
  button: {
    backgroundColor: darkColors.TOMATO_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.8,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
});
