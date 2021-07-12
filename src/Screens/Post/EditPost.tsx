// TODO:
// title of the post
// post type -> General, Collaborate on a project, seeking help, seeking assistance
// choose image to upload

import React, {FC, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ToastAndroid,
  TextInput,
  ScrollView,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import CustomDropDown from '../../Components/CustomDropDown';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {POST_TYPE} from '../../Constants/sample';
import {Height, Sizes, Width} from '../../Constants/Size';
import {darkColors} from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../../Utils/Axios';

const ICON_SIZE = Width * 0.07;

type props = {
  navigation: any;
};

const CreatePost: FC<props> = ({navigation}) => {
  const [text, settext] = useState('');
  const [textPlacholder, setTextPlacholder] = useState('Write your post . . .');
  const [toggleDropDown, settoggleDropDown] = useState(false);
  const [Selected, setSelected] = useState('Select Post Type');
  const [Images, setImages] = useState<ImageOrVideo[]>([]);
  const dropDownRef = useRef(null);
  const textInput = useRef<any>(null);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      setImages(prev => [...images, ...prev]);
    });
    // first hide the drop down if it is open
    if (textInput && textInput.current) {
      settoggleDropDown(false);
    }
  };

  const removeImage = (index: number) => {
    // remove image from setImages
    setImages(Images.filter((_, i) => i != index));
  };

  const handlePost = () => {
    var bodyFormData = new FormData();

    if (text.trim() !== '') {
      if (textPlacholder === 'Write your post . . .') {
        // if we have images array
        if (Images.length > 0) {
          Images.forEach((image, index) => {
            // append all the images in bodyFormData
            bodyFormData.append('path', {
              uri: image.path,
              type: image.mime,
              name: image.path.replace(
                'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
                '',
              ),
            });
            bodyFormData.append(
              'metadata',
              image.path
                .replace(
                  'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
                  '',
                )
                .substring(0, 20),
            );
          });
        }

        bodyFormData.append('text', text);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/post/create/',
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data'},
        })
          .then(function (response) {
            //handle success
            // if the request status code is 201, then the post has been created
            if (response.status === 201) {
              ToastAndroid.show('Post has been edited', 1500);
              // navigate user to main screen
              navigation.pop();
            } else {
              ToastAndroid.show("Couldn't post", 1000);
              ToastAndroid.show('Error status code' + response.status, 1500);
            }
          })
          .catch(function (error) {
            //handle error
            if (error.response) {
              ToastAndroid.show(error.response.data.error, 1500);
            }
          });
      } else {
        ToastAndroid.show('Select Post Type', 1500);
      }
    } else {
      ToastAndroid.show('Please Write Something.', 1500);
    }
  };

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

  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        title={'Create Post'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
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
        <View style={{marginBottom: 20}}>
          <CustomDropDown
            data={POST_TYPE}
            isShow={toggleDropDown}
            toggleShow={settoggleDropDown}
            Selected={Selected}
            setSelected={setSelected}
          />
        </View>
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
      </ScrollView>
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
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
