import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../Constants/Size';
import CheckBox from '../../../Components/CheckBox';
import axios from '../../../Utils/Axios';
import {useStateValue} from '../../../Store/StateProvider';
import {BACKGROUND_IMAGE} from '../../../Constants/sample';
import Loading from '../../../Components/Loading';
import Divider from '../../../Components/Divider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import CustomButton from '../../../Components/CustomButton';

const RulesAndRegistration: FC = () => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        Eligibility Requirements
      </Text>
      <View style={styles.checkBoxContainer}>
        <View style={styles.rulesCheckBoxContainer}>
          <CheckBox
            onPress={() => console.log('agreement selected')}
            size={20}
          />
        </View>
        <View style={styles.rulesTextContainer}>
          <Text style={[styles.rulesText, {color: theme.TEXT_COLOR}]}>
            I have read and agree to the eligibility requirements for this
            hackathon
          </Text>
        </View>
      </View>
      <View style={styles.checkBoxContainer}>
        <View style={styles.rulesCheckBoxContainer}>
          <CheckBox
            onPress={() => console.log('agreement selected')}
            size={20}
          />
        </View>
        <View style={styles.rulesTextContainer}>
          <Text style={[styles.rulesText, {color: theme.TEXT_COLOR}]}>
            I have read and agree to be bound by the Official Rules and the
            PlatformX{' '}
            <Text style={{color: theme.GREEN_COLOR}}> Terms and Services</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const TeamMates: FC = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        Do you have teammates?
      </Text>
      <View style={styles.checkBoxContainer}>
        <CheckBox onPress={() => console.log('Solo selected')} size={20} />
        <Text style={[styles.teamText, {color: theme.TEXT_COLOR}]}>
          Working Solo
        </Text>
      </View>
      <View style={styles.checkBoxContainer}>
        <CheckBox onPress={() => console.log('teammate selected')} size={20} />
        <Text style={[styles.teamText, {color: theme.TEXT_COLOR}]}>
          Add Teammate
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const Register: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID, backgroundImage, title, tagline} = route.params;
  const [{theme}, dispatch] = useStateValue();
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [loading, setLoading] = useState(false);

  const registerHackathon = () => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch(error => {
        if (error.response.data) {
          ToastAndroid.show(error.response.data.error, 1500);
        } else {
          ToastAndroid.show(error.error, 1500);
        }
        setLoading(false);
      });
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
        chat
        bell
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView removeClippedSubviews>
        <View>
          <Image
            style={{
              width: Width,
              height: Height * 0.3,
            }}
            source={{
              uri: BASE_URL + backgroundImage,
            }}
            // onLoad={() => {
            //   console.log(BASE_URL + backgroundImage);
            //   Image.getSize(BASE_URL + backgroundImage, (width, heigth) => {
            //     // calculate aspect ratio of image
            //     setImageAspectRatio(heigth / width);
            //     setBackgroundImageLoading(false);
            //     console.log(
            //       'Is background image loading',
            //       BackgroundImageLoading,
            //     );
            //   });
            // }}
            onLoadEnd={() => {
              setBackgroundImageLoading(false);
            }}
            onError={() => {
              setBackgroundImageLoading(false);
              ToastAndroid.show("Couldn't load background image", 1500);
            }}
            resizeMode={'cover'}
          />
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.BACKGROUND_COLOR,
              marginHorizontal: Width * 0.05,
            },
          ]}>
          {/* title and tagline container  */}
          <View style={[styles.titleContainer, styles.center]}>
            <Text
              style={[
                styles.titleText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {title}
            </Text>
            <Text
              style={[
                styles.tagLineText,
                {
                  color: theme.DIM_TEXT_COLOR,
                },
              ]}>
              {tagline}
            </Text>
          </View>
          <Divider size={'large'} />
          <TeamMates />
          {/* <KnowHows title={title} /> */}
          <RulesAndRegistration />
        </View>
      </ScrollView>
      {/* Register now  section*/}

      <CustomButton
        text={'Register'}
        onPress={registerHackathon}
        loading={loading}
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {},
  card: {
    marginTop: -45,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 15,
  },
  titleText: {
    fontSize: Sizes.normal * 1.3,
    fontFamily: 'OpenSans-Bold',
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.9,
    fontFamily: 'OpenSans-Light',
  },
  labelContainer: {
    marginHorizontal: Width * 0.02,
    marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Sizes.normal,
    // fontFamily: 'Cindyrella',
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  checkBoxContainer: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
    flexDirection: 'row',
  },
  rulesText: {
    fontSize: Sizes.normal * 0.9,
    lineHeight: 24,
  },
  rulesCheckBoxContainer: {
    alignItems: 'flex-start',
    marginTop: 3,
  },
  rulesTextContainer: {
    marginRight: Width * 0.03,
    // alignItems: 'center',
  },
  teamText: {
    fontSize: Sizes.normal * 0.9,
  },
  knowHowText: {
    fontSize: Sizes.normal * 0.9,
  },
  terms: {
    fontSize: Sizes.normal * 0.9,
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
