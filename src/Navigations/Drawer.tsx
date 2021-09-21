import React from 'react';
import {Width} from '../Constants/Size';
import CustomDrawer from '../Components/CustomDrawer';
import TabScreens from './Tab';
import ProfileScreens from './Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Activities from '../Screens/Profile/Student/Activities';
import {useStateValue} from '../Store/StateProvider';

const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
  const [state, dispatch] = useStateValue();

  return (
    <Drawer.Navigator
      initialRouteName="Tabs"
      openByDefault={false}
      drawerContent={props => <CustomDrawer {...props} />}
      drawerStyle={{
        backgroundColor: state.theme.DRAWER_BACKGROUND_COLOR,
        width: Width * 0.65,
        // borderBottomRightRadius: 30
        // borderTopRightRadius: 30,
        borderColor: state.theme.DRAWER_BACKGROUND_COLOR,
      }}
      // overlayColor={'grey'}
      drawerType={'slide'}>
      <Drawer.Screen name="Tabs" component={TabScreens} />
      <Drawer.Screen name="Profile_Home" component={ProfileScreens} />
      <Drawer.Screen name="Activites" component={Activities} />
    </Drawer.Navigator>
  );
};

export default DrawerScreens;
