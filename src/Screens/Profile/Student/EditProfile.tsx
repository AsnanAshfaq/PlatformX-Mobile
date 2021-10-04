// TODO:
// Personal Informatoion
// first name
// last name
// username
// date of birth    (calendar)
// phone number
// Profile Information
// skills
// interests
// lives in
// education
// Social Handle
// linkedIN
// github
// portfolio
// twitter
// joined Date (not editable)
// About PlatformX

import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

type Props = {
  label: string;
  placeholder: string;
  keyboardType: any;
  inputValue: any;
  error: string;
  onInputChange: (text: any) => void;
};
const CommonView: FC<Props> = ({
  label,
  inputValue,
  placeholder,
  keyboardType,
  error,
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
          {label}
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
  const [Input, setInput] = useState({
    firstName: {value: '', error: ''},
    lastName: {value: '', error: ''},
    userName: {value: '', error: ''},
    bio: {value: '', error: ''},
    dateOfBirth: {value: '', error: ''},
    phoneNumber: {value: '', error: ''},
    skills: {value: '', error: ''},
    interest: {value: '', error: ''},
    livesIn: {value: '', error: ''},
    education: {value: '', error: ''},
    linkedIn: {value: '', error: ''},
    github: {value: '', error: ''},
    twitter: {value: '', error: ''},
    portfolio: {value: '', error: ''},
  });
  const [{theme}, dispatch] = useStateValue();

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
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                firstName: text,
              };
            })
          }
          error={Input.firstName.error}
        />
        <CommonView
          label={'Last Name'}
          inputValue={Input.lastName.value}
          keyboardType={'default'}
          placeholder={'Enter Last Name'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                lastName: text,
              };
            })
          }
          error={Input.lastName.error}
        />
        <CommonView
          label={'User Name'}
          inputValue={Input.userName.value}
          keyboardType={'default'}
          placeholder={'Enter User Name'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                userName: text,
              };
            })
          }
          error={Input.userName.error}
        />

        <CommonView
          label={'Bio'}
          inputValue={Input.bio.value}
          keyboardType={'default'}
          placeholder={'Enter Bio'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                bio: text,
              };
            })
          }
          error={Input.bio.error}
        />

        <CommonView
          label={'Date of Birth'}
          inputValue={Input.dateOfBirth.value}
          keyboardType={'default'}
          placeholder={'Enter Date of Birth'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                dateOfBirth: text,
              };
            })
          }
          error={Input.dateOfBirth.error}
        />
        <CommonView
          label={'Phone Number'}
          inputValue={Input.phoneNumber.value}
          keyboardType={'number-pad'}
          placeholder={'Enter Phone Number'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                phoneNumber: text,
              };
            })
          }
          error={Input.phoneNumber.error}
        />

        <Header heading={'Profile Information'} />
        {/* skills interest lives in education  */}
        <CommonView
          label={'Skills'}
          inputValue={Input.skills.value}
          keyboardType={'default'}
          placeholder={'Enter Skills'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                skills: text,
              };
            })
          }
          error={Input.skills.error}
        />
        <CommonView
          label={'Interest'}
          inputValue={Input.interest.value}
          keyboardType={'default'}
          placeholder={'Enter Interests'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                interest: text,
              };
            })
          }
          error={Input.interest.error}
        />
        <CommonView
          label={'Lives In'}
          inputValue={Input.livesIn.value}
          keyboardType={'default'}
          placeholder={'Enter Your Location'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                livesIn: text,
              };
            })
          }
          error={Input.livesIn.error}
        />
        <CommonView
          label={'Education'}
          inputValue={Input.education.value}
          keyboardType={'default'}
          placeholder={'Enter Your Education'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                education: text,
              };
            })
          }
          error={Input.education.error}
        />
        <Header heading={'Social Handle'} />
        <CommonView
          label={'LinkedIn'}
          inputValue={Input.linkedIn.value}
          keyboardType={'number-pad'}
          placeholder={'Enter LinkedIn URL'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                linkedIn: text,
              };
            })
          }
          error={Input.linkedIn.error}
        />
        <CommonView
          label={'Github'}
          inputValue={Input.github.value}
          keyboardType={'number-pad'}
          placeholder={'Enter Github URL'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                github: text,
              };
            })
          }
          error={Input.github.error}
        />
        <CommonView
          label={'Twitter'}
          inputValue={Input.twitter.value}
          keyboardType={'number-pad'}
          placeholder={'Enter Twitter URL'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                twitter: text,
              };
            })
          }
          error={Input.twitter.error}
        />
        <CommonView
          label={'Portfolio'}
          inputValue={Input.portfolio.value}
          keyboardType={'number-pad'}
          placeholder={'Enter Portfolio URL'}
          onInputChange={text =>
            setInput(props => {
              return {
                ...props,
                portfolio: text,
              };
            })
          }
          error={Input.portfolio.error}
        />
      </ScrollView>
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
});
