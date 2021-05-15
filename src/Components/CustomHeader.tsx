//TODO:
// drawer icon
// back button
// title
// messaging screen icon
// notification icon

import React, {FunctionComponent} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Height, Width, Sizes} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Badge} from 'react-native-elements';

type props = {
  title: string;
  navigation: any;
  bell?: boolean;
  chat?: boolean;
  back?: boolean;
  drawer?: boolean;
};

const ICON_SIZE = Width * 0.07;

const CustomHeader: FunctionComponent<props> = ({
  navigation,
  title,
  back,
  drawer,
}) => {
  return (
    <View style={styles.parent}>
      {/* drawer navigation  or back button*/}
      {drawer && (
        <View style={styles.leftIconContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <FontAwesome
              name={'navicon'}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
              size={ICON_SIZE}
              style={styles.iconPadding}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* title of the screen  */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {/* right icons  */}
      <View style={styles.RightIconContainer}>
        <TouchableWithoutFeedback
          onPress={() => console.log('Navigate to chat screen')}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons
              name={'chatbubble-outline'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
              style={styles.iconPadding}
            />
            <View style={styles.badgeStyle}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => console.log('Navigate to notifications screen')}>
          <View style={{flexDirection: 'row'}}>
            <Entypo
              name={'bell'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
              style={styles.iconPadding}
            />
            <View style={styles.badgeStyle}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
    paddingLeft: 5,
  },
  RightIconContainer: {
    flex: 0.25,
    flexDirection: 'row',
  },
  iconPadding: {
    padding: 8,
  },
  badgeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 21,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.BADGE_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: darkColors.BADGE_COLOR,
  },
  badgeText: {
    color: darkColors.BADGE_TEXT_COLOR,
  },
});
