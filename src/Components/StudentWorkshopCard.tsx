import React, {FC, useState, useEffect, Children} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';

// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {useStateValue} from '../Store/StateProvider';
import Axios from '../Utils/Axios';
import Divider from './Divider';
import {Cash, ForwardArrow} from './Icons';
import {commaSeperator} from '../Utils/Numbers';
import CustomButton from './CustomButton';
type props = {
  navigation: any;
  workshopDetail: any;
};

type cardProps = {
  name: string;
  label: string | number;
  cash?: boolean;
};
const ICON_SIZE = Width * 0.07;

const WorkshopCardIcons: FC<cardProps> = ({name, label, cash}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cash ? (
        <Cash size={1} color={theme.GREEN_COLOR} />
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
                : workshopDetail.organization.user.profile_image
                ? BASE_URL + workshopDetail.organization.user.profile_image.path
                : PROFILE_IMAGE,
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
            {workshopDetail.organization.name}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {new Date(workshopDetail.created_at).toDateString() ===
            new Date(workshopDetail.updated_at).toDateString()
              ? `${new Date(workshopDetail.created_at).toDateString()}`
              : `Updated at ${new Date(
                  workshopDetail.updated_at,
                ).toDateString()}`}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            navigation={navigation}
            handleShare={handleShare}
            handleBookmark={handleBookmark}
            handleReport={handleReport}
          />
        </View>
      </View>
      <Divider width={Width * 0.92} />

      {/* content  */}
      <View style={[styles.topicContainer, styles.center]}>
        {/* title  */}
        <Text style={[styles.topicText, {color: theme.TEXT_COLOR}]}>
          {workshopDetail.topic}
        </Text>
      </View>
      {/* workshop poster  */}
      <View style={[styles.posterContainer, styles.center]}>
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
            width: Width * 0.78,
            height: Width * ImageAspectRatio * 0.78,
            borderRadius: 20,
          }}
          resizeMode={'contain'} //contain
        />
      </View>
      {/* if workshop is paid */}
      <View style={{marginTop: 10}}>
        {workshopDetail.is_paid && (
          <View style={styles.iconContainer}>
            <WorkshopCardIcons
              cash
              name={'cash-outline'}
              label={`Rs ${commaSeperator(workshopDetail.charges)}`}
            />
          </View>
        )}

        <View style={styles.iconContainer}>
          <WorkshopCardIcons
            name={'time-outline'}
            label={`${workshopDetail.days_left}${' '}${
              workshopDetail.days_left !== 1 ? 'days' : 'day'
            } left `}
          />
        </View>
        <View style={{marginTop: 5, marginHorizontal: Width * 0.04}}>
          <WorkshopCardIcons name={'people-sharp'} label={'0 Participants'} />
        </View>
      </View>
      {/* apply now button  */}
      <View style={styles.detailsButtonContainer}>
        <CustomButton
          children={
            <View style={styles.buttonIconContainer}>
              <ForwardArrow size={0.75} />
            </View>
          }
          text={'Details'}
          textSize={Sizes.normal * 0.9}
          onPress={() => {
            console.log('Viewing details');
          }}
          width={Width * 0.3}
          height={Height * 0.055}
        />
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
  topicContainer: {
    marginBottom: 10,
  },
  topicText: {
    fontSize: Sizes.normal * 1.2,
    fontFamily: 'OpenSans-Bold',
  },
  descriptionText: {
    fontSize: Sizes.normal,
    lineHeight: 24,
  },
  posterContainer: {
    marginHorizontal: 0,
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
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
  detailsButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 2,
    alignItems: 'center',
  },
});
