import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import {darkColors} from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
// @ts-ignore
import Axios from '../../Utils/Axios';
import Loading from '../../Components/Loading';
import AuthHandlers from '../../Utils/AuthHandler';
import {ToastAndroid} from 'react-native';

type props = {
  navigation: any;
};

const SignIn: FC<props> = ({navigation}) => {
  const [SignIn, setSignIn] = useState({
    email: {value: 'priya@gmail.com', error: ''},
    password: {value: 'angelspriya', error: ''},
  });
  const [isLoading, setIsLoading] = useState(false);

  // get some handlers
  const {isEmailValid, isEmpty} = AuthHandlers();

  const handleSignIn = () => {
    // set the loading to true
    let x = SignIn;
    let isAllInputsValid = true;
    setIsLoading(true);

    // check's for email
    if (isEmpty(SignIn.email.value)) {
      x['email']['error'] = 'Email cannnot be Empty';
    } else {
      if (!isEmailValid(SignIn.email.value)) {
        x['email']['error'] = 'Please enter a valid email address';
      }
    }
    if (SignIn['email']['error'] != '') {
      setSignIn(props => {
        return {
          ...props,
          email: {
            value: props.email.value,
            error: props.email.error,
          },
        };
      });
      // make the input validation variable false
      isAllInputsValid = false;
    }

    // check's for password
    if (isEmpty(SignIn.password.value)) {
      SignIn['password']['error'] = 'Password cannot be empty';
      setSignIn(props => {
        return {
          ...SignIn,
        };
      });
      // make the input validation variable false
      isAllInputsValid = false;
    }

    if (isAllInputsValid) {
      Axios.post('/user/signin/', {
        email: SignIn.email.value,
        password: SignIn.password.value,
      })
        .then(function (response) {
          // handle success
          console.log(response.data);
          if (response.status === 200) {
            // user is valid
            // get user token
            console.log(response.data);
          } else {
            ToastAndroid.show(response.data, 1500);
          }
          // set the loading to false
          setIsLoading(false);
          // if access and refresh token exist
          if (response.data.access && response.data.refresh) {
            // store them in local storage
            ToastAndroid.show('Storing tokens in local storage', 500);
            // and navigate to main screen
            ToastAndroid.show('Navigating to main screen', 500);
          }
        })
        .catch(function (error) {
          // if there is exist email error
          if (error.response.data.email_error) {
            // set email error
            setSignIn(props => {
              return {
                ...props,
                email: {
                  value: props.email.value,
                  error: error.response.data.email_error,
                },
              };
            });
          } else if (error.response.data.password_error) {
            // set password error
            setSignIn(props => {
              return {
                ...props,
                password: {
                  value: props.password.value,
                  error: error.response.data.password_error,
                },
              };
            });
          }

          // else if there is any other error
          else if (error.response.data.error) {
            ToastAndroid.show(error.response.data.error, 1500);
          }

          // set the loading to false
          setIsLoading(false);
          // throw error;
          return Promise.reject(error);
        });
    }
  };

  // password_error
  // email_error
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.parent}>
      {/* platformX logo  */}
      <View style={styles.logoContainer}>
        <Text style={styles.bracket}>{'<'}</Text>
        <Text style={styles.logo}>PlatformX</Text>
        <Text style={styles.bracket}>{'/>'}</Text>
      </View>
      <View style={styles.fieldContainer}>
        {/* email field  */}
        <CustomTextField
          placeholder={'Email'}
          defaultValue={SignIn.email.value}
          onChangeText={text => {
            setSignIn(props => {
              return {
                ...props,
                email: {
                  value: text,
                  error: '',
                },
              };
            });
          }}
          textContentType={'emailAddress'}
          error={SignIn.email.error}
        />

        {/* password field  */}
        <CustomTextField
          placeholder={'Password'}
          defaultValue={SignIn.password.value}
          onChangeText={text => {
            setSignIn(props => {
              return {
                ...props,
                password: {
                  value: text,
                  error: '',
                },
              };
            });
          }}
          textContentType={'password'}
          error={SignIn.password.error}
          rightIcon
          secureTextEntry={true}
        />
      </View>
      {/* submit button container  */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSignIn}>
          {isLoading ? (
            // <View style={{flex: 1}}>
            <Loading
              size={'small'}
              color={darkColors.SCREEN_BACKGROUND_COLOR}
            />
          ) : (
            // </View>
            <Text style={styles.submitButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>
        {/* sign up container  */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
            <Text
              style={styles.signUp}
              onPress={() => navigation.navigate('SignUp')}>
              {' '}
              Sign Up
            </Text>
            {'  '}
            Now
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracket: {
    fontSize: Sizes.large * 2,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
    color: darkColors.TEXT_COLOR,
  },
  logo: {
    fontSize: Sizes.large * 1.7,
    color: darkColors.TEXT_COLOR,
    fontFamily: 'Comfortaa-SemiBold',
  },
  fieldContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonContainer: {
    flex: 0.2,
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: darkColors.SHADOW_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
  signUpContainer: {
    marginVertical: 15,
  },
  signUpText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
    paddingVertical: 2,
  },
  signUp: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
});
