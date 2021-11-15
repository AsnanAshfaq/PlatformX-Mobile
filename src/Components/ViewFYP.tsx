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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import Bullet from './Bullet';
import {commaSeperator} from '../Utils/Numbers';
type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ICON_SIZE = Width * 0.07;

const FYPS = {
  id: 1,
  organization: {
    name: 'Netsol',
    user: {
      profile_image: {
        path:
          'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png',
      },
    },
  },
  created_at: new Date().toLocaleDateString(),
  name: 'Tour Recommender',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit perspiciatis sequi officiis porro fugit temporibus cupiditate commodi ipsum animi veritatis. Debitis modi ad cumque iste exercitationem neque? Impedit, ea ipsam.',
  category: [
    'Artificial Intellligence',
    'Web Application',
    'Desktop Application',
  ],
  learning_outcomes: [
    'Work with Google Cloud',
    'Learn how to encrypt messages',
    "Learn to develop API's",
  ],
  technologies: ['Docker', 'Node', 'Firebase'],
  team_members: 3,
  days_left: 10,
};

const ViewFYP: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [FYPData, setFYPData] = useState<any>({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];

  useEffect(() => {
    // fetching fyp
    axios
      .get(`/api/fyp/${ID}`)
      .then(result => {
        setFYPData(result.data);
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

      {!loading && FYPData ? (
        <>
          <ScrollView>
            <View style={styles.scroll}>
              {screen === 'student' && (
                <View style={styles.container}>
                  <Text
                    style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                    Apply now to start working with us on
                  </Text>
                </View>
              )}
              {/* topic container  */}
              <View style={[styles.container, styles.center]}>
                <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
                  {FYPData.name}
                </Text>
              </View>

              {/* details container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'ios-bulb-sharp'}
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
                    Basic Idea
                  </Text>
                </View>
                <View style={[styles.center, styles.detailsTextContainer]}>
                  <Text style={[styles.detailsText, {color: theme.TEXT_COLOR}]}>
                    {FYPData.description}
                  </Text>
                </View>
              </View>

              {/* category container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'grid-outline'}
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
                    Categories
                  </Text>
                </View>
                <View style={[styles.container]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    {FYPData.name} falls under the following software
                    development category
                  </Text>
                </View>
                {FYPData.category.map((category, index) => (
                  <View
                    style={[
                      styles.categoryRowsContainer,
                      {
                        marginVertical:
                          index === FYPData.category.length - 1 ? 15 : 0,
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
                          style={[
                            styles.categoryPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {category}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* technologies container  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <Ionicons
                    name={'code-slash'}
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
                    Technologies
                  </Text>
                </View>
                <View
                  style={[styles.container, {marginHorizontal: Width * 0.07}]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    Following technologies will be used for the development of{' '}
                    {FYPData.name}
                  </Text>
                </View>

                {FYPData.technologies.map((tech, index) => (
                  <View
                    style={[
                      styles.techRowsContainer,
                      {
                        marginVertical:
                          index === FYPData.category.length - 1 ? 15 : 0,
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
                          style={[
                            styles.techPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {tech}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* learning outcomes  */}
              <View
                style={[
                  styles.center,
                  styles.card,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <View style={[styles.center, styles.cardIconContainer]}>
                  <MaterialCommunityIcons
                    name={'book-open'}
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
                    Learning Outcomes
                  </Text>
                </View>
                <View
                  style={[styles.container, {marginHorizontal: Width * 0.07}]}>
                  <Text
                    style={[
                      {fontSize: Sizes.normal * 0.65, color: theme.TEXT_COLOR},
                    ]}>
                    {FYPData.name} will help you learn following skills
                  </Text>
                </View>

                {FYPData.outcomes.map((learn, index) => (
                  <View
                    style={[
                      styles.techRowsContainer,
                      {
                        marginVertical:
                          index === FYPData.category.length - 1 ? 15 : 0,
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
                          style={[
                            styles.techPointsText,
                            {color: theme.TEXT_COLOR},
                          ]}>
                          {learn}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {screen === 'student' && (
            <CustomButton
              text={'Apply Now'}
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

export default ViewFYP;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
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
  categoryRowsContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  categoryPointsText: {
    fontSize: Sizes.normal * 0.8,
    fontWeight: 'bold',
    lineHeight: 20,
    flexShrink: 1,
  },
  techRowsContainer: {
    marginHorizontal: Width * 0.065,
    marginTop: 10,
    flexDirection: 'row',
  },
  techPointsText: {
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
