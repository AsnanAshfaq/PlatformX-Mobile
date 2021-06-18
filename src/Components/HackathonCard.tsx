import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {PROFILE_IMAGE,} from '../Constants/sample';
import {PROFILE_IMAGE, GREY_IMAGE} from '../Constants/sample';
import {BASE_URL} from 'react-native-dotenv';

const ICON_SIZE = Width * 0.07;

type Props = {
  name: string;
  label: string | number;
};

const HackathonCardIcons: FC<Props> = ({name, label}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Ionicons
        name={name}
        size={ICON_SIZE}
        color={darkColors.TAB_BAR_ACTIVE_COLOR}
      />
      <Text style={styles.iconText}>{label}</Text>
    </View>
  );
};

type props = {
  hackathonDetail: any;
};

const MAX_TEXT_LENGTH = 250;

const HackathonCard: FC<props> = ({hackathonDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [HackathonImageLoading, setHackathonImageLoading] = useState(true);

  return (
    <View style={styles.parent}>
      {/* header  */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: ProfileImageLoading
                ? PROFILE_IMAGE
                : BASE_URL +
                  hackathonDetail.organization.user.user_profile_image.path,
            }}
            onLoadEnd={() => setProfileImageLoading(false)}
            style={styles.userImage}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>
            {hackathonDetail.organization.name}
          </Text>
          <Text style={styles.date}>
            {new Date(hackathonDetail.created_at).toDateString()}
          </Text>
        </View>
        <View style={styles.headerIconContainer}>
          <TouchableOpacity
            onPress={() => console.log('Clicked on post option icon')}>
            <Ionicons
              name={'ellipsis-vertical'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        {/* title  */}
        <Text style={styles.titleText}>{hackathonDetail.title}</Text>
        <Text style={styles.descriptionText}>
          {hackathonDetail.description.length > MAX_TEXT_LENGTH
            ? hackathonDetail.description.substring(0, MAX_TEXT_LENGTH - 4) +
              '.... read more'
            : hackathonDetail.description}
        </Text>
      </View>
      {/* hackathon image  */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{
            uri: HackathonImageLoading
              ? GREY_IMAGE
              : BASE_URL + hackathonDetail.thumbnail_image,
          }}
          onLoadEnd={() => setHackathonImageLoading(false)}
          style={styles.thumbnail}
          resizeMode={'cover'}
        />
      </View>
      {/* hackathon details  */}
      <View style={styles.iconsRowConatiner}>
        <View style={styles.iconsRow}>
          <HackathonCardIcons name={'globe-outline'} label={'Online'} />
          <HackathonCardIcons
            name={'people-sharp'}
            label={`${12} Participants`}
          />
        </View>
        <View style={styles.iconsRow}>
          <HackathonCardIcons name={'time-outline'} label={'20 Days left'} />
          <HackathonCardIcons name={'cash-outline'} label={1500} />
        </View>
      </View>
      {/* apply now button  */}
      <View style={styles.hackathonButtonContainer}>
        <TouchableOpacity
          onPress={() => console.log('Pressed on share button')}
          style={styles.hackathonButton}>
          <Text style={styles.hackathonButtonText}>Apply </Text>
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
    shadowColor: darkColors.SHADOW_COLOR,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    borderBottomColor: darkColors.SHADOW_COLOR,
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
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.75,
  },
  contentContainer: {
    // minHeight: Height * 0.15,
    // maxHeight: Height * 0.2,
    paddingHorizontal: 5,
    marginVertical: 7,
  },
  titleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.7,
    fontFamily: 'Raleway-Light',
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  thumbnailContainer: {
    width: Width * 0.9,
    minHeight: Height * 0.25,
    maxHeight: Height * 0.3,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
    // marginRight: 20,
  },
  thumbnail: {
    width: Width * 0.865,
    height: Height * 0.25,
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
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    paddingHorizontal: 5,
  },
  hackathonButtonContainer: {
    // minHeight: Height * 0.05,
    // maxHeight: Height * 0.07,
    flexDirection: 'row',
    marginTop: Height * 0.02,
    justifyContent: 'flex-end',
  },
  hackathonButton: {
    // flex: 1,
    padding: 9,
    width: Width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.SHADOW_COLOR,
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  hackathonButtonText: {
    fontSize: Sizes.small,
    color: darkColors.TEXT_COLOR,
  },
});
