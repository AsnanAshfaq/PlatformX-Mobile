/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Linking,
  Image,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {useStateValue} from '../../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import Axios from '../../../Utils/Axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../../Components/Loading';
import {Height, Sizes, Width} from '../../../Constants/Size';
import CustomButton from '../../../Components/CustomButton';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import Divider from '../../../Components/Divider';
import {CodeDownload, Github, LinkedIn} from '../../../Components/Icons';

const SAMPLE_DATA = [
  {
    id: 1,
    image: 'https://avatars.githubusercontent.com/u/65377376?v=4',
    name: 'Asnan Ashfaq',
    username: 'shanay_ash',
    github: 'https://github.com/AsnanAshfaq',
    linked_in: 'https://www.linkedin.com/in/asnan-ashfaq/',
    portfolio: '',
    created_at: new Date(),
  },
  {
    id: 2,
    image: 'https://avatars.githubusercontent.com/u/65377376?v=4',
    name: 'Asnan Ashfaq',
    username: 'shanay_ash',
    github: 'https://github.com/AsnanAshfaq',
    linked_in: 'https://www.linkedin.com/in/asnan-ashfaq/',
    portfolio: '',
    created_at: new Date(),
  },
  {
    id: 3,
    image: 'https://avatars.githubusercontent.com/u/65377376?v=4',
    name: 'Asnan Ashfaq',
    username: 'shanay_ash',
    github: 'https://github.com/AsnanAshfaq',
    linked_in: 'https://www.linkedin.com/in/asnan-ashfaq/',
    portfolio: '',
    created_at: new Date(),
  },
];
type Props = {
  name: '';
  username: '';
  image: any;
  github: '';
  linked_in: '';
  portfolio: '';
  created_at: any;
  handlePress: () => void;
};
const ApplicantCard: FC<Props> = ({
  image,
  name,
  username,
  created_at,
  github,
  linked_in,
  portfolio,
  handlePress,
}) => {
  const {theme} = useStateValue()[0];
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {/* image container */}
        <View style={{flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: ImageLoading
                  ? PROFILE_IMAGE
                  : image
                  ? image
                  : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
              style={styles.image}
            />
          </View>
          {/* name and user name container  */}
          <View style={styles.nameContainer}>
            <Text
              style={[
                styles.fullname,
                {
                  color: theme.TEXT_COLOR,
                },
              ]}>
              {name}
            </Text>
            <Text
              style={[
                styles.username,
                {
                  color: theme.DIM_TEXT_COLOR,
                },
              ]}>
              @{username}
            </Text>
          </View>
        </View>

        {/* divier  */}
        <Divider width={Width * 0.85} marginHorizontal={2} />
        {/* show data details  */}
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <View style={{flex: 0.38}}>
            <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
              Links
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 10}}>
              <TouchableWithoutFeedback onPress={() => Linking.openURL(github)}>
                <Github color={theme.GREEN_COLOR} size={0.8} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{marginHorizontal: 10}}>
              <TouchableWithoutFeedback onPress={() => Linking.openURL(github)}>
                <LinkedIn color={theme.GREEN_COLOR} size={0.8} />
              </TouchableWithoutFeedback>
            </View>

            {portfolio !== null && portfolio !== '' && (
              <View style={{marginHorizontal: 10}}>
                <MaterialCommunityIcons
                  name={'web'}
                  color={theme.GREEN_COLOR}
                  size={Width * 0.07 * 0.8}
                />
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 0.4}}>
            <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
              CV
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 0,
            }}>
            <CodeDownload color={theme.GREEN_COLOR} size={0.9} />
            <Text
              style={{
                color: theme.DIM_TEXT_COLOR,
                fontSize: Sizes.small * 0.7,
                marginLeft: 5,
              }}>
              (Download)
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={{flex: 0.4}}>
            <Text style={[styles.labelText, {color: theme.TEXT_COLOR}]}>
              Resume
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 0,
            }}>
            <CodeDownload color={theme.GREEN_COLOR} size={0.9} />
            <Text
              style={{
                color: theme.DIM_TEXT_COLOR,
                fontSize: Sizes.small * 0.7,
                marginLeft: 5,
              }}>
              (Download)
            </Text>
          </View>
        </View>

        <View style={[styles.buttonContainer]}>
          <View style={styles.uploadDateTextContainer}>
            <Text
              style={[styles.uploadedDateText, {color: theme.DIM_TEXT_COLOR}]}>
              Applied on {new Date(created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.button}>
            <CustomButton
              text={'Schedule Meeting'}
              textSize={Sizes.normal * 0.75}
              onPress={handlePress}
              width={Width * 0.35}
              height={Height * 0.05}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
type props = {
  navigation: any;
  route: any;
};
const Applicants: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [applicants, setapplicants] = useState(SAMPLE_DATA);
  const [refreshing, setRefreshing] = useState(false);
  const {ID} = route.params;

  const getData = async () => {
    Axios.get(`/api/submissions/${ID}/`)
      .then(response => {
        setapplicants(response.data);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        return error.response;
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false));
  };
  useEffect(() => {
    //   get test of the fyp
    getData();
  }, [loading]);

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Applicant'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      {!loading && applicants.length > 0 ? (
        <>
          <View style={[styles.container, {marginHorizontal: Width * 0.04}]}>
            <Text style={[styles.topText, {color: theme.TEXT_COLOR}]}>
              Total Applicants :{' '}
              <Text style={[styles.normalText, {fontWeight: 'bold'}]}>
                {applicants.length}
              </Text>
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.scroll}
            keyExtractor={(item, index) => index.toString()}
            data={SAMPLE_DATA}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.REFRESH_COLOR]}
                progressBackgroundColor={theme.REFRESHING_BACKGROUND_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            renderItem={({item}: any) => {
              return (
                <ApplicantCard
                  {...item}
                  handlePress={() => console.log('Pressed')}
                />
              );
            }}
          />
        </>
      ) : loading ? (
        <View style={[styles.center, {flex: 1}]}>
          <Loading size={'large'} />
        </View>
      ) : (
        <View style={[styles.center, {flex: 1}]}>
          <Text style={[styles.normalText, {color: theme.TEXT_COLOR}]}>
            No Applicants yet.
          </Text>
          <TouchableOpacity onPress={() => setloading(true)}>
            <Text style={[styles.normalText, {color: theme.GREEN_COLOR}]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Applicants;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginVertical: 10,
  },
  scroll: {
    // marginHorizontal: Width * 0.04,
    marginTop: 10,
  },
  topText: {
    fontSize: Sizes.normal * 0.8,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  labelText: {
    fontSize: Sizes.normal * 0.8,
  },
  valueText: {
    fontSize: Sizes.normal * 0.85,
  },
  cardContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    borderRadius: 10,
    padding: 10,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  nameContainer: {
    margin: 5,
    marginLeft: 10,
    marginVertical: 10,
    flex: 0.8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  username: {
    fontSize: Sizes.normal * 0.75,
  },
  fullname: {
    fontSize: Sizes.normal,
  },

  buttonContainer: {
    flexDirection: 'row',
  },
  uploadDateTextContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  uploadedDateText: {
    fontSize: Sizes.normal * 0.62,
    fontStyle: 'italic',
  },
  button: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  buttonIconContainer: {
    justifyContent: 'center',
    marginHorizontal: 4,
    alignItems: 'center',
  },
});
