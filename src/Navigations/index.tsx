import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing Auth screen stack
import AuthScreens from './Auth';
import DrawerScreens from './Drawer';
// other imports
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {useStateValue} from '../Store/StateProvider';
import Create_EditPost from '../Screens/Student/Post/CreateEdit';
import Chat from './Student/Chat';
import Notification from './Student/Notification';
import Settings from './Student/Settings';
import ViewHackathon from '../Screens/Student/Hackathon/View';
import RegisterHackathon from '../Screens/Student/Hackathon/Register';
import CreateEditHackathon from '../Screens/Organization/Hackathon/CreateEdit';
import StudentScreens from './Student/Index';
import OrganizationScreens from './Organization/Index';
// declaring navigators
const Stack = createStackNavigator();

export const config: TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1400,
    damping: 50,
    mass: 1,
    // delay: 10,
    // bounciness: 20,
    // speed: 1000,
    // velocity: 20,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Navigation: FC = () => {
  // get sign in  state from context store
  const [state, dispatch] = useStateValue();
  const {isSignedIn} = state;
  const {theme} = state;
  const {userType} = state;

  console.log(userType);
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: theme.BACKGROUND_COLOR,
          border: '#fff',
          card: '#fff',
          notification: '#fff',
          primary: '#fff',
          text: '#fff',
        },
        dark: false,
      }}>
      <Stack.Navigator
        screenOptions={({navigation}) => {
          return {
            header: () => null,
            animationEnabled: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            detachPreviousScreen: !navigation.isFocused(),
            // animationTypeForReplace: 'push',
          };
        }}>
        {isSignedIn ? (
          <>
            {userType === 'student' ? (
              <Stack.Screen name={'Student'} component={StudentScreens} />
            ) : userType === 'organization' ? (
              <Stack.Screen
                name={'organization'}
                component={OrganizationScreens}
              />
            ) : (
              <Stack.Screen name="Auth" component={AuthScreens} />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Auth" component={AuthScreens} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
