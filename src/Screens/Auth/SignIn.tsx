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
import axios from 'react-native-axios';

type props = {
  navigation: any;
};

const SignIn: FC<props> = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('pressed on sign in');
    axios
      .post('/api/token/', {
        email: '18asnan@gmail.com',
        password: '@snan@shfaq18',
      })
      .then(function (response) {
        // handle success
        console.log(response.data);
        Alert.alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        Alert.alert(error.message);
      });
  };

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
          defaultValue={Email}
          onChangeText={setEmail}
          textContentType={'emailAddress'}
        />

        {/* password field  */}
        <CustomTextField
          placeholder={'Password'}
          defaultValue={Password}
          onChangeText={setPassword}
          textContentType={'password'}
          rightIcon
          secureTextEntry={true}
        />
      </View>
      {/* submit button container  */}
      <View style={styles.submitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
          <Text style={styles.submitButtonText}>Sign In</Text>
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
