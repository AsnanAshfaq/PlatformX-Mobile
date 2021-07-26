// TODO:
// background image
// profile image
// first name
// last name
// username
// date of birth    (calendar)
// skills
// interests
// lives in
// education

import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField';
import {darkColors} from '../../../Constants/Colors';

type props = {
  navigation: any;
  route: any;
};

const ViewProfile: FC<props> = ({navigation, route}) => {
  const [Input, setInput] = useState({
    firstName: '',
    lastName: '',
    userName: '',
  });
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'View Profile'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.center}>
        <CustomTextField
          defaultValue={Input.firstName}
          onChangeText={text =>
            setInput(props => {
              return {
                ...props,
                firstName: text,
              };
            })
          }
          placeholder={'First Name'}
          textContentType={'name'}
        />
      </View>
      <View style={styles.center}>
        <CustomTextField
          defaultValue={Input.firstName}
          onChangeText={text =>
            setInput(props => {
              return {
                ...props,
                lastName: text,
              };
            })
          }
          placeholder={'Last Name'}
          textContentType={'name'}
        />
      </View>
      <View style={styles.center}>
        <CustomTextField
          defaultValue={Input.firstName}
          onChangeText={text =>
            setInput(props => {
              return {
                ...props,
                userName: text,
              };
            })
          }
          placeholder={'User Name'}
          textContentType={'name'}
        />
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
