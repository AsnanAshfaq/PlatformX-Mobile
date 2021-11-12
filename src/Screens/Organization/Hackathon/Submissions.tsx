import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {PROFILE_IMAGE} from '../../../Constants/sample';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {ForwardArrow, Tick} from '../../../Components/Icons';
import CustomButton from '../../../Components/CustomButton';
import CheckBox from '../../../Components/CheckBox';
import {AirbnbRating} from 'react-native-ratings';

const ICON_SIZE = Width * 0.07;

const SAMPLE_DATA = [
  {
    id: 1,
    image:
      'https://avatars.githubusercontent.com/u/65377376?s=400&u=812ba5bc16639e502e22fa141f284c0914e1fa80&v=4',
    title: 'PlatformX',
    tagline: 'A platform for developers',
    uploadDate: '2020-06-01',
  },
  {
    id: 2,
    image:
      'https://avatars.githubusercontent.com/u/65377376?s=400&u=812ba5bc16639e502e22fa141f284c0914e1fa80&v=4',
    title: 'PlatformX',
    tagline: 'A platform for developers',
    uploadDate: '2020-06-01',
    marks: 5,
    rating: 4,
  },
  {
    id: 2,
    image:
      'https://avatars.githubusercontent.com/u/65377376?s=400&u=812ba5bc16639e502e22fa141f284c0914e1fa80&v=4',
    title: 'PlatformX',
    tagline: 'A platform for developers',
    uploadDate: '2020-06-01',
    marks: 5,
    rating: 3,
  },
];

type headerProps = {
  total: string | number;
  sort: boolean;
  onSortPress: () => void;
};

const HeaderComponent: FC<headerProps> = ({total, sort, onSortPress}) => {
  const [{theme}, dispatch] = useStateValue();
  const [isChecked, setisChecked] = useState<
    'all' | 'evaluated' | 'non-evaluated'
  >('all');

  return (
    <>
      <View style={[styles.container, {flexDirection: 'row'}]}>
        <View style={{flex: 0.9}}>
          <Text style={[{color: theme.TEXT_COLOR}]}>
            Total projects submitted:{' '}
            <Text style={{fontWeight: 'bold', fontSize: Sizes.normal}}>
              {total}
            </Text>
          </Text>
        </View>
        <View
          style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => onSortPress()}>
            <FontAwesome
              name={`${sort ? 'sort-alpha-down' : 'sort-alpha-up'}`}
              size={ICON_SIZE * 0.7}
              color={theme.ICON_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkBoxsContainer}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            size={20}
            onPress={isChecked => setisChecked('all')}
            isChecked={isChecked === 'all'}
            disableBuiltInState={true}
          />
          <View>
            <Text style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
              All
            </Text>
          </View>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            size={20}
            onPress={isChecked => setisChecked('evaluated')}
            isChecked={isChecked === 'evaluated'}
            disableBuiltInState={true}
          />
          <View>
            <Text style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
              Evaluated
            </Text>
          </View>
        </View>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            size={20}
            onPress={isChecked => setisChecked('non-evaluated')}
            isChecked={isChecked === 'non-evaluated'}
            disableBuiltInState={true}
          />
          <View>
            <Text style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
              Non-Evaluated
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

type cardProps = {
  title: string;
  tagline: string;
  image: string;
  uploadDate: string;
  handleCardPress: () => void;
  marks?: number;
  rating?: number;
};

const ProjectCard: FC<cardProps> = ({
  image,
  title,
  tagline,
  marks,
  rating,
  uploadDate,
  handleCardPress,
}) => {
  const [{theme}, dispatch] = useStateValue();
  const [ImageLoading, setImageLoading] = useState(true);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => handleCardPress()}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cardImageContainer}>
            <Image
              style={styles.cardImage}
              source={{
                uri: ImageLoading ? PROFILE_IMAGE : image,
                //   image !== null
                //     ? BASE_URL + data.user_profile_image.path
                //     : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </View>
          <View style={styles.cardDetailsContainer}>
            <View style={styles.cardDetailTextContainer}>
              <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
                {title}
              </Text>
              <Text style={[styles.taglineText, {color: theme.DIM_TEXT_COLOR}]}>
                {tagline}
              </Text>
            </View>
            <View style={[styles.marksContainer]}>
              {marks && (
                <>
                  <View style={styles.marksDetailsContainer}>
                    <View
                      style={[
                        styles.markIconContainer,
                        {
                          backgroundColor: theme.GREEN_COLOR,
                        },
                      ]}>
                      <Tick color={theme.ICON_COLOR} size={0.3} />
                    </View>
                    <View style={styles.marksTextContainer}>
                      <Text
                        style={[styles.marksText, {color: theme.TEXT_COLOR}]}>
                        {marks}/25
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.starContainer]}>
                    <AirbnbRating
                      size={
                        rating === 1
                          ? 9
                          : rating === 2
                          ? 8
                          : rating === 3
                          ? 7
                          : rating === 4
                          ? 6
                          : 5
                      }
                      defaultRating={rating}
                      count={rating}
                      selectedColor={theme.GREEN_COLOR}
                      isDisabled={true}
                      showRating={false}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </View>

        {/* bottom container  */}
        <View style={[styles.buttonContainer]}>
          <View style={styles.uploadDateTextContainer}>
            <Text
              style={[styles.uploadedDateText, {color: theme.DIM_TEXT_COLOR}]}>
              Submitted on {new Date(uploadDate).toDateString()}
            </Text>
          </View>
          <View style={styles.button}>
            <CustomButton
              children={
                <View style={styles.buttonIconContainer}>
                  <ForwardArrow size={0.75} />
                </View>
              }
              text={'Evalute'}
              textSize={Sizes.normal * 0.8}
              onPress={() => {
                handleCardPress();
              }}
              width={Width * 0.25}
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
const Submissions: FC<props> = ({navigation, route}) => {
  const ID = route.params.ID;
  const [{theme}, dispatch] = useStateValue();
  const [sorting, setsorting] = useState(false);

  const handleCardPress = () => {
    navigation.navigate('Hackathon_Project', {
      ID: ID, // pass the hackathon project ID,
      screen: 'organization',
    });
  };

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Submissions'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <View style={{marginHorizontal: Width * 0.04}}>
        <HeaderComponent
          total={10}
          sort={sorting}
          onSortPress={() => setsorting(!sorting)}
        />

        <FlatList
          contentContainerStyle={styles.scroll}
          keyExtractor={(item, index) => index.toString()}
          data={SAMPLE_DATA}
          renderItem={({item}) => {
            return <ProjectCard {...item} handleCardPress={handleCardPress} />;
          }}
        />
      </View>
    </View>
  );
};

export default Submissions;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  headerContainer: {
    marginHorizontal: Width * 0.04,
  },
  checkBoxsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
  scroll: {
    // marginHorizontal: Width * 0.04,
    marginTop: 10,
  },
  listHeaderTextContainer: {},
  cardContainer: {
    marginVertical: 10,
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: 'transparent',
  },
  cardImageContainer: {
    flex: 0.25,
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: Width * 0.17,
    height: Width * 0.17,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  cardDetailsContainer: {
    flex: 0.75,
    flexDirection: 'row',
  },
  cardDetailTextContainer: {
    flex: 0.75,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: Sizes.normal * 1.1,
    fontWeight: 'bold',
  },
  marksContainer: {
    flex: 0.25,
    flexDirection: 'column',
    marginTop: 5,
  },
  marksDetailsContainer: {
    flexDirection: 'row',
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markIconContainer: {
    borderRadius: 2,
    borderColor: 'transparent',
    width: 10,
    height: 10,
    marginTop: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marksTextContainer: {},
  starContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marksText: {
    fontSize: Sizes.normal * 0.6,
  },
  taglineText: {
    fontSize: Sizes.normal * 0.8,
    fontStyle: 'italic',
    lineHeight: 20,
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
