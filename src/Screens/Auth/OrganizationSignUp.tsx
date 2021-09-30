/* eslint-disable dot-notation */
//FIELDS :TODO:
// organization name
// reg number
// email address (FIXME: confirmation of email)
// password
// confirm password
// phone number (FIXME: why phone number)
// location (modal)
// incorporation date (modal)

// Check for terms and condition

import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from 'react-native';
import CustomTextField from '../../Components/CustomTextField';
import Loading from '../../Components/Loading';
import {Height, Sizes, Width} from '../../Constants/Size';
import FormHandlers from '../../Utils/FormHandler';
import axios from '../../Utils/Axios';
import {useStateValue} from '../../Store/StateProvider';

type props = {
  navigation: any;
};

const SignUp: FC<props> = ({navigation}) => {
  // get some handlers
  const {
    isEmailValid,
    isEmpty,
    isSame,
    checkLength,
    isOnylAlphabets,
  } = FormHandlers();

  const [Registration, setRegistration] = useState({
    name: {value: 'Netsol', error: ''},
    reg_no: {value: '9242301', error: ''},
    email: {value: 'netsol@gmail.com', error: ''},
    password: {value: 'netsol@123', error: ''},
    confirm_password: {value: 'netsol@123', error: ''},
    location: {value: 'Lahore', error: ''},
    incorpDate: {value: new Date(), error: ''},
  });

  const [isLoading, setIsLoading] = useState(false);
  const [{theme}, dispatch] = useStateValue();

  const handleSignUp = async () => {
    // creating reference of registaions
    let y = Registration;
    let isAllInputsValid = true;

    // set the loading to true
    setIsLoading(true);

    // check for organization name
    if (isEmpty(Registration.name.value.trim())) {
      y['name']['error'] = 'Organization name cannot be empty';
      isAllInputsValid = false;
    }

    // check for organization registraion number
    if (isEmpty(Registration.reg_no.value.trim())) {
      y['reg_no']['error'] = 'Registration Number cannot be empty';
      isAllInputsValid = false;
    }

    // check's for email
    if (isEmpty(Registration.email.value.trim())) {
      y['email']['error'] = 'Email cannnot be Empty';
      isAllInputsValid = false;
    } else {
      if (!isEmailValid(Registration.email.value.trim())) {
        y['email']['error'] = 'Please enter a valid email address';
        isAllInputsValid = false;
      }
      //TODO:
      // check for -- email should belong to organization personal domain
    }

    // check for password
    if (isEmpty(Registration.password.value.trim())) {
      y['password']['error'] = 'Password cannot be empty';
      isAllInputsValid = false;
    } else {
      const MinMax = checkLength(Registration.password.value.trim(), 8, 14);
      if (MinMax === 'min') {
        y['password']['error'] = 'Password should be atleast 8 characters.';
        isAllInputsValid = false;
      } else if (MinMax === 'max') {
        y['password']['error'] = 'Password should be less than 14 characters.';
        isAllInputsValid = false;
      }
    }

    // check's for confirm password
    if (isEmpty(Registration.confirm_password.value.trim())) {
      y['confirm_password']['error'] = 'Confirm Password cannnot be empty';
      isAllInputsValid = false;
    } else {
      if (
        !isSame(
          Registration.password.value.trim(),
          Registration.confirm_password.value.trim(),
        )
      ) {
        y['confirm_password']['error'] = 'Passwords do not match';
        isAllInputsValid = false;
      }
    }

    // check for location
    if (isEmpty(Registration.location.value.trim())) {
      y['location']['error'] = 'Location cannot be empty';
      isAllInputsValid = false;
    }

    // set registration
    setRegistration(props => {
      return {
        ...props,
        y,
      };
    });

    // check if all inputs are valid or not
    if (isAllInputsValid) {
      try {
        const signUpResponse = await axios.post('/user/organization/signup/', {
          name: Registration.name.value.trim(),
          reg_no: Registration.reg_no.value,
          email: Registration.email.value.trim(),
          password: Registration.password.value.trim(),
          location: Registration.location.value.trim(),
          incorporation_date: Registration.incorpDate.value,
        });

        if (signUpResponse.status === 201) {
          console.log('Organization account has been created ');
          const userData = {
            name: Registration.name.value.trim(),
            regNo: Registration.reg_no.value.trim(),
            email: Registration.email.value.trim(),
            location: Registration.location.value.trim(),
            profilePic: '',
          };
          dispatch({type: 'SET_USER', payload: userData});
          dispatch({type: 'SET_USER_TYPE', payload: 'organization'});
          dispatch({type: 'SET_SIGN_IN', payload: true});

          // account has been created
          ToastAndroid.show(signUpResponse.data.success, 1500);
        } else {
          ToastAndroid.show(signUpResponse.data.error, 1500);
        }
        setIsLoading(false);
      } catch (error: any) {
        if (error.response.data.email_error) {
          // set email error
          setRegistration(props => {
            return {
              ...props,
              email: {
                value: props.email.value,
                error: error.response.data.email_error,
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
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={20}
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <ScrollView keyboardShouldPersistTaps={'never'}>
        <>
          {/* platformX logo  */}
          <View style={styles.logoContainer}>
            <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>
              {'<'}
            </Text>
            <Text style={[styles.logo, {color: theme.TEXT_COLOR}]}>
              PlatformX
            </Text>
            <Text style={[styles.bracket, {color: theme.TEXT_COLOR}]}>
              {'/>'}
            </Text>
          </View>

          <View style={styles.fieldContainer}>
            {/* first name field  */}
            <CustomTextField
              placeholder={'Organization Full Name'}
              defaultValue={Registration.name.value}
              onChangeText={text => {
                setRegistration(props => {
                  return {
                    ...props,
                    name: {
                      value: text,
                      error: '',
                    },
                  };
                });
              }}
              textContentType={'name'}
              keyboardType={'default'}
              autoFocus
              error={Registration.name.error}
            />
            {/* registration number field  */}
            <CustomTextField
              placeholder={'Registation Number'}
              defaultValue={Registration.reg_no.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    reg_no: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'organizationName'}
              keyboardType={'decimal-pad'}
              error={Registration.reg_no.error}
            />
            {/* email  */}
            <CustomTextField
              placeholder={'Business Email'}
              defaultValue={Registration.email.value}
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
              keyboardType={'email-address'}
              error={Registration.email.error}
            />

            {/* password field  */}
            <CustomTextField
              placeholder={'Password'}
              defaultValue={Registration.password.value}
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
              keyboardType={'default'}
              rightIcon
              secureTextEntry={true}
              error={Registration.password.error}
            />

            {/* confirm password  */}
            <CustomTextField
              placeholder={'Confirm Password '}
              defaultValue={Registration.confirm_password.value}
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
              keyboardType={'default'}
              rightIcon
              secureTextEntry={true}
              error={Registration.confirm_password.error}
            />

            {/* organization location  */}
            <CustomTextField
              placeholder={'Location'}
              defaultValue={Registration.location.value}
              onChangeText={text =>
                setRegistration(props => {
                  return {
                    ...props,
                    location: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              textContentType={'addressCity'}
              keyboardType={'default'}
              error={Registration.location.error}
            />
          </View>
          {/* submit button container  */}
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {backgroundColor: theme.SHADOW_COLOR},
              ]}
              onPress={handleSignUp}>
              {isLoading ? (
                <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
              ) : (
                <Text
                  style={[styles.submitButtonText, {color: theme.TEXT_COLOR}]}>
                  Sign Up
                </Text>
              )}
            </TouchableOpacity>
            {/* sign up container  */}
            <View style={styles.signInContainer}>
              <Text style={[styles.signInText, {color: theme.TEXT_COLOR}]}>
                Already have an account?
                <Text
                  style={[styles.signIn, {color: theme.TOMATO_COLOR}]}
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
  },
  logo: {
    fontSize: Sizes.large * 1.7,
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
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
  signInContainer: {
    marginVertical: 15,
  },
  signInText: {
    fontSize: Sizes.normal * 0.9,
    paddingVertical: 2,
  },
  signIn: {
    fontSize: Sizes.normal,
    fontWeight: 'bold',
  },
});
