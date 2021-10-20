import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import {PROFILE_IMAGE, GREY_IMAGE} from '../Constants/sample';
import {Height, Sizes, Width} from '../Constants/Size';
import PopUpMenu from '../Menu/WorkshopCardPopUpMenu';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from './Divider';
type props = {
  navigation: any;
  workshopDetail: any;
};

const MAX_TEXT_LENGTH = 250;

const WorkshopCard: FC<props> = ({navigation, workshopDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [WokrshopPosterLoading, setWokrshopPosterLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [{theme}, dispatch] = useStateValue();

  const handleBookmark = () => {
    console.log('Handling workshop bookmark');
  };

  const handleReport = () => {
    console.log('Handling workshop report');
  };

  const handleShare = () => {
    Axios({
      method: 'post',
      url: `${BASE_URL}/api/workshop/share/create/`,
      data: {
        workshop: workshopDetail.id,
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
                  workshopDetail.organization.user.profile_image.path,
            }}
            onLoadEnd={() => setProfileImageLoading(false)}
            style={styles.userImage}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.username, {color: theme.TEXT_COLOR}]}>
            {workshopDetail.organization.name}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {new Date(workshopDetail.created_at).toDateString()}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            navigation={navigation}
            handleBookmark={handleBookmark}
            handleReport={handleReport}
            handleShare={handleShare}
          />
        </View>
      </View>
      <Divider width={Width * 0.92} />

      {/* content  */}
      <View style={styles.contentContainer}>
        {/* title  */}
        <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
          {workshopDetail.title}
        </Text>
        {/* description  */}
        {workshopDetail.description.length > MAX_TEXT_LENGTH ? (
          <Text>
            <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
              {workshopDetail.description.substring(0, MAX_TEXT_LENGTH - 4)}
            </Text>
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('View_Hackathon', {
                  ID: workshopDetail.id,
                })
              }>
              <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
                ... {'  '}read more
              </Text>
            </TouchableWithoutFeedback>
          </Text>
        ) : (
          <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
            {workshopDetail.description}
          </Text>
        )}
      </View>
      {/* workshop poster  */}
      <View style={styles.thumbnailContainer}>
        <Image
          source={{
            uri: WokrshopPosterLoading
              ? GREY_IMAGE
              : BASE_URL + workshopDetail.poster,
          }}
          onLoadEnd={() => {
            Image.getSize(BASE_URL + workshopDetail.poster, (width, heigth) => {
              // calculate aspect ratio of image
              setImageAspectRatio(heigth / width);
              setWokrshopPosterLoading(false);
            });
          }}
          style={{
            width: Width * 0.92,
            height: Width * ImageAspectRatio * 0.9,
          }}
          resizeMode={'contain'}
        />
      </View>
      {/* apply now button  */}
      <View style={styles.applyButtonContainer}>
        <TouchableOpacity
          onPress={() => console.log('Trying to apply in workshop')}
          style={[
            styles.applyButton,
            {backgroundColor: theme.BUTTON_BACKGROUND_COLOR},
          ]}>
          <Text style={[styles.applyButtonText, {color: theme.TEXT_COLOR}]}>
            View Details{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WorkshopCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
    borderRadius: 10,
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
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 0.7,
    flexDirection: 'column',
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
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
    fontSize: Sizes.normal * 1.5,
    fontFamily: 'Raleway-Light',
  },
  descriptionText: {
    fontSize: Sizes.normal,
    lineHeight: 24,
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
  applyButtonContainer: {
    padding: 10,
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
