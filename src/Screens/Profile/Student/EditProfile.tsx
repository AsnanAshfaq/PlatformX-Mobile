// TODO:
// Personal Informatoion
// first name (done)
// last name (done)
// username (done)
// bio (done)
// date of birth (done)   (calendar)
// phone number (done)
// Profile Information
// skills (done)
// interests (done)
// lives in (done)
// education (done)
// Social Handle
// linkedIN
// github
// portfolio
// twitter
// joined Date (not editable)
// About PlatformX

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import FormHandler from '../../../Utils/FormHandler';

type Props = {
  label: string;
  placeholder: string;
  keyboardType: any;
  inputValue: any;
  error: string;
  isRequired?: boolean;
  onInputChange: (text: any) => void;
};
const CommonView: FC<Props> = ({
  label,
  inputValue,
  placeholder,
  keyboardType,
  error,
  isRequired = false,
  onInputChange,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <>
      <View
        style={[
          styles.labelContainer,
          {
            backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
            borderBottomColor: theme.SHADOW_COLOR,
          },
        ]}>
        <Text
          style={[
            styles.label,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {label}{' '}
          {isRequired === true && (
            <Text style={{color: theme.TOMATO_COLOR}}> *</Text>
          )}
        </Text>
      </View>
      <View style={styles.center}>
        <CustomTextField
          defaultValue={inputValue}
          onChangeText={text => onInputChange(text)}
          placeholder={placeholder}
          textContentType={'name'}
          keyboardType={keyboardType}
          error={error}
        />
      </View>
    </>
  );
};

type headerProps = {
  heading: string;
};
const Header: FC<headerProps> = ({heading}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[
        styles.headingContainer,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
          borderBottomColor: theme.SHADOW_COLOR,
        },
      ]}>
      <Text
        style={[
          styles.heading,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        {heading}
      </Text>
    </View>
  );
};
type props = {
  navigation: any;
  route: any;
};

const ViewProfile: FC<props> = ({navigation, route}) => {
  // get user details from params
  const {user} = route.params;

  const [Input, setInput] = useState({
    firstName: {value: user.first_name, error: ''},
    lastName: {value: user.last_name, error: ''},
    userName: {value: user.username, error: ''},
    bio: {value: user.bio ? user.bio : '', error: ''},
    dateOfBirth: {value: '', error: ''},
    phoneNumber: {value: '', error: ''},
    skills: {value: '', error: ''},
    interest: {value: '', error: ''},
    livesIn: {value: user?.student?.lives_in, error: ''},
    education: {value: user?.student?.education, error: ''},
    linkedIn: {value: '', error: ''},
    github: {value: '', error: ''},
    twitter: {value: '', error: ''},
    portfolio: {value: '', error: ''},
  });
  const [{theme}, dispatch] = useStateValue();

  // get some handlers
  // const {
  //   checkLength,
  //   isEmailValid,
  //   isEmpty,
  //   isOnylAlphabets,
  //   isSame,
  //   isLinkValid,
  //   isPhoneNumberValid,
  // } = FormHandler();
  const handleInputChange = (key: string, text: any) => {
    const x = Input;
    x[key] = text;
    setInput(props => {
      return {
        ...props,
        x,
      };
    });
  };

  const handleEditProfile = () => {
    console.log('Handling edit profile');

    // const isPhoneValid = isLinkValid('03001234567');
    // console.log(isPhoneValid);
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
        title={'Edit Profile'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView stickyHeaderIndices={[0, 7]} removeClippedSubviews>
        <Header heading={'Personal Information'} />
        <CommonView
          label={'First Name'}
          inputValue={Input.firstName.value}
          keyboardType={'default'}
          placeholder={'Enter First Name'}
          onInputChange={text => handleInputChange('firstName', text)}
          error={Input.firstName.error}
        />
        <CommonView
          label={'Last Name'}
          inputValue={Input.lastName.value}
          keyboardType={'default'}
          placeholder={'Enter Last Name'}
          onInputChange={text => handleInputChange('lastName', text)}
          error={Input.lastName.error}
        />
        <CommonView
          label={'User Name'}
          inputValue={Input.userName.value}
          keyboardType={'default'}
          placeholder={'Enter User Name'}
          onInputChange={text => handleInputChange('userName', text)}
          error={Input.userName.error}
        />
        <CommonView
          label={'Bio'}
          inputValue={Input.bio.value}
          keyboardType={'default'}
          placeholder={'Enter Bio'}
          onInputChange={text => handleInputChange('bio', text)}
          error={Input.bio.error}
        />

        <CommonView
          label={'Date of Birth'}
          inputValue={Input.dateOfBirth.value}
          keyboardType={'default'}
          placeholder={'Enter Date of Birth'}
          onInputChange={text => handleInputChange('dateOfBirth', text)}
          error={Input.dateOfBirth.error}
        />
        <CommonView
          label={'Phone Number'}
          inputValue={Input.phoneNumber.value}
          keyboardType={'number-pad'}
          placeholder={'Enter Phone Number'}
          onInputChange={text => handleInputChange('phoneNumber', text)}
          error={Input.phoneNumber.error}
        />
        <Header heading={'Profile Information'} />
        {/* skills interest lives in education  */}
        <CommonView
          label={'Skills'}
          inputValue={Input.skills.value}
          keyboardType={'default'}
          placeholder={'Enter Skills'}
          onInputChange={text => handleInputChange('skills', text)}
          error={Input.skills.error}
        />
        <CommonView
          label={'Interest'}
          inputValue={Input.interest.value}
          keyboardType={'default'}
          placeholder={'Enter Interests'}
          onInputChange={text => handleInputChange('interest', text)}
          error={Input.interest.error}
        />
        <CommonView
          label={'Lives In'}
          inputValue={Input.livesIn.value}
          keyboardType={'default'}
          placeholder={'Enter Your Location'}
          onInputChange={text => handleInputChange('livesIn', text)}
          error={Input.livesIn.error}
        />
        <CommonView
          label={'Education'}
          inputValue={Input.education.value}
          keyboardType={'default'}
          placeholder={'Enter Your Education'}
          onInputChange={text => handleInputChange('education', text)}
          error={Input.education.error}
        />
        <Header heading={'Social Handle'} />
        <CommonView
          label={'LinkedIn'}
          inputValue={Input.linkedIn.value}
          keyboardType={'default'}
          placeholder={'Enter LinkedIn URL'}
          onInputChange={text => handleInputChange('linkedIn', text)}
          error={Input.linkedIn.error}
          isRequired={false}
        />
        <CommonView
          label={'Github'}
          inputValue={Input.github.value}
          keyboardType={'default'}
          placeholder={'Enter Github URL'}
          onInputChange={text => handleInputChange('github', text)}
          error={Input.github.error}
          isRequired={false}
        />
        <CommonView
          label={'Twitter'}
          inputValue={Input.twitter.value}
          keyboardType={'default'}
          placeholder={'Enter Twitter URL'}
          onInputChange={text => handleInputChange('twitter', text)}
          error={Input.twitter.error}
          isRequired={false}
        />
        <CommonView
          label={'Portfolio'}
          inputValue={Input.portfolio.value}
          keyboardType={'default'}
          placeholder={'Enter Portfolio URL'}
          onInputChange={text => handleInputChange('portfolio', text)}
          error={Input.portfolio.error}
          isRequired={false}
        />
        {/* joined date contianer */}
        <View style={styles.joinedDateContainer}>
          <Text style={[styles.joinedDateText, {color: theme.TEXT_COLOR}]}>
            {' '}
            JOINED PLATFORMX ON {new Date(user.date_joined).toDateString()}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={[
            styles.editButton,
            {
              backgroundColor: theme.TOMATO_COLOR,
            },
          ]}
          activeOpacity={0.5}
          onPress={() => handleEditProfile()}>
          <Text
            style={[
              styles.editButtonText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            Edit Profile{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingContainer: {
    paddingLeft: Width * 0.02,
    paddingVertical: 10,
    width: Width * 0.98,
    padding: 5,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.large * 1.3,
    // fontFamily: 'Cindyrella',
  },
  labelContainer: {
    marginHorizontal: Width * 0.02,
    // marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
  },
  label: {
    fontSize: Sizes.normal * 1.15,
  },
  joinedDateContainer: {
    // marginHorizontal: Width * 0.02,
    // marginVertical: 10,
    // width: Width * 0.95,
    padding: 5,
  },
  joinedDateText: {
    fontSize: Sizes.normal,
  },
  editButtonContainer: {
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  editButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: Sizes.large,
  },
});
