import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStateValue} from '../Store/StateProvider';
// import {darkColors} from '../Constants/Colors';

const ICON_SIZE = Width * 0.07;

type prop = {
  navigation: any;
  handleBookmark: () => void;
  handleReport: () => void;
  handleShare: () => void;
};
const PopUpMenu: FC<prop> = ({
  navigation,
  handleBookmark,
  handleReport,
  handleShare,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <Menu>
      <MenuTrigger>
        <View>
          <Ionicons
            name={'ellipsis-vertical'}
            size={ICON_SIZE}
            color={theme.TAB_BAR_ACTIVE_COLOR}
          />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.SHADOW_COLOR,
            borderWidth: 5,
            borderRadius: 20,
            width: 150,
            borderColor: 'transparent',
            marginTop: 20,
            marginLeft: -10,
            // marginRight: 30,
          },
          optionWrapper: {
            height: 35,
          },
        }}>
        <MenuOption onSelect={() => handleBookmark()}>
          <View style={styles.menuOptionContainer}>
            <Text style={[styles.menuOptionText, {color: theme.TEXT_COLOR}]}>
              Bookmark
            </Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => handleReport()}>
          <View style={styles.menuOptionContainer}>
            <Text style={[styles.menuOptionText, {color: theme.TEXT_COLOR}]}>
              Report
            </Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => handleShare()}>
          <View style={styles.menuOptionContainer}>
            <Text style={[styles.menuOptionText, {color: theme.TEXT_COLOR}]}>
              Share
            </Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;

const styles = StyleSheet.create({
  menuOptionContainer: {
    paddingHorizontal: 10,
  },
  menuOptionText: {
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
});
