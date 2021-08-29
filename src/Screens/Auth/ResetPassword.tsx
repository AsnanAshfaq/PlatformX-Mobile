import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
  View,
} from 'react-native';
import {darkColors} from '../../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Height, Sizes, Width} from '../../Constants/Size';
import CustomTextField from '../../Components/CustomTextField';
import Axios from '../../Utils/Axios';
import AuthHandlers from '../../Utils/AuthHandler';

type props = {
  navigation: any;
};

const ICON_SIZE = Width * 0.07;

const ResetPassword: FC<props> = ({navigation}) => {
  const [Email, setEmail] = useState({
    value: '18asnan@gmail.com',
    error: '',
  });

  const {isEmailValid, isEmpty} = AuthHandlers();

  const sendCode = () => {
    // check email
    if (isEmpty(Email.value)) {
      setEmail(props => {
        return {
          ...props,
          error: 'Email cannnot be Empty',
        };
      });
    } else if (!isEmailValid(Email.value)) {
      setEmail(props => {
        return {
          ...props,
          error: 'Please enter a valid email address',
        };
      });
    } else {
      // email is not empty and is valid
      Axios.post('/user/password_reset/', {
        email: Email.value,
      })
        .then(response => {
          if (response.status === 200) {
            // navigate to code confirmation screen
            ToastAndroid.show(response.data.success, 1500);
          }
        })
        .catch(error => {
          console.log('Error', error);
          if (error.response.data.email_error) {
            setEmail(props => {
              return {
                ...props,
                error: error.response.data.email_error,
              };
            });
          } else if (error.response.data.error) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
        });
    }
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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Reset Password</Text>
      </View>
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
          error={Email.error}
        />
        <View style={styles.textContainer}>
          <Text style={styles.simpleText}>
            Enter the email associated with your account and we'll send an email
            with a code to reset your password.
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => sendCode()}>
          <Text style={styles.buttonText}>Send Code</Text>
        </TouchableOpacity>
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
  titleContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: Width * 0.06,
  },
  titleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 1.5,
  },
  mainContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
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
    flex: 0.2,
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
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
});
