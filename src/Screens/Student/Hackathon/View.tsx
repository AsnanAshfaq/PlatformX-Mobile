import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import axios from '../../../Utils/Axios';
import CustomHeader from '../../../Components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  GREY_IMAGE,
  BACKGROUND_IMAGE,
  PROFILE_IMAGE,
} from '../../../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import HackathonCardSkeleton from '../../../Skeleton/HackathonCardSkeleton';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {commaSeperator} from '../../../Utils/Numbers';
import {useStateValue} from '../../../Store/StateProvider';

const ICON_SIZE = Width * 0.07;

const Divider: FC<{size: 'large' | 'medium' | 'small'}> = ({size}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={{
        width:
          size === 'large'
            ? Width * 0.8
            : size === 'medium'
            ? Width * 0.6
            : size === 'small'
            ? Width * 0.45
            : 0,
        height: 1.5,
        marginHorizontal:
          size === 'large'
            ? Width * 0.04
            : size === 'medium'
            ? Width * 0.14
            : size === 'small'
            ? Width * 0.22
            : 0,
        marginVertical: 10,
        backgroundColor: theme.TEXT_COLOR,
      }}
    />
  );
};

const Bullet: FC = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.bulletView,
        {
          backgroundColor: theme.TEXT_COLOR,
        },
      ]}
    />
  );
};

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
};

const ViewHackathon: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  const [HackathonData, setHackathonData] = useState<any>({});
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [Loading, setLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();

  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setHackathonData(result.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response.data) {
          ToastAndroid.show(error.data.response.error, 1500);
        }
      });
  }, [ID]);

  if (!Loading) {
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
          chat
          bell
        />
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
              resizeMode={'cover'}
            />
          </View>

          {/* card  */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.BACKGROUND_COLOR,
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
                    color: theme.TEXT_COLOR,
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
                <MaterialCommunityIcons
                  name={'email'}
                  color={theme.TAB_BAR_ACTIVE_COLOR}
                  size={ICON_SIZE * 1.1}
                />
                <Text
                  style={{
                    color: theme.TEXT_COLOR,
                    fontSize: Sizes.normal,
                    marginHorizontal: Width * 0.02,
                  }}>
                  18asnan@gmail.com
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
                  color={theme.TAB_BAR_ACTIVE_COLOR}
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
                <View style={styles.themeTagTextContainer}>
                  <Bullet />
                  <Text
                    style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                    Online
                  </Text>
                </View>
                <View style={styles.themeTagTextContainer}>
                  <Bullet />
                  <Text
                    style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                    React Native Development
                  </Text>
                </View>
                <View style={styles.themeTagTextContainer}>
                  <Bullet />
                  <Text
                    style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                    Public
                  </Text>
                </View>
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
              <PrizeCard />
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
            <Divider size={'small'} />
            <View style={styles.container}>
              <Text
                style={[
                  styles.label,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                Sponsors
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* join now  */}
        <View style={styles.joinNowButtonContainer}>
          <TouchableOpacity
            style={[
              styles.joinNowButton,
              {
                backgroundColor: theme.GREEN_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('Register_Hackathon', {
                ID: ID, // pass the hackathon data,
                backgroundImage: HackathonData?.background_image,
                title: HackathonData.title,
                tagline: HackathonData.tag_line,
              })
            }>
            <Text
              style={[
                styles.joinNowText,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              Join Now{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <HackathonCardSkeleton showSearchSkeleton={false} />;
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
    borderWidth: 1,
    borderRadius: 20,
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
    fontSize: Sizes.normal * 1.4,
    fontFamily: 'OpenSans-Bold',
  },
  tagLineText: {
    fontSize: Sizes.normal * 1.15,
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
  bulletView: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    marginTop: 5,
    marginRight: 10,
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
    fontSize: Sizes.normal * 1.3,
    fontWeight: 'bold',
  },
  prizeMoneyText: {
    fontSize: Sizes.normal,
  },
  label: {
    fontSize: Sizes.large * 1.1,
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
  joinNowButtonContainer: {
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  joinNowButton: {
    width: Width * 0.9,
    // marginHorizontal: Width * 0.05,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  joinNowText: {
    fontSize: Sizes.large,
  },
});
