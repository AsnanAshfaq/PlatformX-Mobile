import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {darkColors} from '../../../Constants/Colors';
import {Sizes, Width} from '../../../Constants/Size';
import CheckBox from '../../../Components/CheckBox';
import axios from '../../../Utils/Axios';

const RulesAndRegistration: FC = () => {
  return (
    <>
      <View style={{flexDirection: 'row', marginHorizontal: Width * 0.02}}>
        <CheckBox
          size={25}
          onPress={isCheck => console.log('Checked value', isCheck)}
        />
        <View style={{flex: 1}}>
          <Text style={styles.text}>
            I have read and agree to the rules and the eligibility requirements
            of this Hackathon.
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', marginHorizontal: Width * 0.02}}>
        <CheckBox
          size={25}
          onPress={isCheck => console.log('Checked value', isCheck)}
        />
        <View style={{flex: 1}}>
          <Text style={styles.text}>
            I have read and agree to the{' '}
            <Text style={styles.terms}>Terms of Services</Text> of PlatformX
          </Text>
        </View>
      </View>
    </>
  );
};
type props = {
  navigation: any;
  route: any;
};
const Register: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  const registerHackathon = () => {
    axios
      .post(`/api/hackathon/${ID}/register/`)
      .then(result => {
        if (result.status === 201) {
          // user has been registered
          ToastAndroid.show(result.data.success, 1500);
          // navigate to main screen
          navigation.navigate('Main');
        } else {
          ToastAndroid.show(result.data.error, 1500);
        }
      })
      .catch(error => ToastAndroid.show(error, 1500));
  };

  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation
        title={'Register'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        {/* how did u hear about us section */}
        {/* <View style={styles.labelContainer}>
          <Text style={styles.label}>How did you hear about us?</Text>
        </View>
        <Text>PlatformX</Text>
        <Text>Friends </Text>
        <Text>Other</Text> */}
        {/* agreement Section */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Agreement</Text>
        </View>
        <RulesAndRegistration />
      </ScrollView>
      {/* Register now  section*/}
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.5}
          onPress={() => registerHackathon()}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  labelContainer: {
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
    marginHorizontal: Width * 0.02,
    marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
    borderBottomColor: darkColors.SHADOW_COLOR,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Sizes.large * 1.1,
    color: darkColors.TEXT_COLOR,
    // fontFamily: 'Cindyrella',
  },
  text: {
    fontSize: Sizes.normal * 1.1,
    color: darkColors.TEXT_COLOR,
  },
  terms: {
    fontSize: Sizes.normal,
    color: darkColors.TOMATO_COLOR,
    textDecorationLine: 'underline',
    // textDecorationColor: darkColors.TEXT_COLOR,
  },
  registerButtonContainer: {
    height: Width * 0.14,
    // backgroundColor: darkColors.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  registerButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    backgroundColor: darkColors.TOMATO_COLOR,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  registerText: {
    fontSize: Sizes.large,
    color: darkColors.TEXT_COLOR,
  },
});
