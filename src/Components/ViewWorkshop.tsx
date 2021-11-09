import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Linking,
  ScrollView,
} from 'react-native';

import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CustomHeader from './CustomHeader';
import axios from '../Utils/Axios';
import Foundation from 'react-native-vector-icons/Foundation';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import Bullet from './Bullet';
import {Calendar, Cash, Github, LinkedIn, Twitter} from './Icons';
import {commaSeperator} from '../Utils/Numbers';
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const WORKSHOP_DETAILS =
  'React Native is a powerful framework that allows us to build fully native applications for iOS and Android with just one JavaScript codebase. Mobile development provides unique and interesting opportunities and challenges in application design and features. In this course we will explore the fundamental building blocks of a React Native application, how to fetch and display data, navigate between screens, persist user data across app launches and plenty more.';

const SCHEDULE = [
  {
    time: '9:30AM',
    label: 'Introduction and setup',
  },
  {
    time: '10:00AM',
    label: 'Components and styling',
  },
  {
    time: '11:00AM',
    label: 'Navigation',
  },
  {
    time: '12:00PM',
    label: 'Network requests and forms',
  },
];

const TAKE_AWAYS = [
  'Learn how Reat Native enables you to build two apps with one codebase',
  'Use native components exposed by the platform',
  'State management using React hooks',
  'Display data dynamically from APIs',
  'Persist data across app launches',
  'Spice up your app with animations',
];

const SPEAKER = [
  {
    name: 'Muhammad Asnan Ashfaq',
    image: 'https://avatars.githubusercontent.com/u/65377376?v=4',
    about:
      'Asnan is a Senior Software Engineer at Formidable Labs. Her career started off with Mathematics and Python, and has been gradually moving up the stack. She has now been building apps with React for the past four years, and with React Native for with the past two years. ',
    social_links: [
      {
        tag: 'github',
        link: 'https://github.com/AsnanAshfaq',
      },
      {
        tag: 'linkedin',
        link: 'https://www.linkedin.com/in/muhammad-asnan-b32243189/',
      },
      {
        tag: 'twitter',
        link: 'https://twitter.com/shanay_ash',
      },
    ],
  },
];

const PREREQUISITES = [
  'You will need  a Windows, Mac or Linux machine with Node.js installed, and a physical Android or IPhone device.',
];

const ViewWorkshop: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [WorkshopData, setWorkshopData] = useState({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];

  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setWorkshopData(result.data);
        setLoading(false);
      })
      .catch(error => setLoading(false));
  }, [ID]);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Details'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && WorkshopData ? (
        <>
          <ScrollView style={styles.scroll}>
            <View style={styles.container}>
              <View style={[styles.container]}>
                <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                  Join us for an awesome workshop on
                </Text>
              </View>
            </View>
            {/* topic container  */}
            <View style={[styles.container, styles.center]}>
              <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
                React Native
              </Text>
            </View>

            {/* poster container  */}
            <View style={[styles.container, styles.center]}>
              <Image
                style={styles.poster}
                source={{
                  uri:
                    'https://img.freepik.com/free-psd/building-your-own-home-print-template_23-2148924851.jpg?size=338&ext=jpg',
                }}
              />
            </View>

            {/* details container  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <Foundation
                  name={'clipboard-notes'}
                  size={ICON_SIZE * 2}
                  color={theme.GREEN_COLOR}
                />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Workshop Details
                </Text>
              </View>
              <View style={[styles.center, styles.detailsTextContainer]}>
                <Text style={[styles.detailsText, {color: theme.TEXT_COLOR}]}>
                  {WORKSHOP_DETAILS}
                </Text>
              </View>
            </View>

            {/* takeaways container  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <AntDesign
                  name={'key'}
                  size={ICON_SIZE * 1.5}
                  color={theme.GREEN_COLOR}
                />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Some Key Take Aways{' '}
                </Text>
              </View>
              <View style={[styles.container]}>
                <Text
                  style={[
                    {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                  ]}>
                  By participating along with us in the workshop, you'll learn:
                </Text>
              </View>
              {TAKE_AWAYS.map((take_away, index) => (
                <View
                  style={[
                    styles.takeAwayRowContainer,
                    {marginVertical: index === TAKE_AWAYS.length - 1 ? 15 : 0}, // adding margin vertical only to last item
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        paddingRight: 3,
                        paddingTop: 3,
                        flex: 0.1,
                      }}>
                      <Bullet />
                    </View>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={[
                          styles.takeAwayPointsText,
                          {color: theme.TEXT_COLOR},
                        ]}>
                        {take_away}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* schedule  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <Calendar color={theme.GREEN_COLOR} size={2} />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Schedule{' '}
                </Text>
              </View>
              <View style={[styles.container]}>
                <Text
                  style={[
                    {
                      fontSize: Sizes.normal * 0.65,
                      fontStyle: 'italic',
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  See you on{' '}
                </Text>
              </View>
              <View style={[styles.container, styles.center]}>
                <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
                  Sunday 23rd December, 20201
                </Text>
              </View>
              <View style={[styles.container, styles.center]}>
                <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                  Total Duration 3 Hours
                </Text>
              </View>

              {SCHEDULE.map((schedule, index) => (
                <View
                  style={[
                    styles.scheduleRowContainer,
                    {marginVertical: index === SCHEDULE.length - 1 ? 10 : 0}, // adding margin vertical only to last item
                  ]}
                  key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View style={styles.schedulePointContainer}>
                      <Bullet />
                      <Text
                        style={[
                          styles.scheduleTimeText,
                          {color: theme.TEXT_COLOR},
                        ]}>
                        {schedule.time}
                      </Text>
                    </View>
                    <View style={styles.scheduleLabelContainer}>
                      <Text
                        style={[
                          styles.scheduleLabelText,
                          {color: theme.TEXT_COLOR},
                        ]}>
                        {schedule.label}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* speaker  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <IonIcons
                  name={'mic'}
                  size={ICON_SIZE * 1.5}
                  color={theme.GREEN_COLOR}
                />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Speaker{SPEAKER.length > 1 && 's'}
                </Text>
              </View>
              {SPEAKER.map((speaker, index) => (
                <View style={[styles.speakerContainer]} key={index}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View style={[styles.speakerImageContainer]}>
                      <Image
                        source={{uri: speaker.image}}
                        style={styles.speakerImage}
                      />
                    </View>
                    <View style={[styles.speakerNameContainer]}>
                      <Text
                        style={[
                          styles.speakerNameText,
                          {color: theme.TEXT_COLOR},
                        ]}>
                        {speaker.name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.speakerAboutContainer}>
                    <Text
                      style={[
                        styles.speakerAboutText,
                        {color: theme.TEXT_COLOR},
                      ]}>
                      {speaker.about}
                    </Text>
                  </View>
                  <View
                    style={[styles.speakerReachTextContainer, styles.center]}>
                    <Text
                      style={[
                        styles.normalText,
                        {color: theme.DIM_TEXT_COLOR},
                      ]}>
                      Reach me at
                    </Text>
                  </View>
                  <View style={[styles.speakerReachIconContainer]}>
                    {speaker.social_links.map((links, index) => (
                      <>
                        {links.tag === 'github' && (
                          <TouchableWithoutFeedback
                            onPress={() => Linking.openURL(links.link)}>
                            <View style={styles.iconMargin}>
                              <Github size={1.3} />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                        {links.tag === 'linkedin' && (
                          <TouchableWithoutFeedback
                            onPress={() => Linking.openURL(links.link)}>
                            <View style={styles.iconMargin}>
                              <LinkedIn size={1.3} />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                        {links.tag === 'twitter' && (
                          <TouchableWithoutFeedback
                            onPress={() => Linking.openURL(links.link)}>
                            <View style={styles.iconMargin}>
                              <Twitter size={1.3} />
                            </View>
                          </TouchableWithoutFeedback>
                        )}
                      </>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* charges  */}
            <View
              style={[
                styles.center,
                styles.card,
                {backgroundColor: theme.CARD_BACKGROUND_COLOR},
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <Cash color={theme.GREEN_COLOR} size={1.5} />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Charges{' '}
                </Text>
              </View>
              <View
                style={[styles.center, styles.container, {marginBottom: 10}]}>
                <Text style={[styles.chargesText, {color: theme.TEXT_COLOR}]}>
                  Rs {commaSeperator(2000)}
                </Text>
              </View>
            </View>

            {/* pre-requisites  */}
            <View
              style={[
                styles.center,
                styles.card,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  marginBottom: 10,
                },
              ]}>
              <View style={[styles.center, styles.cardIconContainer]}>
                <MaterialCommunityIcons
                  name={'notebook'}
                  size={ICON_SIZE * 1.5}
                  color={theme.GREEN_COLOR}
                />
              </View>
              <View style={[styles.center, styles.cardHeadingContainer]}>
                <Text
                  style={[
                    styles.cardHeadingText,
                    {color: theme.DIM_TEXT_COLOR},
                  ]}>
                  Prerequisites
                </Text>
              </View>
              <View style={[styles.container]}>
                <Text
                  style={[
                    {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                  ]}>
                  Following are the prerequisites to attend this workshop{' '}
                </Text>
              </View>
              {PREREQUISITES.map((pre, index) => (
                <View
                  style={[
                    styles.takeAwayRowContainer,
                    {
                      marginVertical:
                        index === PREREQUISITES.length - 1 ? 10 : 0,
                    }, // adding margin vertical only to last item
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        paddingRight: 3,
                        paddingTop: 3,
                        flex: 0.1,
                      }}>
                      <Bullet />
                    </View>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={[styles.preReqText, {color: theme.TEXT_COLOR}]}>
                        {pre}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {screen === 'student' && (
            <CustomButton
              text={'Join Now'}
              onPress={() => console.log('Participating screen')}
            />
          )}
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewWorkshop;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  topicText: {
    fontSize: Sizes.large * 1.2,
  },
  poster: {
    width: Width * 0.8,
    height: Width,
    borderRadius: 20,
  },
  card: {
    borderRadius: 10,
    borderColor: 'transparent',
    // marginLeft: Width * 0.1,
    // width: Width * 0.8,
    marginHorizontal: Width * 0.058,
    marginTop: 20,
  },
  cardIconContainer: {
    marginTop: 8,
    marginBottom: 5,
    // marginVertical: 5,
  },
  cardHeadingContainer: {
    // marginTop: 3,
  },
  cardHeadingText: {
    fontSize: Sizes.normal * 1.2,
  },
  detailsTextContainer: {
    marginVertical: 10,
    marginHorizontal: Width * 0.03,
    // backgroundColor: 'red',
  },
  detailsText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'center',
  },
  takeAwayRowContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  takeAwayPointsText: {
    fontSize: Sizes.normal * 0.8,
    fontWeight: 'bold',
    lineHeight: 20,
    flexShrink: 1,
  },
  scheduleRowContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  scheduleTimeText: {
    fontSize: Sizes.normal * 0.85,
    lineHeight: 18,
    flexShrink: 1,
    fontWeight: 'bold',
  },
  scheduleLabelText: {
    fontWeight: 'bold',
  },
  schedulePointContainer: {
    paddingRight: 3,
    paddingTop: 3,
    flex: 0.35,
    flexDirection: 'row',
  },
  scheduleLabelContainer: {
    flex: 0.65,
    alignItems: 'flex-start',
  },
  speakerContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  speakerImageContainer: {
    flex: 0.25,
  },
  speakerNameContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  speakerImage: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderRadius: 14,
    borderColor: 'transparent',
  },
  speakerNameText: {
    fontSize: Sizes.normal * 0.95,
  },
  speakerAboutContainer: {
    marginVertical: 10,
  },
  speakerAboutText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 22,
    textAlign: 'left',
  },
  speakerReachTextContainer: {
    marginVertical: 10,
  },
  speakerReachIconContainer: {
    marginHorizontal: Width * 0.065,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconMargin: {
    marginHorizontal: Width * 0.04,
  },
  chargesTextContainer: {},
  chargesText: {
    fontSize: Sizes.normal * 1.2,
  },
  preReqText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 20,
    flexShrink: 1,
  },
});
