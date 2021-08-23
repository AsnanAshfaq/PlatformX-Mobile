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
import {darkColors} from '../Constants/Colors';

const ICON_SIZE = Width * 0.07;

type prop = {
  navigation: any;
};
const PopUpMenu: FC<prop> = ({navigation}) => {
  return (
    <Menu>
      <MenuTrigger>
        <View>
          <Ionicons
            name={'ellipsis-vertical'}
            size={ICON_SIZE}
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
          />
        </View>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: darkColors.SHADOW_COLOR,
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
        <MenuOption
          onSelect={() => console.log('Follow Menu has been selected')}>
          <View style={styles.menuOptionContainer}>
            <Text style={styles.menuOptionText}>Follow</Text>
          </View>
        </MenuOption>
        <MenuOption
          onSelect={() => console.log('Share Menu has been selected')}>
          <View style={styles.menuOptionContainer}>
            <Text style={styles.menuOptionText}>Share</Text>
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
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
});
