import React, {FC} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  thumbnail_image: string;
  user_name: string;
  user_image: string;
  date: Date;
  description: string;
  prize: number;
  event_type: string;
  participants: number;
};

const MAX_TEXT_LENGTH = 250;

const HackathonCard: FC<props> = ({
  date,
  description,
  event_type,
  participants,
  prize,
  thumbnail_image,
  user_image,
  user_name,
}) => {
  return (
    <View style={styles.parent}>
      {/* header  */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image source={{uri: user_image}} style={styles.userImage} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>{user_name}</Text>
          <Text style={styles.date}>{date.toUTCString().substring(0, 17)}</Text>
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          {description.length > MAX_TEXT_LENGTH
            ? description.substring(0, MAX_TEXT_LENGTH - 4) + '.... read more'
            : description}
        </Text>
      </View>
      {/* hackathon image  */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{uri: thumbnail_image}}
          style={styles.thumbnail}
          resizeMode={'center'}
        />
      </View>
      {/* hackathon details  */}
      <View style={styles.iconsRowConatiner}>
        <View style={styles.iconsRow}>
          <HackathonCardIcons name={'globe-outline'} label={event_type} />
          <HackathonCardIcons
            name={'people-sharp'}
            label={`${participants} Participants`}
          />
        </View>
        <View style={styles.iconsRow}>
          <HackathonCardIcons name={'time-outline'} label={'20 Days left'} />
          <HackathonCardIcons name={'cash-outline'} label={prize} />
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
    maxHeight: Height * 0.8,
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
    flex: 2,
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 8,
    flexDirection: 'column',
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
    maxHeight: Height * 0.2,
    paddingHorizontal: 5,
    marginVertical: 7,
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  thumbnailContainer: {
    width: Width * 0.9,
    minHeight: Height * 0.15,
    maxHeight: Height * 0.2,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: Width * 0.7,
    height: Height * 0.2,
  },
  iconsRowConatiner: {
    height: Height * 0.09,
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
    minHeight: Height * 0.05,
    maxHeight: Height * 0.07,
    flexDirection: 'row',
    marginTop: Height * 0.02,
    justifyContent: 'flex-end',
  },
  hackathonButton: {
    // flex: 1,
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
