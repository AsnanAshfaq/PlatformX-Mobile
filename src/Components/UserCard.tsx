import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  navigations: any;
  user: any;
};

const ICON_SIZE = Width * 0.07;

const UserCard: FC<props> = ({navigations, user}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.parent}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image source={{uri: user.user_image}} style={styles.image} />
        </View>
        {/* name and user name container  */}
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{user.user_name}</Text>
          <Text style={styles.fullname}>{user.full_name}</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity>
            <Ionicons
              name={'ellipsis-vertical'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 20,
    padding: 10,
    shadowColor: darkColors.SHADOW_COLOR,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  nameContainer: {
    margin: 5,
    flex: 0.4,
    justifyContent: 'space-between',
  },
  username: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  fullname: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
  optionContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
