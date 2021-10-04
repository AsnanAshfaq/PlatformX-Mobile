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
import {Sizes, Width} from '../../../Constants/Size';
import CheckBox from '../../../Components/CheckBox';
import axios from '../../../Utils/Axios';
import {useStateValue} from '../../../Store/StateProvider';

const RulesAndRegistration: FC = () => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <>
      <View style={{flexDirection: 'row', marginHorizontal: Width * 0.02}}>
        <CheckBox
          size={25}
          onPress={isCheck => console.log('Checked value', isCheck)}
        />
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.text,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
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
          <Text
            style={[
              styles.text,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            I have read and agree to the{' '}
            <Text
              style={[
                styles.terms,
                {
                  color: theme.TOMATO_COLOR,
                },
              ]}>
              Terms of Services
            </Text>{' '}
            of PlatformX
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
  const [{theme}, dispatch] = useStateValue();
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
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
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
        <View
          style={[
            styles.labelContainer,
            {
              backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
              borderBottomColor: theme.SHADOW_COLOR,
            },
          ]}>
          <Text style={[styles.label, {color: theme.TEXT_COLOR}]}>
            Agreement
          </Text>
        </View>
        <RulesAndRegistration />
      </ScrollView>
      {/* Register now  section*/}
      <View style={styles.registerButtonContainer}>
        <TouchableOpacity
          style={[
            styles.registerButton,
            {
              backgroundColor: theme.TOMATO_COLOR,
            },
          ]}
          activeOpacity={0.5}
          onPress={() => registerHackathon()}>
          <Text
            style={[
              styles.registerText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  labelContainer: {
    marginHorizontal: Width * 0.02,
    marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Sizes.large * 1.1,
    // fontFamily: 'Cindyrella',
  },
  text: {
    fontSize: Sizes.normal * 1.1,
  },
  terms: {
    fontSize: Sizes.normal,
    textDecorationLine: 'underline',
  },
  registerButtonContainer: {
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  registerButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  registerText: {
    fontSize: Sizes.large,
  },
});
