import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import axios from '../../Utils/Axios';
import CustomHeader from '../../Components/CustomHeader';

//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  navigation: any;
  route: any;
};
const ViewHackathon: FC<props> = ({navigation, route}) => {
  useEffect(() => {
    // fetch hackathon data
  }, []);
  console.log('Rendering hackathon screen');

  console.log('Hackahton id is ', route.params.ID);
  return (
    <ScrollView>
      <CustomHeader
        title={'Dummy'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
        chat
        bell
      />

      <Text>This is the view hackathon screen</Text>
    </ScrollView>
  );
};

export default ViewHackathon;

const styles = StyleSheet.create({});
