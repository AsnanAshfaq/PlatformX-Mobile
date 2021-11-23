/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import General from './General';
import Test from './Test';

type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Test'];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {screen}: {screen: 'edit' | 'create'} = route.params;
  const [active, setactive] = useState(0);
  const [FYPID, setFYPID] = useState('');

  const movePage = () => setactive(1);
  const goToMainScreen = () => navigation.goBack();
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Host FYP'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* custom slider  */}
      <View
        style={[
          styles.scroll,
          {
            backgroundColor: theme.SLIDER_BACKGROUND_COLOR,
            borderRadius: 10,
            // paddingHorizontal: 3,
          },
        ]}>
        <FlatList
          data={SCREENS}
          horizontal
          contentContainerStyle={{
            // marginHorizontal: 4,
            height: Height * 0.04,
            borderRadius: 10,
            marginTop: 7,
          }}
          renderItem={({item, index}) => (
            <>
              <View
                style={[
                  styles.container,
                  {
                    backgroundColor:
                      index === active
                        ? theme.SCREEN_BACKGROUND_COLOR
                        : theme.SLIDER_BACKGROUND_COLOR,
                    borderRadius: 10,
                    marginHorizontal: 10,
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // if the active index is 1 and user wants to go to general screen, RESTRICT IT
                    if (screen === 'create' && index === 0 && FYPID !== '') {
                      ToastAndroid.show(
                        'Go to FYP tab on main screen to edit',
                        1500,
                      );
                    } else {
                      setactive(index);
                    }
                  }}>
                  <Text
                    style={[
                      styles.screenName,
                      {
                        color: theme.TEXT_COLOR,
                        fontSize:
                          index === active ? Sizes.normal * 1.1 : Sizes.normal,
                      },
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
              {index < SCREENS.length - 1 && (
                <View
                  style={{
                    height: 40,
                    // marginTop: 5,
                    width: 1,
                    backgroundColor: theme.DIVIDER_COLOR,
                  }}
                />
              )}
            </>
          )}
        />
      </View>
      {active === 0 && (
        <General movePage={movePage} setFYPID={id => setFYPID(id)} />
      )}
      {active === 1 && <Test FYPID={FYPID} goToMainScreen={goToMainScreen} />}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  scroll: {
    marginTop: Height * 0.025,
    marginHorizontal: Width * 0.04,
    borderColor: 'transparent',
    height: Height * 0.06,
  },
  container: {
    width: Width * 0.4,
    paddingHorizontal: 5,
    // marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
