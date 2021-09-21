import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
// import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {PROFILE_IMAGE,} from '../Constants/sample';
import PopUpMenu from '../Menu/HackathonCardPopUpMenu';
import {PROFILE_IMAGE, GREY_IMAGE} from '../Constants/sample';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {commaSeperator} from '../Utils/Numbers';
import {useStateValue} from '../Store/StateProvider';

const ICON_SIZE = Width * 0.07;

type Props = {
  name: string;
  label: string | number;
};

const HackathonCardIcons: FC<Props> = ({name, label}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Ionicons
        name={name}
        size={ICON_SIZE}
        color={theme.TAB_BAR_ACTIVE_COLOR}
      />
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
  );
};

type props = {
  navigation: any;
  hackathonDetail: any;
};

const MAX_TEXT_LENGTH = 250;

const HackathonCard: FC<props> = ({navigation, hackathonDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [HackathonImageLoading, setHackathonImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.parent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.LIGHT_BACKGROUND,
        },
      ]}>
      {/* header  */}
      <View
        style={[
          styles.headerContainer,
          {borderBottomColor: theme.SHADOW_COLOR},
        ]}>
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
            {new Date(hackathonDetail.created_at).toDateString()}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu navigation={navigation} />
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        {/* title  */}
        <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
          {hackathonDetail.title}
        </Text>
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
          <HackathonCardIcons name={'time-outline'} label={'20 Days left'} />
          <HackathonCardIcons
            name={'cash-outline'}
            label={commaSeperator(hackathonDetail.total_prize)}
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
          style={[styles.applyButton, {backgroundColor: theme.SHADOW_COLOR}]}>
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
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
    borderRadius: 20,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    borderBottomWidth: 2,
    flexDirection: 'row',
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
    // minHeight: Height * 0.15,
    // maxHeight: Height * 0.2,
    paddingHorizontal: 5,
    marginVertical: 7,
  },
  titleText: {
    fontSize: Sizes.normal * 1.7,
    fontFamily: 'Raleway-Light',
  },
  descriptionText: {
    fontSize: Sizes.normal,
  },
  thumbnailContainer: {
    // width: Width * 0.9,
    // minHeight: Height * 0.25,
    // maxHeight: Height * 0.3,
    // // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
    // backgroundColor: 'red',
    // marginRight: 20,
    // marginRight: 20,
    marginHorizontal: 0,
  },
  thumbnail: {
    // width: Width * 0.865,
    // height: Height * 0.25,
  },
  iconsRowConatiner: {
    // height: Height * 0.09,
    paddingHorizontal: 5,
    marginTop: Height * 0.02,
  },
  iconsRow: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  iconText: {
    fontSize: Sizes.normal,
    paddingHorizontal: 5,
  },
  applyButtonContainer: {
    // minHeight: Height * 0.05,
    // maxHeight: Height * 0.07,
    flexDirection: 'row',
    marginTop: Height * 0.02,
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
