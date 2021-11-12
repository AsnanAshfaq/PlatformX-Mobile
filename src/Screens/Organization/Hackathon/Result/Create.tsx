import React, {FC, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {PROFILE_IMAGE} from '../../../../Constants/sample';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import CustomButton from '../../../../Components/CustomButton';
const PROJECTS = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Android task monitioring',
    rating: 3,
    score: 15,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Sentiment analysis for product rating',
    rating: 5,
    score: 10,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Fingerprint-based ATM system',
    rating: 5,
    score: 19,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Advanced employee management system',
    rating: 5,
    score: 17,
  },
  {
    id: '5',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Image encryption using AES algorithm',
    rating: 2,
    score: 20,
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    title: 'Fingerprint voting system',
    rating: 3,
    score: 14,
  },
];

type cardProps = {
  id: string;
  image: string;
  title: string;
  score: number;
  rating: number;
  selectedProjectID: string;
  onPress: (id: string) => void;
};
const Card: FC<cardProps> = ({
  id,
  title,
  image,
  score,
  selectedProjectID,
  rating,
  onPress,
}) => {
  const {theme} = useStateValue()[0];
  const [LogoImage, setLogoImage] = useState(true);
  const [selected, setselected] = useState(false);

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress(id)}>
      <View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.selectionContainer, styles.center]}>
            {/* <CheckBox
              size={20}
              onPress={isChecked => onPress(id)}
              disableBuiltInState={true}
              isChecked={selectedProjectID === id ? true : false}
            /> */}
            {selectedProjectID === id && <Text></Text>}
          </View>
          <View style={styles.cardImageContainer}>
            <Image
              style={styles.cardImage}
              source={{
                uri: LogoImage ? PROFILE_IMAGE : image,
                //   image !== null
                //     ? BASE_URL + data.user_profile_image.path
                //     : PROFILE_IMAGE,
              }}
              onLoadEnd={() => setLogoImage(false)}
              onError={() => setLogoImage(false)}
            />
          </View>
          <View style={styles.cardDetailsContainer}>
            <View style={styles.cardDetailTextContainer}>
              <Text style={[styles.titleText, {color: theme.TEXT_COLOR}]}>
                {title}
              </Text>
            </View>
            <View style={styles.marksContainer}>
              <Text style={[styles.marksText, {color: theme.TEXT_COLOR}]}>
                {score}/25
              </Text>
              <AirbnbRating
                size={6}
                defaultRating={rating}
                count={rating}
                selectedColor={theme.GREEN_COLOR}
                isDisabled={true}
                showRating={false}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

type props = {
  ID: '';
};
const Create: FC<props> = ({ID}) => {
  const {theme} = useStateValue()[0];
  const [number, setnumber] = useState<1 | 2 | 3>(1);
  const [selectedProjectID, setselectedProjectID] = useState('');

  const handleProjectSelection = id => {
    setselectedProjectID(id);
  };

  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, styles.center]}>
        <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
          PICK YOUR HACKATHON WINNERS
        </Text>
      </View>
      {/* image container  */}
      <View style={[styles.container, styles.center]}>
        <Image
          source={require('../../../../../assets/images/rankings.png')}
          style={styles.image}
        />
      </View>
      {/* button container  */}
      <View style={[styles.container, styles.margin, {flexDirection: 'row'}]}>
        <View style={[styles.buttonContainer]}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 1
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(1)}>
            <Text
              style={[
                {
                  color: number === 1 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 1 ? Sizes.normal * 1.2 : Sizes.normal * 0.9,
                },
              ]}>
              1st
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 2
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(2)}>
            <Text
              style={[
                {
                  color: number === 2 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 2 ? Sizes.normal * 1.2 : Sizes.normal * 0.9,
                },
              ]}>
              2nd
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.center,
              {
                backgroundColor:
                  number === 3
                    ? theme.GREEN_COLOR
                    : theme.CARD_BACKGROUND_COLOR,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => setnumber(3)}>
            <Text
              style={[
                {
                  color: number === 3 ? theme.TEXT_COLOR : theme.DIM_TEXT_COLOR,
                  fontSize:
                    number === 3 ? Sizes.normal * 1.2 : Sizes.normal * 0.9,
                },
              ]}>
              3rd
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerStyle={[styles.scroll]}
        keyExtractor={(item, index) => `${item.id} - ${index}`}
        data={PROJECTS}
        renderItem={({item}) => (
          <Card
            {...item}
            onPress={handleProjectSelection}
            selectedProjectID={selectedProjectID}
          />
        )}
      />

      {/* button to submit result  */}
      <CustomButton
        text={'Submit'}
        onPress={() => console.log('Submitting result')}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.4,
  },
  scroll: {
    marginTop: 10,
    marginHorizontal: Width * 0.04,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: Sizes.normal * 1.2,
  },
  cardContainer: {
    marginVertical: 10,
    flexDirection: 'column',
    borderRadius: 10,
    borderColor: 'transparent',
    paddingVertical: 10,
  },
  selectionContainer: {
    flex: 0.08,
    paddingLeft: 10,
  },
  cardImageContainer: {
    flex: 0.22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: Width * 0.16,
    height: Width * 0.16,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  cardDetailsContainer: {
    flex: 0.7,
    flexDirection: 'row',
  },
  cardDetailTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  titleText: {
    fontSize: Sizes.normal * 0.9,
    fontWeight: 'bold',
  },
  marksContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marksText: {
    fontSize: Sizes.normal * 0.9,
  },
});
