// TODO:
// title of the post
// post type -> General, Collaborate on a project, seeking help, seeking assistance
// choose image to upload

import React, {FC, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Keyboard,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import CustomDropDown from '../../Components/CustomDropDown';
import ImagePicker from 'react-native-image-crop-picker';
import {POST_TYPE} from '../../Constants/sample';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {Height, Sizes, Width} from '../../Constants/Size';
import {darkColors} from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ICON_SIZE = Width * 0.07;

type props = {
  navigation: any;
};

const CreatePost: FC<props> = ({navigation}) => {
  const [text, settext] = useState('');
  const [textPlacholder, setTextPlacholder] = useState('Write your post . . .');
  const [toggleDropDown, settoggleDropDown] = useState(false);
  const [Selected, setSelected] = useState('Select Post Type');
  const [Images, setImages] = useState([]);
  const dropDownRef = useRef(null);
  const textInput = useRef(null);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      setImages(prev => [...prev, ...images]);
    });
  };
  const onViewPressed = () => {
    // console.log(dropDownRef);
    // console.log('Pressed on view');
  };

  const removeImage = (index: number) => {
    // remove image from setImages
    setImages(Images.filter((_, i) => i != index));
  };

  const handlePost = () => {
    console.log('Clicked on post');
  };

  // console.log(Images.length);
  useEffect(() => {
    // make text input blur if keyboard is hidden
    Keyboard.addListener('keyboardDidHide', event => {
      if (textInput && textInput.current) {
        textInput?.current?.blur();
        // and make the placeholder to its previous value
        setTextPlacholder('Write your post . . .');
      }
    });
    // hide the drop down if the keyboard is open
    Keyboard.addListener('keyboardDidShow', event => {
      if (textInput && textInput.current) {
        settoggleDropDown(false);
      }
    });
  }, [textInput]);

  useEffect(() => {
    console.log(Images);
  }, [Images]);
  return (
    <View onTouchStart={() => console.log('Tocuhed started')}>
      <TouchableWithoutFeedback onPress={() => onViewPressed()}>
        <CustomHeader
          navigation={navigation}
          title={'Create Post'}
          back
          onBackPress={() => navigation.goBack()}
        />
        {/* post text view  */}
        <View style={styles.textInputContainer}>
          <TextInput
            ref={textInput}
            style={styles.text}
            onChangeText={settext}
            value={text}
            multiline
            placeholder={textPlacholder}
            placeholderTextColor={darkColors.TEXT_COLOR}
            onFocus={() => {
              if (textInput && textInput.current) {
                setTextPlacholder('');
              }
            }}
            // onBlur={() => console.log('Text input is blured')}
          />
        </View>
        {/* custom drop down  */}
        <CustomDropDown
          data={POST_TYPE}
          isShow={toggleDropDown}
          toggleShow={settoggleDropDown}
          Selected={Selected}
          setSelected={setSelected}
        />
        {/* show image view in a scrollview*/}

        {Images.length > 0 && (
          <ScrollView horizontal>
            {Images.map((image, index) => {
              return (
                <View style={styles.imageContainer} key={index}>
                  <Image
                    source={{uri: image?.path}}
                    style={{
                      width: image.width > 200 ? 200 : image?.width,
                      height: image.height > 300 ? 300 : image?.height,
                      marginHorizontal: 7,
                      borderRadius: 10,
                    }}
                    resizeMode={'cover'}
                  />

                  <View style={styles.crossContainer}>
                    <TouchableOpacity onPress={() => removeImage(index)}>
                      <Ionicons
                        name={'close-circle-outline'}
                        size={ICON_SIZE}
                        color={darkColors.ICON_COLOR}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* add  image view  */}
        <View style={styles.addImageContainer}>
          <TouchableOpacity onPress={() => openGallery()}>
            <Ionicons
              name={'add-circle-outline'}
              size={ICON_SIZE * 2.7}
              color={darkColors.SHADOW_COLOR}
            />
          </TouchableOpacity>
          <Text style={styles.addImageText}>Add Image</Text>
        </View>

        {/* post button view  */}
        <View style={styles.postButtonContainer}>
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => handlePost()}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  textInputContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    width: Width * 0.9,
    marginHorizontal: Width * 0.01,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    marginVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkColors.LIGHT_BACKGROUND,
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
  },
  addImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  addImageText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    fontFamily: 'ComicNeue-Light',
  },
  imageContainer: {
    margin: 0,
    // flex: 1,
    height: 300,
  },
  image: {
    width: Width * 0.9,
    height: Width * (9 / 16),
  },
  crossContainer: {
    position: 'absolute',
    top: 0,
    right: 10,
    bottom: 10,
  },
  cross: {
    color: darkColors.SHADOW_COLOR,
    fontSize: Sizes.large * 1.2,
    fontFamily: 'ComicNeue-Bold',
  },
  postButtonContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 5,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  postButton: {
    backgroundColor: darkColors.SHADOW_COLOR,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    maxHeight: Height * 0.06,
    width: Width * 0.9,
    height: Height * 0.06,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    paddingVertical: 2,
  },
});
