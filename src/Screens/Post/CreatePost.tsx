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
  TextInput,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import CustomDropDown from '../../Components/CustomDropDown';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {POST_TYPE} from '../../Constants/sample';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Sizes, Width} from '../../Constants/Size';
import {darkColors} from '../../Constants/Colors';
import {event} from 'react-native-reanimated';
type props = {
  navigation: any;
};
const CreatePost: FC<props> = ({navigation}) => {
  const [text, settext] = useState('');
  const [toggleDropDown, settoggleDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const textInput = useRef(null);

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        selectionLimit: 0,
      },
      response => {
        console.log(response);
      },
    );
  };
  const onViewPressed = () => {
    console.log(dropDownRef);
    console.log('Pressed on view');
  };

  useEffect(() => {
    // make text input blur if keyboard is hidden
    Keyboard.addListener('keyboardDidHide', event => {
      if (textInput && textInput.current) {
        textInput?.current?.blur();
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
    console.log(dropDownRef.current);
  }, [dropDownRef]);
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
            placeholder={'Write your post...'}
            placeholderTextColor={darkColors.TEXT_COLOR}
            onFocus={() => console.log('Text input is focused')}
            onBlur={() => console.log('Text input is blured')}
          />
        </View>

        {/* custom drop down  */}
        <CustomDropDown
          data={POST_TYPE}
          isShow={toggleDropDown}
          toggleShow={settoggleDropDown}
        />

        {/* post image view  */}
        <TouchableHighlight onPress={() => openGallery()}>
          <Text>Add Image</Text>
        </TouchableHighlight>
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
});
