import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';

type props = {
  navigation?: any;
};
const CustomDrawer: FC<props> = (props: any) => {
  return (
    <DrawerContentScrollView {...props} style={styles.parent}>
      {/* <DrawerItemList {...props} /> */}
      {/* header  */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>PlatFormX</Text>
      </View>

      {/* profile section  */}
      <View style={styles.profileContainer}>
        <Image
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>Asnan Ashfaq</Text>
        <Text style={styles.userName}>@shanay_ash</Text>
        <TouchableOpacity
          onPress={() => console.log('Pressed on profile button')}
          style={styles.profileButtonContainer}>
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
      <DrawerItem
        label={({focused, color}) => (
          <Text style={{color: darkColors.TEXT_COLOR, fontSize: Sizes.normal}}>
            My Activities
          </Text>
        )}
        icon={({focused, color, size}) => (
          <Ionicons
            name={'home-sharp'}
            size={25}
            color={darkColors.TEXT_COLOR}
          />
        )}
        onPress={() => console.log('Pressed ')}
      />
      <DrawerItem
        label={({focused, color}) => (
          <Text style={{color: darkColors.TEXT_COLOR, fontSize: Sizes.normal}}>
            Saved
          </Text>
        )}
        icon={({focused, color, size}) => (
          <Ionicons
            name={'bookmarks'}
            size={25}
            color={darkColors.TEXT_COLOR}
          />
        )}
        onPress={() => console.log('Pressed ')}
      />
      <DrawerItem
        label={({focused, color}) => (
          <Text style={{color: darkColors.TEXT_COLOR, fontSize: Sizes.normal}}>
            Settings
          </Text>
        )}
        icon={({focused, color, size}) => (
          <Ionicons
            name={'ios-settings-sharp'}
            size={25}
            color={darkColors.TEXT_COLOR}
          />
        )}
        onPress={() => console.log('Pressed ')}
      />
    </DrawerContentScrollView>
  );
};

// md-log-out-outline

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
    width: Width * 0.6,
    marginHorizontal: Width * 0.02,
    borderBottomColor: darkColors.SHADOW_COLOR,
    padding: Width * 0.035,
  },
  headerTitle: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 1.3,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
  },
  profileImage: {
    height: Height * 0.09,
    width: Width * 0.18,
    borderRadius: 40,
  },
  fullName: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.3,
  },
  userName: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
  profileButtonContainer: {
    marginVertical: Width * 0.03,
    backgroundColor: darkColors.SHADOW_COLOR,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15,
  },
  profileButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
});

export default CustomDrawer;
