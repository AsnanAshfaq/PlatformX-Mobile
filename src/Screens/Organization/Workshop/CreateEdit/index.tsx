/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
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
import Schedule from './Schedule';
import Speaker from './Speaker';
import Axios from '../../../../Utils/Axios';

type props = {
  navigation: any;
  route: any;
};

const SCREENS = ['General', 'Speaker', 'Schedule '];
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {method}: {method: 'edit' | 'create'} = route.params;
  const [ID, setID] = useState('');
  const [workshopData, setworkshopData] = useState({
    general: {},
    speaker: {},
    schedule: {},
  });

  const [active, setactive] = useState(0);
  const [loading, setloading] = useState(false);

  // get id of the workshop if screen is edit
  useEffect(() => {
    if (method === 'edit') {
      setID(route.params.ID);
    }
  }, []);

  useEffect(() => {
    if (method === 'edit') {
      // get workshop data
      Axios.get(`/api/workshop/${ID}/`)
        .then(response => {
          setloading(true);
          // getting general data
          var general = {
            topic: response.data.topic,
            description: response.data.description,
            poster: response.data.poster,
            take_away: response.data.take_away,
            prerequisites: response.data.prerequisites,
            is_paid: response.data.is_paid,
          };
          // is paid or not
          if (response.data.is_paid) {
            general['charges'] = response.data.charges;
          }

          // getting speaker data
          var speaker = {
            name: response.data.speaker.name,
            email: response.data.speaker.email,
            image: response.data.speaker.image,
            about: response.data.speaker.about,
          };

          // getting schedule data
          var schedule = {
            event_date: response.data.event_date,
            start_time: response.data.start_time,
            end_time: response.data.end_time,
          };

          setworkshopData(props => {
            return {
              schedule: schedule,
              speaker: speaker,
              general: general,
            };
          });
          setloading(false);
          // get general data
        })
        .catch(error => {
          if (error.response) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
          return error.response;
        });
    }
  }, [ID, loading]);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={`${method === 'edit' ? 'Edit Workshop' : 'Host Workshop'}`}
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
                <TouchableOpacity onPress={() => setactive(index)}>
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

      {active === 0 && <General method={method} data={workshopData.general} />}
      {active === 1 && <Speaker method={method} data={workshopData.speaker} />}
      {active === 2 && <Schedule method={method} />}
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
