import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ToastAndroid,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PopUpMenu from '../Menu/StudentHackathonCardPopUpMenu';
import {PROFILE_IMAGE, GREY_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from '../Components/Divider';
import {Cash} from './Icons';
const ICON_SIZE = Width * 0.07;

type Props = {
  name: string;
  label: string | number;
  cash?: boolean;
};
const HackathonCardIcons: FC<Props> = ({name, label, cash}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={ICON_SIZE} color={theme.GREEN_COLOR} />
      ) : (
        <Ionicons name={name} size={ICON_SIZE} color={theme.GREEN_COLOR} />
      )}
      <View style={styles.iconTextContainer}>
        <Text
          style={[
            styles.iconText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  hackathonDetail: any;
};

const MAX_TEXT_LENGTH = 140;

const HackathonCard: FC<props> = ({navigation, hackathonDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [HackathonImageLoading, setHackathonImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [{theme}, dispatch] = useStateValue();

  const handleShare = () => {
    Axios({
      method: 'post',
      url: `${BASE_URL}/api/hackathon/share/create/`,
      data: {
        hackathon: hackathonDetail.id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        if (result.status === 201) {
          ToastAndroid.show(result.data.success, 1500);
        } else {
          ToastAndroid.show(result.data.error, 1500);
        }
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return Promise.reject();
      });
  };

  const handleFollow = () => {
    console.log('Handling hackathon follow ');
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
      <View style={[styles.headerContainer]}>
        {/* user image  */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: ProfileImageLoading
                ? PROFILE_IMAGE
                : BASE_URL +
                  hackathonDetail.organization.user.profile_image.path,
            }}
            onLoadEnd={() => setProfileImageLoading(false)}
            style={styles.userImage}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text
            style={[
              styles.username,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {hackathonDetail.organization.name}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {new Date(hackathonDetail.created_at).toDateString() ===
            new Date(hackathonDetail.updated_at).toDateString()
              ? `${new Date(hackathonDetail.created_at).toDateString()}`
              : `Updated at ${new Date(
                  hackathonDetail.updated_at,
                ).toDateString()}`}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            navigation={navigation}
            handleFollow={handleFollow}
            handleShare={handleShare}
          />
        </View>
      </View>
      <Divider width={Width * 0.92} />

      {/* content  */}
      <View style={styles.contentContainer}>
        {/* title  */}
        <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
          {hackathonDetail.title}
        </Text>
        <View style={styles.tagLineContainer}>
          <Text
            style={[
              styles.tagLineText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {hackathonDetail.tag_line}
          </Text>
        </View>
        {/* description  */}
        {hackathonDetail.description.length > MAX_TEXT_LENGTH ? (
          <Text>
            <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
              {hackathonDetail.description.substring(0, MAX_TEXT_LENGTH - 4)}
            </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('View_Hackathon', {
                  ID: hackathonDetail.id,
                })
              }>
              <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                ... {'  '}read more
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        ) : (
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {hackathonDetail.description}
          </Text>
        )}
      </View>
      {/* hackathon image  */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{
            uri: HackathonImageLoading
              ? GREY_IMAGE
              : BASE_URL + hackathonDetail.thumbnail_image,
          }}
          onLoadEnd={() => {
            Image.getSize(
              BASE_URL + hackathonDetail.thumbnail_image,
              (width, heigth) => {
                // calculate aspect ratio of image
                setImageAspectRatio(heigth / width);
                setHackathonImageLoading(false);
              },
            );
          }}
          style={{
            width: Width * 0.87,
            height: Width * ImageAspectRatio * 0.9,
          }}
          resizeMode={'contain'}
        />
      </View>
      {/* hackathon details (Cash Prize - Participants - Date)  */}
      <View style={styles.iconsRowConatiner}>
        <View style={styles.iconsRow}>
          <HackathonCardIcons name={'globe-outline'} label={'Online'} />
          <HackathonCardIcons
            name={'people-sharp'}
            label={`${hackathonDetail.participants} Participants`}
          />
        </View>
        <View style={styles.iconsRow}>
          <HackathonCardIcons
            name={'time-outline'}
            label={`${hackathonDetail.days_left}${' '}${
              hackathonDetail.days_left !== 1 ? 'days' : 'day'
            } left `}
          />
          <HackathonCardIcons
            name={'cash-outline'}
            label={commaSeperator(hackathonDetail.total_prize)}
            cash
          />
        </View>
      </View>
      {/* apply now button  */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('View_Hackathon', {
              ID: hackathonDetail.id,
            })
          }
          style={[
            styles.applyButton,
            {backgroundColor: theme.BUTTON_BACKGROUND_COLOR},
          ]}>
          <Text
            style={[
              styles.applyButtonText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            View Details{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HackathonCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    // marginVertical: Width * 0.01,
    marginVertical: Width * 0.03,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
    borderRadius: 10,
    // padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  username: {
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
  },
  contentContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: Sizes.normal * 1.2,
    fontFamily: 'OpenSans-Bold',
  },
  tagLineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  tagLineText: {
    fontSize: Sizes.normal * 1.2,
    fontFamily: 'Segoe-UI-Italic',
  },
  descriptionText: {
    fontSize: Sizes.normal,
    fontFamily: 'Segoe-UI',
  },
  thumbnailContainer: {
    marginHorizontal: 0,
  },
  thumbnail: {
    // width: Width * 0.865,
    // height: Height * 0.25,
  },
  iconsRowConatiner: {
    // height: Height * 0.09,
    paddingHorizontal: 10,
    marginTop: Height * 0.02,
  },
  iconsRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  iconTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  iconText: {
    fontSize: Sizes.normal,
    paddingHorizontal: 5,
  },
  applyButtonContainer: {
    // minHeight: Height * 0.05,
    // maxHeight: Height * 0.07,
    flexDirection: 'row',
    padding: 10,
    marginTop: Height * 0.015,
    justifyContent: 'flex-end',
  },
  applyButton: {
    // flex: 1,
    padding: 9,
    width: Width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  applyButtonText: {
    fontSize: Sizes.small,
  },
});
