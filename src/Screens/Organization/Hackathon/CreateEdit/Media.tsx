/* eslint-disable react-native/no-inline-styles */
//TODO:
// logo image
// thumbnail image
// background image
// promotional video
// file type
// is video required

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Cross} from '../../../../Components/Icons';
import CheckBox from '../../../../Components/CheckBox';
import CustomTextField from '../../../../Components/CustomTextField2';

const HelpText: FC<{text: string}> = ({text}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={styles.helpTextContainer}>
      <Text style={[styles.helpText, {color: theme.DIM_TEXT_COLOR}]}>
        {text}
      </Text>
    </View>
  );
};

type props = {};

const Media: FC<props> = () => {
  const {theme} = useStateValue()[0];
  const [Paths, setPaths] = useState({
    thumbnail: '',
    logo: '',
    background: '',
  });

  const handleImagePicker = (key: string) => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      const x = Paths;
      x[key] = image.path;
      setPaths(props => {
        return {...x};
      });
    });
  };

  const unSelectImage = (key: string) => {
    const x = Paths;

    x[key] = '';
    setPaths(props => {
      return {...x};
    });
  };

  const ImageView: FC<{Key: string; value: string}> = ({Key, value}) => {
    return (
      <TouchableOpacity
        style={[
          styles.imageCardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
            height: value === '' ? Height * 0.15 : 'auto',
            paddingTop: value ? 10 : 0,
          },
        ]}
        activeOpacity={0.5}
        onPress={() => handleImagePicker(Key)}>
        <Camera color={theme.GREEN_COLOR} size={1} />
        <Text style={[styles.imageText, {color: theme.DIM_TEXT_COLOR}]}>
          Upload Image
        </Text>
        <View>
          {value !== '' && (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.crossContainer}
                onPress={() => unSelectImage(Key)}>
                <Cross color={theme.GREEN_COLOR} size={0.9} />
              </TouchableOpacity>
              <Image source={{uri: value}} style={styles.image} />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.parent}>
      <Text style={[styles.screenName, {color: theme.TEXT_COLOR}]}>Media</Text>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* image containers  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Thumbnail Image
            </Text>
          </View>
          <ImageView Key={'thumbnail'} value={Paths.thumbnail} />
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Logo Image
            </Text>
          </View>
          <ImageView Key={'logo'} value={Paths.logo} />
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Background Image
            </Text>
          </View>
          <ImageView Key={'background'} value={Paths.background} />
        </View>

        {/* file type  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              File Type
            </Text>
          </View>
          <HelpText
            text={
              'Specify which type of files can only be uploaded by participants.'
            }
          />
          <FlatList
            data={[
              'APK',
              'BIN',
              'CSV',
              'DOC',
              'EXE',
              'GIF',
              'JPEG',
              'JPG',
              'MP4',
              'PDF',
              'PNG',
              'PPT',
              'PPS',
              'TIFF',
              'XLS',
              'ZIP',
            ]}
            numColumns={4}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.checkBoxContainer,
                    {
                      marginVertical: 5,
                      marginLeft: Width * 0.035,
                    },
                  ]}>
                  <CheckBox
                    size={20}
                    onPress={isCheck => console.log('Checked on', item)}
                  />
                  <Text
                    style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        {/* required video container  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Videos Required
            </Text>
          </View>
          <HelpText
            text={
              'Turning this on will require participants to add a video link to their submissions.'
            }
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              size={20}
              onPress={isCheck => {
                console.log(isCheck);
              }}
            />
            <Text style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
              Yes
            </Text>
          </View>
        </View>

        {/* promotional video  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Promotional Video
            </Text>
          </View>
          <HelpText text={'Provide any promotional video for the hackathon.'} />
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={''}
              keyboardType={'email-address'}
              onChangeText={text => console.log('Text is ', text)}
              placeholder={'Enter promotional video URL'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'URL'}
              multiLine={true}
              error={''}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Media;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.large * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    // width: Width * 0.2,
    borderRadius: 10,
  },
  imageContainer: {
    // width: 60,
    // height: 60,
    paddingVertical: 5,
  },
  image: {
    width: Width * 0.5,
    height: Width * 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
  crossContainer: {
    position: 'absolute',
    top: -1,
    // top: 4,
    left: -15,
  },
  inputContainer: {
    marginTop: 4,
  },
  helpTextContainer: {
    marginTop: 4,
    marginLeft: 4,
  },
  helpText: {
    fontSize: Sizes.normal * 0.62,
    lineHeight: 14,
  },
  imageText: {
    fontSize: Sizes.normal * 0.95,
  },
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
});
