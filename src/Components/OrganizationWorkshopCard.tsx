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

const ICON_SIZE = Width * 0.07;

type props = {
  navigation: any;
  workshopDetail: any;
};

const OrganizationWorkshopCard: FC<props> = ({navigation, workshopDetail}) => {
  const [LogoImageLoading, setLogoImageLoading] = useState(true); // logo image
  const [{theme}, dispatch] = useStateValue();

  const handleDelete = () => {
    console.log('Handling workshop delete');
  };

  const handleEdit = () => {
    console.log('Handling hackathon edit option');
  };

  console.log('Workshop details are');

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
          {/* <Image
            source={{
              uri: LogoImageLoading
                ? GREY_IMAGE
                : BASE_URL + hackathonDetail.logo_image,
            }}
            onLoadEnd={() => setLogoImageLoading(false)}
            style={styles.logoImage}
          /> */}
        </View>
        <View style={styles.headerTextContainer}>
          {/* title  */}
          <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
            {/* {hackathonDetail.title} */}
          </Text>
          <Text style={[styles.tagLineText, {color: theme.DIM_TEXT_COLOR}]}>
            {/* {hackathonDetail.tag_line} */}
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

      {/* uploaded at container  */}

      {/* apply now button  */}
      <View style={styles.bottomContainer}>
        <View style={styles.uploadDateContainer}>
          <Text style={[styles.date, {color: theme.DIM_TEXT_COLOR}]}>
            Uploaded at {new Date().toDateString()}
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('View_Hackathon', {
                ID: workshopDetail.id,
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

export default OrganizationWorkshopCard;

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.8,
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
    // minHeight: Height * 0.15,
    // maxHeight: Height * 0.2,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  titleText: {
    fontSize: Sizes.normal * 1.3,
    fontFamily: 'Raleway-Light',
  },
  tagLineText: {
    fontSize: Sizes.normal,
    fontStyle: 'italic',
    lineHeight: 24,
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
    fontSize: Sizes.normal,
    marginHorizontal: 10,
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