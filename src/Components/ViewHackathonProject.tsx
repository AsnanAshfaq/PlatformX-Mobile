import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  ToastAndroid,
} from 'react-native';
import axios from '../Utils/Axios';
import CustomHeader from './CustomHeader';
import Divider from './Divider';

import {GREY_IMAGE, BACKGROUND_IMAGE, PROFILE_IMAGE} from '../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import ListSkeleton from '../Skeleton/ListSkeleton';
import {Height, Sizes, Width} from '../Constants/Size';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CodeStyleSkeleton from '../Skeleton/CodeStyleSkeleton';

const ICON_SIZE = Width * 0.07;

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

const sampleText =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo nemo unde qui, totam a facilis rerum veniam in natus earum tempora odio dolorem voluptate placeat perspiciatis. Alias debitis quibusdam dolores!';

type props = {
  navigation: any;
  route: any;
  screen: 'student' | 'organization';
  ID: any;
};

const LinkText: FC<{link}> = ({link}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <Text
      onPress={() => {
        Linking.openURL(link);
      }}
      style={[
        styles.linkText,
        {
          color: theme.ERROR_TEXT_COLOR,
        },
      ]}>
      {link}
    </Text>
  );
};

const ViewHackathonProject: FC<props> = ({navigation, route, screen, ID}) => {
  // get hackathon project id from params

  const [projectData, setProjectData] = useState<any>({});
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [LoadLogoImage, setLoadLogoImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [{theme}, dispatch] = useStateValue();

  // useEffect(() => {
  //   // fetch hackathon data
  //   axios
  //     .get(`/api/hackathon/${ID}`)
  //     .then(result => {
  //       setHackathonData(result.data);
  //       setLoading(false);
  //     })
  //     .catch(error => console.log(error));
  // }, [ID]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Project Description'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading ? (
        <>
          <ScrollView removeClippedSubviews>
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
                  My First Project
                </Text>
                <Text
                  style={[
                    styles.tagLineText,
                    {
                      color: theme.DIM_TEXT_COLOR,
                    },
                  ]}>
                  A project to showcase my skills
                </Text>
              </View>

              {/* image container  */}
              <View style={styles.center}>
                <Image
                  source={{
                    uri: LoadLogoImage
                      ? GREY_IMAGE
                      : 'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
                  }}
                  style={[styles.image]}
                  onLoadEnd={() => {
                    setLoadLogoImage(false);
                  }}
                  onError={() => {
                    setLoadLogoImage(false);
                  }}
                />
              </View>
              <Divider size={'large'} />

              {/* developed by container  */}
              {screen === 'organization' && (
                <>
                  <View style={styles.container}>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      Developed By
                    </Text>
                    <View style={styles.developedContainer}>
                      <View
                        style={[
                          styles.center,
                          {
                            flex: 0.3,
                          },
                        ]}>
                        <Image
                          source={{
                            uri:
                              'https://avatars.githubusercontent.com/u/65377376?s=400&u=812ba5bc16639e502e22fa141f284c0914e1fa80&v=4',
                          }}
                          style={[styles.userImage]}
                        />
                      </View>
                      <View style={{flex: 0.7}}>
                        <Text
                          style={[
                            styles.userNameText,
                            {
                              color: theme.TEXT_COLOR,
                            },
                          ]}>
                          Muhammad Asnan
                        </Text>
                        <Text
                          style={[
                            styles.userEmailText,
                            {
                              color: theme.TEXT_COLOR,
                            },
                          ]}>
                          18asnan@gmail.com
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Divider size={'large'} />
                </>
              )}

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
                    {sampleText}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />
              {/* about project  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  About the Project
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
                    {sampleText}
                  </Text>
                </View>
              </View>
              <Divider size={'small'} />

              {/* built with tags   */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Built with
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  <View style={styles.bulletTextContainer}>
                    <Bullet />
                    <Text
                      style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                      React
                    </Text>
                  </View>
                  <View style={styles.bulletTextContainer}>
                    <Bullet />
                    <Text
                      style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                      React Native
                    </Text>
                  </View>
                  <View style={styles.bulletTextContainer}>
                    <Bullet />
                    <Text
                      style={{color: theme.TEXT_COLOR, fontSize: Sizes.normal}}>
                      Django
                    </Text>
                  </View>
                </View>
              </View>
              <Divider size={'small'} />

              {/* give it a go links  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Give it a go links
                </Text>
                <View style={{marginLeft: Width * 0.1, marginTop: 10}}>
                  <View style={[styles.bulletTextContainer]}>
                    <Bullet />
                    <LinkText
                      link={
                        'https://www.youtube.com/watch?v=pvUKlOqF8BM&ab_channel=HonestHourPodcast'
                      }
                    />
                  </View>
                  <View style={styles.bulletTextContainer}>
                    <Bullet />
                    <LinkText
                      link={
                        'https://www.youtube.com/watch?v=pvUKlOqF8BM&ab_channel=HonestHourPodcast'
                      }
                    />
                  </View>
                </View>
              </View>
              {/* video demo link */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Video Demo Link
                </Text>
                <View style={{marginLeft: Width * 0.12, marginTop: 10}}>
                  <View style={styles.bulletTextContainer}>
                    <Bullet />
                    <LinkText
                      link={
                        'https://www.youtube.com/watch?v=pvUKlOqF8BM&ab_channel=HonestHourPodcast'
                      }
                    />
                  </View>
                </View>
              </View>
              <Divider size={'small'} />

              {/* project media  */}
              <View style={styles.container}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: theme.TEXT_COLOR,
                    },
                  ]}>
                  Project Media
                </Text>
                <View
                  style={{
                    marginLeft: Width * 0.1,
                    marginTop: 10,
                  }}>
                  <View
                    style={[
                      styles.mediaContainer,
                      {
                        backgroundColor: theme.GREEN_COLOR,
                      },
                    ]}>
                    <Text style={{color: theme.TEXT_COLOR}}>Files</Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          {screen === 'organization' && (
            <CustomButton
              text={'Evaluate'}
              onPress={() => {
                navigation.navigate('Hackathon_Evaluate', {
                  ID: ID, // pass the hackathon data,
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

export default ViewHackathonProject;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  backgroundImageContainer: {
    // flex: 1,
  },
  card: {
    // marginTop: -45,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
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
    fontStyle: 'italic',
  },
  image: {
    width: Width * 0.25,
    height: Width * 0.25,
    borderRadius: 10,
    marginVertical: 10,
  },
  developedContainer: {
    marginLeft: Width * 0.04,
    marginTop: 10,
    flexDirection: 'row',
  },
  userImage: {
    width: Width * 0.15,
    height: Width * 0.15,
    borderRadius: 40,
    // marginVertical: 10,
  },
  userNameText: {
    fontSize: Sizes.normal * 1.1,
    fontWeight: 'bold',
    paddingVertical: 2,
  },
  userEmailText: {
    fontSize: Sizes.normal * 0.8,
    fontStyle: 'italic',
  },
  container: {
    marginHorizontal: Width * 0.03,
    marginVertical: 10,
  },
  mediaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    borderRadius: 10,
    padding: 6,
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
  bulletTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 2,
  },

  label: {
    fontSize: Sizes.normal * 1.1,
    // fontFamily: 'Cindyrella',
  },
  linkText: {
    fontSize: Sizes.normal * 0.7,
    flexShrink: 1,
    lineHeight: 16,
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
