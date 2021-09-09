import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from '../Utils/Axios';
//@ts-ignore

type props = {
  isShow: boolean;
  toggleModal: () => void;
  type: 'profile' | 'background' | '';
  isImageSet: boolean;
  refresh: any;
  imageID: string | null;
};

const ICON_SIZE = Width * 0.08;

const BottomImageModal: FC<props> = ({
  isShow,
  toggleModal,
  type,
  isImageSet,
  refresh,
  imageID,
}) => {
  const handleOpenGallery = () => {
    //   toggle the modal first
    toggleModal();

    var bodyFormData = new FormData();

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      // make a post api call
      // then reload the student profile
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
      axios({
        method: 'post',
        url: `/user/${
          type === 'profile' ? 'profile_image' : 'background_image'
        }/${isImageSet ? 'edit' : 'create'}/`,
        data: bodyFormData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
        .then(response => {
          ToastAndroid.show(`${response.data.success}`, 1500);
          // refresh the screen
          refresh();
        })
        .catch(error => {
          ToastAndroid.show(`${error.response.data.error}`, 1500);
        });
    });
  };

  const handleRemoveImage = () => {
    //   toggle the modal first
    toggleModal();

    axios({
      method: 'post',
      url: `/user/${
        type === 'profile' ? 'profile_image' : 'background_image'
      }/delete/`,
      data: {
        id: imageID,
      },
    })
      .then(response => {
        ToastAndroid.show(`${response.data.success}`, 1500);
        // refresh the screen
        refresh();
      })
      .catch(error => {
        ToastAndroid.show(`${error.response.data.error}`, 1500);
      });
    // refresh the screen
    refresh();
  };

  const handleViewImage = () => {
    console.log('Handling view image');
    //   toggle the modal first
    toggleModal();
  };

  return (
    <Modal
      isVisible={isShow}
      style={styles.Modalparent}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={300}
      backdropColor={'#575959'}
      backdropOpacity={0.4}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      coverScreen={true}
      useNativeDriver={true}
      swipeDirection={'down'}
      swipeThreshold={200}
      onSwipeComplete={toggleModal}
      // panResponderThreshold={6}
      // scrollOffset={1}
      // scrollOffsetMax={0}
      propagateSwipe={true}
      // onSwipeComplete={params => console.log(params)}
      // onSwipeMove={toggleHeight}
      deviceWidth={Width}
      deviceHeight={Height}
      useNativeDriverForBackdrop={true}>
      <>
        <View style={styles.container}>
          <View style={styles.roundContainer}>
            <View style={styles.iconContainer}>
              <TouchableWithoutFeedback onPress={() => handleOpenGallery()}>
                <Ionicons
                  name={'md-image-outline'}
                  size={ICON_SIZE}
                  color={darkColors.ICON_COLOR}
                  style={styles.icon}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.text}>Open Gallery</Text>
          </View>
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <View style={styles.iconContainer}>
                <TouchableWithoutFeedback onPress={() => handleViewImage()}>
                  <Ionicons
                    name={'person'}
                    size={ICON_SIZE}
                    color={darkColors.ICON_COLOR}
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.text}>View Image</Text>
            </View>
          )}
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <View style={styles.iconContainer}>
                <TouchableWithoutFeedback onPress={() => handleRemoveImage()}>
                  <Ionicons
                    name={'trash'}
                    size={ICON_SIZE}
                    color={darkColors.ICON_COLOR}
                    style={styles.icon}
                  />
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.text}>Remove Image</Text>
            </View>
          )}
        </View>
      </>
    </Modal>
  );
};

export default BottomImageModal;

const styles = StyleSheet.create({
  Modalparent: {
    backgroundColor: darkColors.BACKGROUND_COLOR,
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: Height * 0.83,
    borderColor: 'transparent',
    paddingTop: 5,
    paddingHorizontal: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  container: {
    flexDirection: 'row',
  },
  roundContainer: {
    width: Width * 0.25,
    height: Height * 0.12,
    marginLeft: Width * 0.05,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 15,
    marginVertical: 6,
    padding: 10,
    borderWidth: 2,
    borderColor: darkColors.TAB_BAR_ICON_COLOR,
  },
  icon: {},
  text: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
});
