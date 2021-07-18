// TODO:
// screen (Create OR Edit)
// screen header ( Create Post OR Edit Post)
// post text input (Write your post OR text passed)
// post category (Select Post Type OR category passed)
// post images (empty OR list of images passed)
// post button (Post)
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
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type base = {
  navigation: any;
  route: any;
};
interface props {
  id: any;
  text: string;
  category: string;
}
type screen = 'Create' | 'Edit';

const ICON_SIZE = Width * 0.07;

const Create_Edit: FC<base> = ({navigation, route}) => {
  const {screen}: {screen: screen} = route.params;

  var data: props = {
    id: '', // id of the post to be edited
    text: '',
    category: 'Select Post Type',
  };

  if (screen === 'Edit') {
    // if the screen is 'Edit'
    data = route.params;
  }

  const [Post, setPost] = useState({
    text: data.text,
    textPlacholder: 'Write here . . .',
    category: data.category,
  });
  const [ToggleDropDown, setToggleDropDown] = useState(false);
  const [Images, setImages] = useState<ImageOrVideo[]>([]);
  const textInputRef = useRef(null);

  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      setImages(prev => [...images, ...prev]);
    });
    // first hide the drop down if it is open
    if (textInputRef && textInputRef.current) {
      setToggleDropDown(false);
    }
  };

  const handlePost = async (method: string) => {
    var bodyFormData = new FormData();

    if (Post.text.trim() !== '') {
      if (
        Post.category.trim() !== 'Select Post Category' ||
        Post.category.trim() !== ''
      ) {
        // if we have images array
        if (Images.length > 0) {
          Images.forEach((image, index) => {
            // append all the images
            bodyFormData.append('path', {
              uri: image.path,
              type: image.mime,
              name: image.path.replace(
                'file:///data/user/0/com.platformx/cache/react-native-image-crop-picker/', // replace path with empty string
                '',
              ),
            });
            // append meta data
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
        // append text
        bodyFormData.append('text', Post.text);
        // append category
        bodyFormData.append('category', Post.category);

        method = method.toLowerCase();
        if (method === 'edit') {
          bodyFormData.append('post', data.id);
        }
        axios({
          method: 'post',
          url: `${BASE_URL}/api/post/${method}/`,
          data: bodyFormData,
          headers: {'Content-Type': 'multipart/form-data'},
        })
          .then(function (response) {
            //handle success
            // if the request status code is 201, then the post has been created
            if (response.status === 201) {
              ToastAndroid.show(response.data.success, 1500);
              // navigate user to main screen
              navigation.pop();
            } else {
              ToastAndroid.show(response.data.error + response.status, 1500);
            }
          })
          .catch(function (error) {
            //handle error
            if (error.response) {
              ToastAndroid.show(error.response.data.error, 1500);
            }
          });
      } else {
        ToastAndroid.show('Selecte Post Category', 1500);
      }
    } else {
      ToastAndroid.show('Post is Empty', 1500);
    }
  };

  // removing image
  const removeImage = (index: number) => {
    // remove image from setImages
    setImages(Images.filter((_, i) => i != index));
  };

  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation={navigation}
        title={`${screen} Post`}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        {/* post text view  */}
        <View style={styles.textInputContainer}>
          <TextInput
            ref={textInputRef}
            style={styles.text}
            onChangeText={text =>
              setPost(prev => {
                return {
                  ...prev,
                  text: text,
                };
              })
            }
            value={Post.text}
            multiline
            placeholder={Post.textPlacholder}
            placeholderTextColor={darkColors.TEXT_COLOR}
            // onFocus={() => {
            //   if (textInputRef && textInputRef.current) {
            //     setPost(prev => {
            //       return {
            //         ...prev,
            //         textPlacholder: '',
            //       };
            //     });
            //   }
            // }}
            // onBlur={() => console.log('Text input is blured')}
          />
        </View>
        {/* custom drop down  */}
        <View style={{marginBottom: 20}}>
          <CustomDropDown
            data={POST_TYPE}
            isShow={ToggleDropDown}
            toggleShow={setToggleDropDown}
            Selected={Post.category}
            setSelected={setPost}
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
                      width: 200,
                      height: 300,
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
            onPress={() => handlePost(screen)}>
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Create_Edit;

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