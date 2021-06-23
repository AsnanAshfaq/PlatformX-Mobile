import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import axios from '../../Utils/Axios';
import CustomHeader from '../../Components/CustomHeader';

import {GREY_IMAGE, PROFILE_IMAGE} from '../../Constants/sample';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import HackathonSkeleton from '../../Skeleton/HackathonCardSkeleton';
import {Height, Sizes, Width} from '../../Constants/Size';
import {darkColors} from '../../Constants/Colors';

type Props = {
  component: 'judges' | 'sponsors';
  details: any;
};
const CommonView: FC<Props> = ({component, details}) => {
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <View style={styles.viewContainer}>
      <View
        style={{
          marginHorizontal: Width * 0.01,
          flex: 0.3,
        }}>
        <Image
          style={{
            width: Width * 0.25,
            height: Width * 0.25,
            borderRadius: 45,
            borderWidth: 2,
            borderColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
      <View
        style={{
          marginHorizontal: Width * 0.09,
          justifyContent: 'space-around',
          flex: 0.7,
        }}>
        <Text style={styles.sponsorNameText}>{details.name}</Text>
        {component === 'judges' && (
          <Text style={styles.judgeCompanyText}>{details.company}</Text>
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

  const [HackathonData, setHackathonData] = useState({});
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
        <ScrollView>
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

          <Text style={styles.descriptionText}>
            {HackathonData.description}
          </Text>

          {/* prizes  */}
          <View style={styles.prizeContainer}>
            {HackathonData.prizes.map(prize => (
              <Text style={styles.prizeText} key={prize.id}>
                {prize.value}
              </Text>
            ))}
          </View>
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
      </View>
    );
  } else {
    return <HackathonSkeleton />;
  }
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
    fontSize: Sizes.normal,
    fontStyle: 'italic',
    // fontFamily: 'Raleway-Light',
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
  prizeContainer: {},
  prizeText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  labelContainer: {
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
  judgeNameText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.3,
  },
  judgeCompanyText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    // fontWeight: 'bold',
    fontStyle: 'italic',
  },
  judgeImage: {},
  sponsorNameText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.3,
  },
  sponsorURL: {
    color: darkColors.TOMATO_COLOR,
    fontSize: Sizes.normal,
  },
});
