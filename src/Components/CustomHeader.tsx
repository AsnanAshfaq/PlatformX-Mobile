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

type props = {
  title: string;
  bell?: boolean;
  chat?: boolean;
  back?: boolean;
  drawer?: boolean;
};
const CustomHeader: FunctionComponent<props> = ({title}) => {
  return (
    <View style={styles.parent}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  parent: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    maxHeight: Height * 0.9,
    backgroundColor: darkColors.BACKGROUND_COLOR,
  },
  headerTitle: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 1.2,
  },
});
