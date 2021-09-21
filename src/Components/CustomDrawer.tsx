import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../../src/Store/StateProvider';
import {PROFILE_IMAGE} from '../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import SignOutModal from '../Modals/SignOutModal';

type Props = {
  label: string;
  icon_name: string;
  onPress: () => void;
};

const CustomDrawerItem: FC<Props> = ({label, icon_name, onPress}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <DrawerItem
      label={({focused, color}) => (
        <Text style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
          {label}
        </Text>
      )}
      icon={({focused, color, size}) => (
        <Ionicons name={icon_name} size={25} color={theme.TEXT_COLOR} />
      )}
      onPress={() => onPress()}
    />
  );
};

type props = {
  navigation?: any;
};

const CustomDrawer: FC<props> = (props: any) => {
  const {navigation} = props;
  const [LoadProfileImage, setLoadProfileImage] = useState(true);
  const [signOutModal, setSignOutModal] = useState(false);
  const [state, dispatch] = useStateValue();

  const drawerItems = [
    {
      id: 1,
      label: 'My Activities',
      icon_name: 'home-sharp',
      onPress: () => navigation.navigate('Activites'),
    },
    {
      id: 2,
      label: 'Saved',
      icon_name: 'bookmarks',
      onPress: () => console.log('Pressed on Bookmarks'),
    },
    {
      id: 3,
      label: 'Settings',
      icon_name: 'ios-settings-sharp',
      onPress: () => console.log('Pressed on Settings'),
    },
    {
      id: 4,
      label: 'Sign Out',
      icon_name: 'md-log-out-outline',
      onPress: () => {
        navigation.closeDrawer();
        setSignOutModal(true);
      },
    },
  ];

  return (
    <DrawerContentScrollView
      {...props}
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      {/* <DrawerItemList {...props} /> */}
      {/* header  */}
      <View
        style={[
          styles.headerContainer,
          {
            borderBottomColor: state.theme.SHADOW_COLOR,
          },
        ]}>
        <Text style={[styles.headerTitle, {color: state.theme.TEXT_COLOR}]}>
          PlatformX
        </Text>
      </View>

      <SignOutModal
        isShow={signOutModal}
        toggleModal={() => setSignOutModal(false)}
      />

      {/* profile section  */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: LoadProfileImage
              ? PROFILE_IMAGE
              : BASE_URL + state.user.profilePic,
          }}
          onLoadEnd={() => setLoadProfileImage(false)}
          onError={() => {
            setLoadProfileImage(false);
            ToastAndroid.show("Couldn't load profile image", 1500);
          }}
          style={styles.profileImage}
        />
        <Text style={[styles.fullName, {color: state.theme.TEXT_COLOR}]}>
          {state.user.firstName + ' ' + state.user.lastName}
        </Text>
        <Text style={[styles.userName, {color: state.theme.TEXT_COLOR}]}>
          @{state.user.userName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            // navigation.closeDrawer();
            navigation.navigate('Profile_Home');
          }}
          style={[
            styles.profileButtonContainer,
            {backgroundColor: state.theme.SHADOW_COLOR},
          ]}>
          <Text
            style={[styles.profileButtonText, {color: state.theme.TEXT_COLOR}]}>
            View Profile
          </Text>
        </TouchableOpacity>
      </View>
      {/* drawer items list  */}
      {drawerItems.map(item => (
        <CustomDrawerItem
          key={item.id}
          icon_name={item.icon_name}
          label={item.label}
          onPress={item.onPress}
        />
      ))}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  headerContainer: {
    borderBottomWidth: 1,
    width: Width * 0.6,
    marginHorizontal: Width * 0.02,
    padding: Width * 0.035,
  },
  headerTitle: {
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
    fontSize: Sizes.normal * 1.3,
  },
  userName: {
    fontSize: Sizes.normal * 0.9,
  },
  profileButtonContainer: {
    marginVertical: Width * 0.03,
    padding: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 15,
  },
  profileButtonText: {
    fontSize: Sizes.normal * 0.8,
  },
});

export default CustomDrawer;
