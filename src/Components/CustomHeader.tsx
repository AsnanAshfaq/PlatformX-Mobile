//TODO:
// drawer icon
// back button
// title
// messaging screen icon
// notification icon

import React, {FunctionComponent} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Height, Width, Sizes} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  title: string;
  navigation: any;
  bell?: boolean;
  chat?: boolean;
  back?: boolean;
  drawer?: boolean;
};

const ICON_SIZE = Width * 0.07;

const CustomHeader: FunctionComponent<props> = ({navigation, title}) => {
  return (
    <View style={styles.parent}>
      {/* drawer navigation  or back button*/}
      <View style={styles.leftIconContainer}>
        <FontAwesome
          name={'navicon'}
          color={darkColors.TEXT_COLOR}
          size={ICON_SIZE}
          style={styles.iconpadding}
        />
      </View>
      {/* title of the screen  */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {/* right icons  */}
      <View style={styles.RightIconContainer}>
        <Ionicons
          name={'chatbubble-outline'}
          size={ICON_SIZE}
          color={darkColors.TEXT_COLOR}
          style={styles.iconpadding}
        />
        <Entypo
          name={'bell'}
          size={ICON_SIZE}
          color={darkColors.TEXT_COLOR}
          style={styles.iconpadding}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  parent: {
    height: Height * 0.09,
    backgroundColor: darkColors.BACKGROUND_COLOR,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 0.6,
    // paddingLeft: 5,
  },
  headerTitle: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 1.2,
  },
  leftIconContainer: {
    flex: 0.15,
  },
  RightIconContainer: {
    flex: 0.25,
    flexDirection: 'row',
  },
  iconpadding: {
    padding: 8,
  },
});
