import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import axios from '../Utils/Axios';
import CustomHeader from './CustomHeader';
import Divider from './Divider';

import {GREY_IMAGE, BACKGROUND_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CodeStyleSkeleton from '../Skeleton/CodeStyleSkeleton';
import {Email} from './Icons';
import Bullet from './Bullet';

const ICON_SIZE = Width * 0.07;

const PrizeCard: FC = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.prizeCard,
        {
          borderColor: theme.TEXT_COLOR,
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* title  */}
      <View style={styles.center}>
        <Text style={[styles.prizeTitleText, {color: theme.TEXT_COLOR}]}>
          First Prize
        </Text>
        <AntDesign name={'star'} color={'gold'} size={ICON_SIZE * 1.1} />
        <Text style={[styles.prizeMoneyText, {color: theme.TEXT_COLOR}]}>
          ${commaSeperator(30000)}
        </Text>
      </View>
      <View style={{marginLeft: Width * 0.06, marginTop: 10}}>
        <View style={styles.prizeCardTextContainer}>
          <Bullet />
          <Text
            style={{
              color: theme.TEXT_COLOR,
              fontSize: Sizes.normal,
            }}>
            Overall winner Certificate
          </Text>
        </View>
        <View style={styles.prizeCardTextContainer}>
          <Bullet />
          <Text
            style={{
              color: theme.TEXT_COLOR,
              fontSize: Sizes.normal,
            }}>
            Job Offer
          </Text>
        </View>
        <View style={styles.prizeCardTextContainer}>
          <Bullet />
          <Text
            style={{
              color: theme.TEXT_COLOR,
              fontSize: Sizes.normal,
            }}>
            IPhone 13 Pro Max
          </Text>
        </View>
      </View>
    </View>
  );
};

const JudgeCard: FC = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.judgeCard}>
      {/* image  */}
      <View style={styles.judgeImageContainer}>
        <Image
          source={{
            uri:
              'https://scontent.fisb1-2.fna.fbcdn.net/v/t1.6435-9/95260674_2556673724590700_5847535705068142592_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFiRRsHNV54VEgiUYuRAKbChzk7UcgGVvyHOTtRyAZW_GRbwC3kA0cf6z_pHq1Qd71FS3MNYPDPT8ur3Yx3T_46&_nc_ohc=_5FfqkhyvLUAX_O8itn&_nc_ht=scontent.fisb1-2.fna&oh=16eaafbad2bde501f29168658183a74b&oe=618C6AA4',
          }}
          style={styles.judgeImage}
        />
      </View>
      <View style={[styles.judgeDetailContainer]}>
        <Text
          style={[
            {
              color: theme.TEXT_COLOR,
              fontSize: Sizes.normal * 1.1,
            },
          ]}>
          Asnan Ashfaq
        </Text>
        <Text
          style={[
            {
              color: theme.TEXT_COLOR,
              fontSize: Sizes.small * 1.1,
            },
          ]}>
          CEO at Netsol Technologies
        </Text>
      </View>
    </View>
  );
};

const JudgingCriteria: FC<{title: string; desc: string}> = ({title, desc}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.judgingCriteriaContainer}>
      <Text
        style={[styles.judgingCriteriaTitleText, {color: theme.TEXT_COLOR}]}>
        {title}
      </Text>
      <Text style={[styles.judgingCriteriaDescText, {color: theme.TEXT_COLOR}]}>
        {desc}
      </Text>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
  screen: 'student' | 'organization';
  ID: any;
};
const ViewHackathon: FC<props> = ({navigation, route, screen, ID}) => {
  // get hackathon id from params

  const [HackathonData, setHackathonData] = useState<any>({});
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const {theme} = state;
  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setHackathonData(result.data);
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
        title={'Overview'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && HackathonData ? (
        <>
          <ScrollView removeClippedSubviews>
            {/* background image  */}
            <View style={styles.backgroundImageContainer}>
              <Image
                style={{
                  width: Width,
                  height: Height * 0.3, //Width * ImageAspectRatio * 0.75,
                }}
                source={{
                  uri: BackgroundImageLoading
                    ? BACKGROUND_IMAGE
                    : HackathonData?.background_image
                    ? BASE_URL + HackathonData?.background_image
                    : BACKGROUND_IMAGE,
                }}
                onLoadEnd={() => {
                  setBackgroundImageLoading(false);
                }}
                onError={() => {
                  setBackgroundImageLoading(false);
                  ToastAndroid.show("Couldn't load background image", 1500);
                }}
                resizeMode={'contain'}
              />
            </View>

            {/* card  */}
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  marginHorizontal: Width * 0.05,
                },
              ]}>
              {/* title and tagline container  */}
              <View style={[styles.titleContainer, styles.center]}>
                <Text
                  style={[
                    styles.titleText,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  {HackathonData.title}
                </Text>
                <Text
                  style={[
                    styles.tagLineText,
                    {
                      color: theme.DIM_TEXT_COLOR,
                    },
                  ]}>
                  {HackathonData.tag_line}
                </Text>
              </View>
              <Divider size={'large'} />

              {/* description container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Description
                </Text>
                <View
                  style={{
                    marginLeft: Width * 0.04,
                    marginTop: 10,
                  }}>
                  <Text
                    style={[
                      styles.descriptionText,
                      {
                        color: theme.TEXT_COLOR,
                      },
                    ]}>
                    {HackathonData.description}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />
              {/* contact email  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Contact Email
                </Text>
                <View style={styles.iconTextContainer}>
                  <Email size={1.1} color={theme.GREEN_COLOR} />
                  <Text
                    style={{
                      color: theme.TEXT_COLOR,
                      fontSize: Sizes.normal,
                      marginHorizontal: Width * 0.02,
                    }}>
                    {HackathonData.contact_email
                      ? HackathonData.contact_email
                      : state.email}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />

              {/* starting from container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Starting from
                </Text>
                <View style={styles.iconTextContainer}>
                  <Foundation
                    name={'calendar'}
                    color={theme.GREEN_COLOR}
                    size={ICON_SIZE * 1.3}
                  />
                  <Text
                    style={{
                      color: theme.TEXT_COLOR,
                      fontSize: Sizes.normal,
                      marginHorizontal: Width * 0.04,
                      marginTop: 3,
                    }}>
                    Oct 11, 2021 @ 11:45 PM
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />

              {/* Theme tags container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Theme Tags
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  {HackathonData.theme_tags.map(tag => (
                    <View style={styles.themeTagTextContainer}>
                      <Bullet />
                      <Text
                        style={{
                          color: theme.TEXT_COLOR,
                          fontSize: Sizes.normal,
                        }}>
                        {tag.charAt(0).toUpperCase() +
                          tag.slice(1, tag.length).toLowerCase()}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <Divider size={'small'} />
              {/* rules container  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Rules
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  <View style={styles.ruleTextContainer}>
                    <Bullet />
                    <Text
                      style={[
                        styles.rulesText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      Create an app built on the Daml framework that strives to
                      solve a simple problem in Finance, Insurance, Healthcare,
                      Supply Chain, or a closely related space.
                    </Text>
                  </View>
                  <View style={styles.ruleTextContainer}>
                    <Bullet />
                    <Text
                      style={[
                        styles.rulesText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      Create an app built on the Daml framework that strives to
                      solve a simple problem in Finance, Insurance, Healthcare,
                      Supply Chain, or a closely related space.
                    </Text>
                  </View>
                </View>
              </View>
              <Divider size={'small'} />
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Prizes
                </Text>
                {/* flat list */}
                <View style={{marginVertical: 10}}>
                  <ScrollView horizontal={true}>
                    <PrizeCard />
                    <PrizeCard />
                    <PrizeCard />
                  </ScrollView>
                </View>
              </View>
              <Divider size={'small'} />
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Judges
                </Text>
                <JudgeCard />
                <JudgeCard />
              </View>
              <Divider size={'small'} />
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Judging Criteria
                </Text>
                <JudgingCriteria
                  title={'Potential Impact'}
                  desc={
                    'How will this project impact the growth of the Solana ecosystem?'
                  }
                />
                <JudgingCriteria
                  title={'Design'}
                  desc={
                    'Is the user experience and design of the project well thought out?. will this project impact the growth of the Solana ecosystem?'
                  }
                />
              </View>
            </View>
          </ScrollView>
          {screen === 'student' && (
            <CustomButton
              text={'Join Now'}
              onPress={() => {
                navigation.navigate('Register_Hackathon', {
                  ID: ID, // pass the hackathon data,
                  backgroundImage: HackathonData?.background_image,
                  title: HackathonData.title,
                  tagline: HackathonData.tag_line,
                });
              }}
            />
          )}
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewHackathon;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {
    // flex: 1,
  },
  card: {
    marginTop: -45,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 15,
  },
  titleText: {
    fontSize: Sizes.normal * 1.3,
    fontFamily: 'OpenSans-Bold',
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.9,
    fontFamily: 'OpenSans-Light',
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: Width * 0.04,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal,
    lineHeight: 25,
  },
  prizeCard: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingVertical: 10,
    marginTop: 10,
    marginHorizontal: Width * 0.02,
  },
  prizeCardTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },
  judgeCard: {
    flexDirection: 'row',
    // marginHorizontal: Width * 0.02,
    marginLeft: Width * 0.04,
    marginTop: 18,
  },
  judgeImageContainer: {
    flex: 0.2,
  },
  judgeImage: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  judgeDetailContainer: {
    flex: 0.8,
    marginLeft: 10,
  },
  judgingCriteriaContainer: {
    marginLeft: Width * 0.04,
    marginTop: 10,
  },
  judgingCriteriaTitleText: {
    fontSize: Sizes.normal * 1.1,
    fontWeight: 'bold',
  },
  judgingCriteriaDescText: {
    lineHeight: 22,
    fontSize: Sizes.normal * 0.85,
  },

  themeTagTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },
  prizeDetailContainer: {
    flex: 0.95,
    justifyContent: 'center',
  },
  prizeTitleText: {
    fontSize: Sizes.normal * 1.2,
    fontWeight: 'bold',
  },
  prizeMoneyText: {
    fontSize: Sizes.normal,
  },
  label: {
    fontSize: Sizes.normal * 1.2,
    // fontFamily: 'Cindyrella',
  },
  ruleTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },
  rulesText: {
    fontSize: Sizes.normal,
    lineHeight: 25,
  },
  sponsorURL: {
    fontSize: Sizes.normal,
  },
});
