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
  isEditable: boolean;
  post?: undefined;
  deleteModal: (prev: boolean) => void;
};
const PopUpMenu: FC<prop> = ({navigation, isEditable, post, deleteModal}) => {
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
      {/* if the post is editable  */}
      {isEditable ? (
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
            onSelect={() =>
              navigation.navigate('Create_Edit_Post', {
                screen: 'Edit',
                post: post,
              })
            }>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Edit</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => deleteModal(true)}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Delete</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      ) : (
        // else report post
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: darkColors.SHADOW_COLOR,
              borderWidth: 1,
              borderRadius: 20,
              marginRight: 20,
              width: 140,
              marginTop: 24,
              marginLeft: -10,
              borderColor: 'transparent',
            },
            optionWrapper: {
              height: 35,
            },
          }}>
          <MenuOption onSelect={() => console.log('Clicked on save post')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Save Post</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => console.log('Clicked on report')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Report</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      )}
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
