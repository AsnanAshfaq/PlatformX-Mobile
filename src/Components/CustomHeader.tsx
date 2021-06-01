//TODO:
// drawer icon
// back button
// title
// messaging screen icon
// notification icon

import React, {FunctionComponent, useEffect} from 'react';
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
import CustomBadge from './CustomBadge';
import {useStateValue} from '../Store/StateProvider';

type props = {
  title: string;
  navigation: any;
  bell?: boolean;
  chat?: boolean;
  back?: boolean;
  drawer?: boolean;
  onBackPress?: () => void;
};

const ICON_SIZE = Width * 0.07;

const CustomHeader: FunctionComponent<props> = ({
  navigation,
  title,
  back,
  drawer,
  chat,
  bell,
  onBackPress,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View style={[styles.parent, {backgroundColor: theme.BACKGROUND_COLOR}]}>
      {/* drawer navigation  or back button*/}
      {drawer && (
        <View style={styles.leftIconContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
            <FontAwesome
              name={'navicon'}
              color={theme.TAB_BAR_ACTIVE_COLOR}
              size={ICON_SIZE}
              style={styles.iconPadding}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      {back && (
        <View style={styles.leftIconContainer}>
          <TouchableWithoutFeedback onPress={onBackPress}>
            <FontAwesome
              name={'arrow-left'}
              color={theme.TAB_BAR_ACTIVE_COLOR}
              size={ICON_SIZE}
              style={styles.iconPadding}
            />
          </TouchableWithoutFeedback>
        </View>
      )}

      {/* title of the screen  */}
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, {color: theme.TEXT_COLOR}]}>
          {title}
        </Text>
      </View>
      {/* right icons  */}
      <View style={styles.RightIconContainer}>
        {chat && (
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
            <View style={styles.row}>
              <Ionicons
                name={'chatbubble-outline'}
                size={ICON_SIZE}
                color={theme.TAB_BAR_ACTIVE_COLOR}
                style={styles.iconPadding}
              />
              {/* badge  */}
              <CustomBadge value={5} />
            </View>
          </TouchableWithoutFeedback>
        )}

        {bell && (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Notification')}>
            <View style={styles.row}>
              <Entypo
                name={'bell'}
                size={ICON_SIZE}
                color={theme.TAB_BAR_ACTIVE_COLOR}
                style={styles.iconPadding}
              />
              {/* badge  */}
              <CustomBadge />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  parent: {
    height: Height * 0.09,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    flex: 0.6,
    // paddingLeft: 5,
  },
  headerTitle: {
    fontSize: Sizes.large * 1.2,
  },
  leftIconContainer: {
    flex: 0.15,
    paddingLeft: 5,
  },
  RightIconContainer: {
    flex: 0.25,
    flexDirection: 'row',
    // marginHorizontal: 5,
  },
  iconPadding: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
  },
});
