import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// importing Auth screen stack
import AuthScreens from './Auth';
import DrawerScreens from './Drawer';
// other imports
import {darkColors} from '../Constants/Colors';
import {TransitionSpec} from '@react-navigation/stack/lib/typescript/src/types';
import {useStateValue} from '../Store/StateProvider';
import Create_EditPost from '../Screens/Post/Create_EditPost';
import Chat from './Chat';
import Notification from './Notification';
import Settings from './Settings';

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

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: state.theme.BACKGROUND_COLOR,
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
            <Stack.Screen name="Main" component={DrawerScreens} />
            {/* <Stack.Screen name="Create_Edit_Post" component={Create_EditPost} /> */}
            {/* <Stack.Screen name="Chat" component={Chat} /> */}
            {/* <Stack.Screen name="Notification" component={Notification} /> */}
            {/* <Stack.Screen name="Settings" component={Settings} /> */}

            {/* <Stack.Screen name="View_Hackathon" component={ViewHackathon} /> */}
            {/* <Stack.Screen
              name="Register_Hackathon"
              component={RegisterHackathon}
            /> */}
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
