import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from '../../Utils/Axios';
import CustomHeader from '../../Components/CustomHeader';

import {GREY_IMAGE, PROFILE_IMAGE} from '../../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import HackathonCardSkeleton from '../../Skeleton/HackathonCardSkeleton';
import {Height, Sizes, Width} from '../../Constants/Size';
import {darkColors} from '../../Constants/Colors';
import {commaSeperator} from '../../Utils/Numbers';

type prize = {
  prize: any;
};
const Prize: FC<prize> = ({prize}) => {
  return (
    <View style={styles.prizeContainer}>
      {/* badge container  */}
      <View style={styles.prizeBadgeContainer}>
        <Image
          source={require('../../../assets/images/badge.png')}
          style={{width: Width * 0.15, height: Width * 0.15}}
        />
      </View>
      <View style={styles.prizeDetailContainer}>
        <Text style={styles.prizeTitleText}>{prize.title}</Text>
        <Text style={styles.prizeValueText}>{commaSeperator(prize.value)}</Text>
        <Text style={styles.prizeDescText}>{prize.description}</Text>
      </View>
    </View>
  );
};
type Props = {
  component: 'judges' | 'sponsors';
  details: any;
};
// common view for showing judges and sponsors views
const CommonView: FC<Props> = ({component, details}) => {
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.viewContainer}>
      <View style={styles.viewImageContainer}>
        <Image
          style={styles.commonViewImage}
          resizeMode="cover"
          source={{
            uri: ImageLoading
              ? PROFILE_IMAGE
              : component === 'judges'
              ? BASE_URL + details.photo
              : BASE_URL + details.logo,
          }}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>
      <View style={styles.viewTextContainer}>
        <Text style={styles.viewNameText}>{details.name}</Text>
        {component === 'judges' && (
          <Text style={styles.viewCompanyText}>{details.company}</Text>
        )}
        {component === 'sponsors' && (
          <Text style={styles.sponsorURL}>{details.url}</Text>
        )}
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const ViewHackathon: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  const [HackathonData, setHackathonData] = useState<any>({});
  const [BackgroundImageLoading, setBackgroundImageLoading] = useState(true);
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setHackathonData(result.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [ID]);

  if (!Loading) {
    return (
      <View style={styles.parent}>
        <CustomHeader
          title={'Detail'}
          navigation={navigation}
          back
          onBackPress={() => navigation.goBack()}
          chat
          bell
        />
        <ScrollView stickyHeaderIndices={[1, 2, 4, 6]} removeClippedSubviews>
          {/* background image  */}
          <View>
            <Image
              style={{
                width: Width,
                height: Width * ImageAspectRatio,
              }}
              source={{
                uri: BackgroundImageLoading
                  ? GREY_IMAGE
                  : BASE_URL + HackathonData?.background_image,
              }}
              onLoadEnd={() => {
                Image.getSize(
                  BASE_URL + HackathonData?.background_image,
                  (width, heigth) => {
                    // calculate aspect ratio of image
                    setImageAspectRatio(heigth / width);
                    setBackgroundImageLoading(false);
                  },
                );
              }}
            />
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.titleText}>{HackathonData.title}</Text>
            <Text style={styles.tagLineText}>{HackathonData.tag_line}</Text>
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Description</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {HackathonData.description}
            </Text>
          </View>
          {/* prizes  */}

          <View style={styles.labelContainer}>
            <Text style={styles.label}>Prizes</Text>
          </View>
          <FlatList
            numColumns={2}
            data={HackathonData.prizes}
            keyExtractor={(item: any, index) => `${item.id}`}
            renderItem={({item: prize}) => (
              <Prize prize={prize} key={prize.id} />
            )}
          />
          {/* <View style={{flexDirection: 'row', flex: 1}}>
            {HackathonData?.prizes.map(prize => (
              <Prize prize={prize} />
            ))}
          </View> */}

          {/* judges  */}
          {HackathonData?.judges && (
            <>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Judges</Text>
              </View>
              {HackathonData?.judges.map(judge => (
                <CommonView component="judges" details={judge} key={judge.id} />
              ))}
            </>
          )}
          {/* sponsors  */}
          {HackathonData?.sponsors && (
            <>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Sponsors</Text>
              </View>
              {HackathonData?.sponsors.map(sponsor => (
                <CommonView
                  component="sponsors"
                  details={sponsor}
                  key={sponsor.id}
                />
              ))}
            </>
          )}
          {/* requirements  */}
          {/* criteria  */}
          {/* Contact us  */}
          <Text>{HackathonData.contact_email}</Text>
        </ScrollView>

        {/* join now  */}
        <View style={styles.joinNowButtonContainer}>
          <TouchableOpacity style={styles.joinNowButton} activeOpacity={0.5}>
            <Text style={styles.joinNowText}>Join Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'Detail'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
        chat
        bell
      />
      <HackathonCardSkeleton />
    </View>
  );
};

export default ViewHackathon;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  titleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.7,
    fontFamily: 'Raleway-Light',
  },
  tagLineText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.15,
    fontStyle: 'italic',
    // fontFamily: 'Raleway-Light',
  },
  descriptionContainer: {
    marginHorizontal: Width * 0.025,
    marginVertical: 10,
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  prizeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    // marginHorizontal: Width * 0.01,
  },
  prizeBadgeContainer: {
    // flex: 0.1,
  },
  prizeDetailContainer: {
    flex: 0.95,
    justifyContent: 'center',
  },
  prizeTitleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.3,
    fontWeight: 'bold',
  },
  prizeValueText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.25,
  },
  prizeDescText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  labelContainer: {
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
    marginHorizontal: Width * 0.02,
    marginVertical: 10,
    width: Width * 0.95,
    padding: 5,
    borderBottomColor: darkColors.SHADOW_COLOR,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: Sizes.large * 1.3,
    color: darkColors.TEXT_COLOR,
    fontFamily: 'Cindyrella',
  },
  viewContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  viewImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.33,
  },
  viewTextContainer: {
    paddingHorizontal: Width * 0.04,
    justifyContent: 'space-around',
    flex: 0.67,
  },
  viewNameText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.3,
  },
  viewCompanyText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    // fontWeight: 'bold',
    fontStyle: 'italic',
  },
  commonViewImage: {
    width: Width * 0.25,
    height: Width * 0.25,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sponsorURL: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.normal,
  },
  joinNowButtonContainer: {
    height: Width * 0.14,
    // backgroundColor: darkColors.BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinNowButton: {
    width: Width * 0.9,
    height: Width * 0.12,
    backgroundColor: darkColors.TOMATO_COLOR,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  joinNowText: {
    fontSize: Sizes.large,
    color: darkColors.TEXT_COLOR,
  },
});
