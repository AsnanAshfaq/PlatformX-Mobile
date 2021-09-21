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
import {StyleSheet, Text, View, ScrollView} from 'react-native';
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
    bio: '',
  });
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'View Profile'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
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
            keyboardType={'default'}
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
            keyboardType={'default'}
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
            keyboardType={'default'}
          />
        </View>
        <View style={styles.center}>
          <CustomTextField
            defaultValue={Input.firstName}
            onChangeText={text =>
              setInput(props => {
                return {
                  ...props,
                  bio: text,
                };
              })
            }
            placeholder={'Bio'}
            textContentType={'name'}
            keyboardType={'default'}
          />
        </View>
      </ScrollView>
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
