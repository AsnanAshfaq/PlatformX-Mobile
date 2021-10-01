import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Hackathon from '../../Screens/Organization/Hackathon/Index';
import Workshop from '../../Screens/Organization/Workshop/Index';
import Projects from '../../Screens/Organization/Project/Index';
import Internship from '../../Screens/Organization/Internship/Index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

const Tab = createBottomTabNavigator();

const TabScreens = () => {
  const [state, dispatch] = useStateValue();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const ICON_SIZE = Width * 0.07;
          if (route.name === 'Hackathons') {
            iconName = focused ? 'code-slash' : 'code-sharp';
          } else if (route.name === 'Workshops') {
            iconName = focused ? 'ios-build' : 'ios-build-outline';
          } else if (route.name === 'Projects') {
            iconName = focused ? 'ios-bulb-sharp' : 'ios-bulb-outline';
          } else if (route.name === 'Internships') {
            iconName = focused
              ? 'card-account-details'
              : 'card-account-details-outline';
          }
          if (route.name === 'Internships') {
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={ICON_SIZE}
                color={color}
              />
            );
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={ICON_SIZE} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: state.theme.TAB_BAR_ACTIVE_COLOR,
        inactiveTintColor: state.theme.TAB_BAR_INACTIVE_COLOR,
        iconStyle: {
          color: state.theme.TAB_BAR_ICON_COLOR,
          // fontSize: Sizes.normal * 10,
        },
        allowFontScaling: true,
        keyboardHidesTabBar: true,
        // activeBackgroundColor: darkColors.LIGHT_BACKGROUND,
        style: {
          backgroundColor: state.theme.BACKGROUND_COLOR,
          borderTopColor: 'transparent',
          // position: 'absolute',
        },
      }}>
      <Tab.Screen name="Hackathons" component={Hackathon} />
      <Tab.Screen name="Workshops" component={Workshop} />
      <Tab.Screen name="Projects" component={Projects} />
      <Tab.Screen name="Internships" component={Internship} />
    </Tab.Navigator>
  );
};

export default TabScreens;
