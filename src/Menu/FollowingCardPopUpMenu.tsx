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

const ICON_SIZE = Width * 0.07;

type prop = {
  Modal: () => void;
};
const PopUpMenu: FC<prop> = ({Modal}) => {
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
      {/* if the post is editable  */}

      <MenuOptions
        customStyles={{
          optionsContainer: {
            backgroundColor: theme.SHADOW_COLOR,
            borderWidth: 5,
            borderRadius: 20,
            width: 120,
            borderColor: 'transparent',
            marginTop: 20,
            marginLeft: -10,
            // marginRight: 30,
          },
          optionWrapper: {
            height: 35,
          },
        }}>
        <MenuOption onSelect={() => Modal()}>
          <View style={styles.menuOptionContainer}>
            <Text
              style={[
                styles.menuOptionText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Unfollow
            </Text>
          </View>
        </MenuOption>
        {/* <MenuOption onSelect={() => handleUnFollow()}>
          <View style={styles.menuOptionContainer}>
            <Text style={styles.menuOptionText}>Delete</Text>
          </View>
        </MenuOption> */}
      </MenuOptions>
    </Menu>
  );
};

export default PopUpMenu;

const styles = StyleSheet.create({
  menuOptionContainer: {
    paddingHorizontal: 10,
    // paddingVertical: 20,
    // marginVertical: 20,
  },
  menuOptionText: {
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
});
