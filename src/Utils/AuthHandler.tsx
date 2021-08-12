// TODO:
// we will have two handlers. one for sign in and other for sign up
import React, {useState} from 'react';

type key = {
  value: string;
  error: string;
};
const useAuthState = () => {
  const [Registration, setRegistration] = useState({
    first_name: {value: '', error: ''},
    last_name: {value: '', error: ''},
    username: {value: '', error: ''},
    email: {value: '', error: ''},
    password: {value: '', error: ''},
    confirm_password: {value: '', error: ''},
  });

  const isEmpty = (key: string, value: string, error: string) => {
    if (value.trim().length === 0) {
      let x = Registration;
      x[key] = {
        error: error,
        value: '',
      };
      setRegistration(x);
      return true;
    }
    return false;
  };

  const checkLength = (
    key: string,
    value: string,
    min: number,
    max: number,
  ) => {
    if (value.trim().length < min) {
      Registration[key][
        'error'
      ] = `Value cannot be less than ${min} characters`;
      Registration[key]['value'] = '';
    } else if (value.trim().length > max) {
      Registration[key][
        'error'
      ] = `Value cannot be greater than ${max} characters`;
      Registration[key]['value'] = '';
    }
  };

  const isEmailValid = (key: key, error: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(String(key.value).toLowerCase())) {
      let x = Registration;
      x['email'] = {
        error: error,
        value: '',
      };
      setRegistration(x);
    }
  };

  const isSame = (key1: key, key2: key, error: string) => {
    if (key1.value.trim() != key2.value.trim()) {
      setRegistration(props => {
        return {
          ...props,
          confirm_password: {
            error: error,
            value: '',
          },
        };
      });
    }
  };

  const handleSignUp = () => {
    // First Name check's
    const isFirstNameEmpty = isEmpty(
      'first_name',
      Registration.first_name.value,
      'First Name cannot be empty',
    );
    if (!isFirstNameEmpty)
      checkLength('first_name', Registration.first_name.value, 5, 10);

    // Last Name check's
    const isLastNameEmpty = isEmpty(
      'last_name',
      Registration.last_name.value,
      'Last Name cannot be empty',
    );
    if (!isLastNameEmpty)
      checkLength('last_name', Registration.last_name.value, 5, 10);

    // User Name check's
    const isUserNameEmpty = isEmpty(
      'username',
      Registration.username.value,
      'User Name cannot be empty',
    );
    if (!isUserNameEmpty)
      checkLength('username', Registration.username.value, 5, 10);

    // email check's
    const isEmailEmpty = isEmpty(
      'email',
      Registration.email.value,
      'Email cannot be empty',
    );
    if (!isEmailEmpty)
      isEmailValid(Registration.email, 'Please Enter a valid Email Address');

    // Password check's
    const isPasswordEmpty = isEmpty(
      'password',
      Registration.password.value,
      'Password cannot be empty',
    );
    if (!isPasswordEmpty)
      checkLength('password', Registration.password.value, 8, 14);

    // confirm password check's
    const isConfirmPasswordEmpty = isEmpty(
      'confirm_password',
      Registration.confirm_password.value,
      'Confirm Password cannot be empty',
    );
    if (!isConfirmPasswordEmpty)
      checkLength(
        'confirm_password',
        Registration.confirm_password.value,
        8,
        14,
      );

    // if password and confirm pasword are same or not
    if (!isPasswordEmpty && !isConfirmPasswordEmpty)
      isSame(
        Registration.password,
        Registration.confirm_password,
        "Password's must be same",
      );

    // now check if there are any errors
    let isValid = false;
    for (let x in Registration) {
      if (Registration[x]['error'] !== '') {
        isValid = false;
        break;
      }
      isValid = true;
    }

    if (isValid) {
      // make an api call with given input
      console.log('Data is valid', isValid);
    }
  };

  const handleSignIn = () => {};

  return {
    Registration,
    setRegistration,
    handleSignUp,
    handleSignIn,
  };
};

export default useAuthState;
