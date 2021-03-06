//TODO:
// logo image
// title
// tag_line
// theme_tags
// days_left
// participants
// total_prize
// created_at

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import PopUpMenu from '../Menu/OrganizationHackathonCardPopUpMenu';
import {GREY_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from '../Components/Divider';
import {Cash, Clock, ForwardArrow, People, Tag} from './Icons';

type props = {
  navigation: any;
  hackathonDetail: any;
};

const HackathonCard: FC<props> = ({navigation, hackathonDetail}) => {
  const [LogoImageLoading, setLogoImageLoading] = useState(true); // logo image
  const [{theme}, dispatch] = useStateValue();

  const handleDelete = () => {
    console.log('Handling delete');
    // Axios({
    //   method: 'post',
    //   url: `${BASE_URL}/api/hackathon/share/create/`,
    //   data: {
    //     hackathon: hackathonDetail.id,
    //   },
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(result => {
    //     if (result.status === 201) {
    //       ToastAndroid.show(result.data.success, 1500);
    //     } else {
    //       ToastAndroid.show(result.data.error, 1500);
    //     }
    //   })
    //   .catch(error => {
    //     if (error.response) {
    //       ToastAndroid.show(error.response.data.error, 1500);
    //     }
    //     return Promise.reject();
    //   });
  };

  const handleEdit = () => {
    console.log('Handling hackathon edit option');
  };

  return (
    <View
      style={[
        styles.parent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <View style={styles.headerContainer}>
        {/* logo image  */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: LogoImageLoading
                ? GREY_IMAGE
                : hackathonDetail.logo_image
                ? BASE_URL + hackathonDetail.logo_image
                : GREY_IMAGE,
            }}
            onLoadEnd={() => setLogoImageLoading(false)}
            style={styles.logoImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.headerTextContainer}>
          {/* title  */}
          <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
            {hackathonDetail.title}
          </Text>
          <Text style={[styles.tagLineText, {color: theme.DIM_TEXT_COLOR}]}>
            {hackathonDetail.tag_line}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            navigation={navigation}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </View>
      </View>
      <Divider width={Width * 0.84} marginHorizontal={13} marginVertical={1} />

      {/* icons container  */}
      <View style={styles.iconsContainer}>
        <View style={styles.iconsRow}>
          <Tag size={1} color={theme.GREEN_COLOR} />

          <View style={styles.themeContainer}>
            {hackathonDetail.theme_tags.map((tag: string, index) => {
              if (index < 2) {
                return (
                  <Text
                    style={[
                      styles.iconText,
                      {
                        color: theme.TEXT_COLOR,
                        marginHorizontal: 0,
                      },
                    ]}>
                    {tag.trim()}
                    {hackathonDetail.theme_tags.length > 1 && index !== 1
                      ? ', '
                      : hackathonDetail.theme_tags.length === 2 && index === 1
                      ? '.'
                      : hackathonDetail.theme_tags.length === 1 &&
                        index === 0 &&
                        '.'}
                  </Text>
                );
              }
            })}
            {hackathonDetail.theme_tags.length > 2 && (
              <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                . . .
              </Text>
            )}
          </View>
        </View>
        <View style={styles.iconsRow}>
          <Clock size={1.1} color={theme.GREEN_COLOR} />
          <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
            {' '}
            {hackathonDetail.days_left} days left
          </Text>
        </View>
        <View style={styles.iconsRow}>
          <People size={1} color={theme.GREEN_COLOR} />
          <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
            {'  '}
            {hackathonDetail.participants} Participants
          </Text>
        </View>
        <View style={styles.iconsRow}>
          <Cash size={1} color={theme.GREEN_COLOR} />
          <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
            {'  '}
            {commaSeperator(hackathonDetail.total_prize)}
          </Text>
        </View>
      </View>

      {/* uploaded at container  */}

      {/* apply now button  */}
      <View style={styles.bottomContainer}>
        <View style={styles.uploadDateContainer}>
          <Text style={[styles.date, {color: theme.DIM_TEXT_COLOR}]}>
            Uploaded on {new Date(hackathonDetail.created_at).toDateString()}
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HackahtonScreens', {
                screen: 'HackathonTab',
                params: {
                  screen: 'Overview',
                  params: {
                    ID: hackathonDetail.id,
                  },
                },
              })
            }
            style={[
              styles.viewButtonContainer,
              {
                backgroundColor: theme.BUTTON_BACKGROUND_COLOR,
              },
            ]}>
            <View style={styles.viewButtonTextContainer}>
              <Text
                style={[
                  styles.viewButtonText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                View Details
              </Text>
            </View>
            <View style={styles.viewButtonIconContainer}>
              <ForwardArrow size={0.96} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HackathonCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    borderRadius: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  logoImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    paddingTop: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
    fontStyle: 'italic',
  },
  contentContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
  },
  tagLineText: {
    fontSize: Sizes.normal * 0.8,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  themeContainer: {
    flexDirection: 'row',
    marginHorizontal: 23,
  },
  iconsContainer: {
    paddingVertical: 10,
    marginHorizontal: Width * 0.032,
  },
  iconsRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    marginHorizontal: 11,
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    marginHorizontal: Width * 0.032,
  },
  uploadDateContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  viewButtonContainer: {
    padding: 9,
    flex: 1,
    width: Width * 0.35,
    flexDirection: 'row',
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  viewButtonText: {
    fontSize: Sizes.small,
  },
  viewButtonTextContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonIconContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
