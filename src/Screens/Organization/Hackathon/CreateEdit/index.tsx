/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import General from './General';
import Judges from './Judges';
import Media from './Media';
import Prize from './Prize';
import Schedule from './Schedule';

type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Media', 'Prizes', 'Judges', 'Schedule'];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {screen}: {screen: 'edit' | 'create'} = route.params;
  const [active, setactive] = useState(0);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Host Hackathon'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

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
            // backgroundColor: 'red',
            height: Height * 0.05,
            borderRadius: 10,
            marginVertical: 2.5,
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
                    // paddingVertical: 1,
                    marginHorizontal: 10,
                    // marginVertical: ,
                    marginTop: index === active ? 2.5 : 0,
                    paddingBottom: index === active ? 2 : 0,
                  },
                ]}>
                <TouchableOpacity onPress={() => setactive(index)}>
                  <Text
                    style={[
                      styles.screenName,
                      {
                        color: theme.TEXT_COLOR,
                        fontSize:
                          index === active
                            ? Sizes.normal * 1.2
                            : Sizes.normal * 1.1,
                      },
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
              {index < SCREENS.length - 1 && (
                <View
                  style={{
                    height: 30,
                    marginVertical: 7,
                    width: 1,
                    backgroundColor: theme.DIVIDER_COLOR,
                  }}
                />
              )}
            </>
          )}
        />
      </View>
      {/* <General /> */}
      {/* <Media /> */}
      {/* <Prize /> */}
      {/* <Schedule /> */}
      <Judges />
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
    width: Width * 0.3,
    paddingHorizontal: 5,
    // marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
