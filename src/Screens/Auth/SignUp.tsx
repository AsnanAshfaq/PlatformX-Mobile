//FIELDS :TODO:
// first name
// last name
// user name
// email
// password
// confirm password

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import {darkColors} from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
import AuthHandlers from '../../Utils/AuthHandler';

type props = {
  navigation: any;
};

const Error: FC<{error: string}> = ({error}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        // width: Width * 0.9,
        alignItems: 'flex-start',
      }}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  );
};

const SignUp: FC<props> = ({navigation}) => {
  // get some handlers
  const {isEmailValid, isEmpty, isSame, checkLength} = AuthHandlers();

  const [Registration, setRegistration] = useState({
    first_name: {value: '', error: ''},
    last_name: {value: '', error: ''},
    username: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirm_password: {value: '', error: ''},
  });

  const handleSignUp = () => {
    let x = Registration;

    const customChecks = (
      Key: string,
      emptyError: string,
      minError: string,
      maxError: string,
    ) => {
      const value = Registration[Key]['value'];
      let y = Registration;
      if (isEmpty(value)) {
        y[Key]['error'] = emptyError;
      } else {
        if (checkLength(value, 5, 13) == 'min') {
          y[Key]['error'] = minError;
        } else if (checkLength(value, 5, 14) == 'max') {
          y[Key]['error'] = maxError;
        }
      }
      const error = y[Key]['error'];
      if (error != '') {
        Registration[Key]['error'] = error;
        Registration[Key]['value'] = value;
        setRegistration(props => {
          return {
            ...Registration,
          };
        });
      }
    };

    customChecks(
      'first_name',
      'First Name cannot be Empty',
      'First Name should be atleast 5 characters',
      'First Name shoule be less than 14 characters',
    );
    // check's for first name
    // if (isEmpty(Registration.first_name.value)) {
    //   x['first_name']['error'] = 'First Name cannot be Empty';
    // } else {
    //   if (checkLength(Registration.first_name.value, 5, 13) == 'min') {
    //     x['first_name']['error'] = 'First Name should be atleast 5 characters';
    //   } else if (checkLength(Registration.first_name.value, 5, 14) == 'max') {
    //     x['first_name']['error'] =
    //       'First Name should be less than 14 characters';
    //   }
    // }
    // if (Registration['first_name']['error'] != '') {
    //   setRegistration(props => {
    //     return {
    //       ...props,
    //       first_name: {
    //         value: props.first_name.value,
    //         error: props.first_name.error,
    //       },
    //     };
    //   });
    // }

    //check's for last name
    if (isEmpty(Registration.last_name.value)) {
      x['last_name']['error'] = 'Last Name cannnot be Empty';
    } else {
      if (checkLength(Registration.last_name.value, 5, 13) == 'min') {
        x['last_name']['error'] = 'Last Name should be atleast 5 characters';
      } else if (checkLength(Registration.last_name.value, 5, 14) == 'max') {
        x['last_name']['error'] = 'Last Name should be less than 14 characters';
      }
    }
    if (Registration['last_name']['error'] != '') {
      setRegistration(props => {
        return {
          ...props,
          last_name: {
            value: props.last_name.value,
            error: props.last_name.error,
          },
        };
      });
    }

    // check's for user name
    if (isEmpty(Registration.username.value)) {
      x['username']['error'] = 'User Name cannnot be Empty';
    } else {
      if (checkLength(Registration.username.value, 5, 13) == 'min') {
        x['username']['error'] = 'User Name should be atleast 5 characters';
      } else if (checkLength(Registration.username.value, 5, 14) == 'max') {
        x['username']['error'] = 'User Name should be less than 15 characters';
      }
    }
    if (Registration['username']['error'] != '') {
      setRegistration(props => {
        return {
          ...props,
          username: {
            value: props.username.value,
            error: props.username.error,
          },
        };
      });
    }

    // check's for email
    if (isEmpty(Registration.email.value)) {
      x['email']['error'] = 'Email cannnot be Empty';
    } else {
      if (!isEmailValid(Registration.email.value)) {
        x['email']['error'] = 'Please enter a valid email address';
      } else if (checkLength(Registration.email.value, 5, 14) == 'max') {
        x['email']['error'] = 'User Name should be less than 15 characters';
      }
    }
    if (Registration['email']['error'] != '') {
      setRegistration(props => {
        return {
          ...props,
          email: {
            value: props.email.value,
            error: props.email.error,
          },
        };
      });
    }

    // check's for password
    if (isEmpty(Registration.password.value)) {
      x['password']['error'] = 'Password cannnot be Empty';
    } else {
      if (checkLength(Registration.password.value, 8, 14) == 'min') {
        x['password']['error'] = 'Password be atleast 8 characters';
      } else if (checkLength(Registration.password.value, 8, 14) == 'max') {
        x['password']['error'] = 'Password should be less than 14 characters';
      }
    }
    if (Registration['password']['error'] != '') {
      setRegistration(props => {
        return {
          ...props,
          password: {
            value: props.password.value,
            error: props.password.error,
          },
        };
      });
    }

    // check's for confirm password
    if (isEmpty(Registration.confirm_password.value)) {
      x['confirm_password']['error'] = 'Confirm Password cannnot be Empty';
    } else {
      if (
        !isSame(
          Registration.password.value,
          Registration.confirm_password.value,
        )
      )
        x['confirm_password']['error'] = 'Passwords do not match';
    }
    if (Registration['confirm_password']['error'] != '') {
      setRegistration(props => {
        return {
          ...props,
          confirm_password: {
            value: props.confirm_password.value,
            error: props.confirm_password.error,
          },
        };
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={20}
      style={styles.parent}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <>
          {/* platformX logo  */}
          <View style={styles.logoContainer}>
            <Text style={styles.bracket}>{'<'}</Text>
            <Text style={styles.logo}>PlatformX</Text>
            <Text style={styles.bracket}>{'/>'}</Text>
          </View>

          <View style={styles.fieldContainer}>
            {/* first name field  */}
            <CustomTextField
              placeholder={'First Name'}
              defaultValue={Registration.first_name.value}
              onChangeText={text => {
                setRegistration(props => {
                  return {
                    ...props,
                    first_name: {
                      value: text,
                      error: '',
                    },
                  };
                });
              }}
              textContentType={'name'}
              autoFocus
              error={Registration.first_name.error}
            />
            {/* last name field  */}
            <CustomTextField
              placeholder={'Last Name'}
              defaultValue={Registration.last_name.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    last_name: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'name'}
              error={Registration.last_name.error}
            />
            {/* username field  */}
            <CustomTextField
              placeholder={'User Name'}
              defaultValue={Registration.username}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    username: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'username'}
              error={Registration.username.error}
            />
            <CustomTextField
              placeholder={'Email'}
              defaultValue={Registration.email}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    email: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'emailAddress'}
              error={Registration.email.error}
            />

            {/* password field  */}
            <CustomTextField
              placeholder={'Password'}
              defaultValue={Registration.password}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'password'}
              rightIcon
              secureTextEntry={true}
              error={Registration.password.error}
            />

            {/* confirm password  */}
            <CustomTextField
              placeholder={'Confirm Password '}
              defaultValue={Registration.confirm_password}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    confirm_password: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'password'}
              rightIcon
              secureTextEntry={true}
              error={Registration.confirm_password.error}
            />
          </View>
          {/* submit button container  */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSignUp}>
              <Text style={styles.submitButtonText}>Sign Up</Text>
            </TouchableOpacity>
            {/* sign up container  */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>
                Don't have an account?
                <Text
                  style={styles.signIn}
                  onPress={() => navigation.navigate('SignIn')}>
                  {' '}
                  Sign In
                </Text>
                {'  '}
                Now
              </Text>
            </View>
          </View>
        </>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    flexDirection: 'column',
    // marginTop: Platform.OS === 'android' ? 25 : 0,
  },
  logoContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Height * 0.04,
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
    marginVertical: Height * 0.04,
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
  signInContainer: {
    marginVertical: 15,
  },
  signInText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
    paddingVertical: 2,
  },
  signIn: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
  errorText: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.small,
  },
});
