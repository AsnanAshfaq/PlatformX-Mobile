import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {darkColors} from '../../Constants/Colors';
import {Height, Sizes, Width} from '../../Constants/Size';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomTextField from '../../Components/CustomTextField';
import Axios from '../../Utils/Axios';

type props = {
  navigation: any;
  route: any;
};

const ICON_SIZE = Width * 0.07;

const CodeConfirmation: FC<props> = ({navigation, route}) => {
  const [code, setcode] = useState<number>(route.params.otp);
  const [Input, setInput] = useState<number>();

  const [countDown, setcountDown] = useState<number>(60);

  useEffect(() => {
    // set the timer
    const Interval = setInterval(() => {
      if (countDown > 1) setcountDown(value => value - 1);
    }, 1000);

    if (countDown < 1) {
      clearInterval(Interval);
    }
    return () => {
      clearInterval(Interval);
    };
  }, [countDown]);

  const verifyCode = () => {
    // dismiss the keyboard first
    Keyboard.dismiss();
    // then navigate to new password screen
    navigation.navigate('NewPassword', {
      email: route.params.email,
    });
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
        <Text style={styles.titleText}>Verify Code</Text>
      </View>
      <View style={styles.mainContainer}>
        <CustomTextField
          defaultValue={Input}
          onChangeText={input => setInput(input)}
          placeholder={'Verification Code'}
          textContentType={'creditCardNumber'}
          keyboardType={'number-pad'}
          maxLength={6}
        />
        <View style={styles.noteContainer}>
          <Text style={styles.simpleText}>
            Enter the code you just recieved in your email.{'\n'}
            <Text style={styles.noteText}>
              Note: The code is valid only for a short time (60 seconds)
            </Text>
          </Text>
        </View>
      </View>
      {countDown !== 1 ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginHorizontal: 20,
          }}>
          <Text style={styles.simpleText}>
            Time left{' '}
            <Text style={{color: darkColors.TOMATO_COLOR}}> {countDown}</Text>
          </Text>
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginHorizontal: 20,
          }}>
          <Text style={{color: darkColors.TOMATO_COLOR}}>
            Code has been expired
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => verifyCode()}
          disabled={countDown === 1 ? true : false}>
          <Text style={styles.buttonText}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CodeConfirmation;

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
  noteContainer: {
    marginVertical: 20,
  },
  simpleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
  noteText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.small,
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
