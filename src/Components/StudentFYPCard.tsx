import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {PROFILE_IMAGE} from '../Constants/sample';
import {Height, Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import {Cash, ForwardArrow} from './Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import PopUpMenu from '../Menu/StudentFYPCardPopUpMenu';
import Divider from './Divider';
type props = {
  navigation: any;
  fypDetail: any;
};

const ICON_SIZE = Width * 0.07;

const StudentFYPCard: FC<props> = ({navigation, fypDetail}) => {
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // org. image
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [{theme}, dispatch] = useStateValue();

  const handleFollow = () => {
    console.log('CLick on follow');
  };

  const handleShare = () => {
    console.log('Clicked on share');
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
                : fypDetail.organization.user.profile_image
                ? fypDetail.organization.user.profile_image.path
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
            {fypDetail.organization.name}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {new Date(fypDetail.created_at).toDateString() ===
            new Date(fypDetail.updated_at).toDateString()
              ? `${new Date(fypDetail.created_at).toDateString()}`
              : `Updated at ${new Date(fypDetail.updated_at).toDateString()}`}
          </Text>
        </View>
        {/* right icon  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            navigation={navigation}
            handleShare={handleShare}
            handleFollow={handleFollow}
          />
        </View>
      </View>
      <Divider width={Width * 0.92} />

      {/* content  */}
      <View style={[styles.nameContainer, styles.center]}>
        {/* name of the project  */}
        <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
          {fypDetail.name}
        </Text>
      </View>
      <View style={[styles.descriptionContainer, styles.center]}>
        {/* name of the project  */}
        <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
          {fypDetail.description}
        </Text>
      </View>
      {/* icons container  */}
      <View style={{marginTop: 10}}>
        {/* category icon container  */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              size={ICON_SIZE * 0.9}
              color={theme.GREEN_COLOR}
              name={'grid-outline'}
            />
            <View style={styles.iconTextContainer}>
              {fypDetail.category.map((categ, index) => {
                if (index < 2) {
                  return (
                    <Text
                      style={[
                        styles.iconText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      {categ}
                      {fypDetail.category.length > 1 && index !== 1
                        ? ','
                        : fypDetail.category.length === 2 && index === 1
                        ? ' .'
                        : fypDetail.category.length === 1 &&
                          index === 0 &&
                          ' .'}
                    </Text>
                  );
                }
              })}
              {fypDetail.category.length > 2 && (
                <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                  . . .
                </Text>
              )}
            </View>
          </View>
        </View>

        {/* technologies container */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              size={ICON_SIZE * 0.9}
              color={theme.GREEN_COLOR}
              name={'code-slash-sharp'}
            />
            <View style={styles.iconTextContainer}>
              {fypDetail.technologies.map((tech, index) => {
                if (index < 2) {
                  return (
                    <Text
                      style={[
                        styles.iconText,
                        {
                          color: theme.TEXT_COLOR,
                        },
                      ]}>
                      {tech}
                      {fypDetail.technologies.length > 1 && index !== 1
                        ? ','
                        : fypDetail.technologies.length === 2 && index === 1
                        ? ' .'
                        : fypDetail.technologies.length === 1 &&
                          index === 0 &&
                          ' .'}
                    </Text>
                  );
                }
              })}
              {fypDetail.technologies.length > 2 && (
                <Text style={[styles.iconText, {color: theme.TEXT_COLOR}]}>
                  . . .
                </Text>
              )}
            </View>
          </View>
        </View>
        {/* date container  */}
        <View style={styles.iconContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Ionicons
              size={ICON_SIZE * 0.9}
              color={theme.GREEN_COLOR}
              name={'time-outline'}
            />
            <View style={styles.iconTextContainer}>
              <Text
                style={[
                  styles.iconText,
                  {
                    color: theme.TEXT_COLOR,
                  },
                ]}>
                {fypDetail.days_left}
                {fypDetail.days_left !== 1 ? ' days' : 'day'}
                {' left'}
              </Text>
            </View>
          </View>
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
            navigation.navigate('FYPScreens', {
              screen: 'View_FYP',
              params: {
                ID: fypDetail.id,
              },
            });
          }}
          width={Width * 0.3}
          height={Height * 0.055}
        />
      </View>
    </View>
  );
};

export default StudentFYPCard;

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
  nameContainer: {
    marginTop: 10,
  },
  nameText: {
    fontSize: Sizes.normal * 1.2,
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.8,
    lineHeight: 20,
    textAlign: 'center',
  },
  posterContainer: {
    marginHorizontal: 0,
  },
  iconContainer: {
    marginVertical: 5,
    marginHorizontal: Width * 0.04,
  },
  iconTextContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  iconText: {
    fontSize: Sizes.normal * 0.9,
    paddingHorizontal: 2,
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
