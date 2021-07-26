import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import CustomDrawer from '../Components/CustomDrawer';
import TabScreens from './Tab';
import Workshop from '../Screens/Workshop/Index';
import ProfileScreens from './Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      openByDefault={false}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: darkColors.DRAWER_BACKGROUND_COLOR,
        width: Width * 0.65,
        // borderBottomRightRadius: 30
        // borderTopRightRadius: 30,
        borderColor: darkColors.DRAWER_BACKGROUND_COLOR,
      }}
      // overlayColor={'grey'}
      drawerType={'slide'}>
      {/* <Drawer.Screen name="Tabs" component={TabScreens} /> */}
      <Drawer.Screen name="Profile_Home" component={ProfileScreens} />
    </Drawer.Navigator>
  );
};

export default DrawerScreens;
