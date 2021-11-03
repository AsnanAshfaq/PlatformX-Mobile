import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import ViewHackathonProjectComponent from '../../../Components/ViewHackathonProject';

type props = {
  navigation: any;
  route: any;
};

const ViewProject: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  return (
    <ViewHackathonProjectComponent
      navigation={navigation}
      route={route}
      ID={ID}
      screen={'organization'}
    />
  );
};

export default ViewProject;
