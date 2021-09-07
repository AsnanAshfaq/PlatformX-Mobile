import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {darkColors} from '../Constants/Colors';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

type props = {
  isShow: boolean;
  toggleModal: () => void;
  type: 'profile' | 'background' | '';
  isImageSet: boolean;
};

const ICON_SIZE = Width * 0.08;

const BottomImageModal: FC<props> = ({
  isShow,
  toggleModal,
  type,
  isImageSet,
}) => {
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
            <Ionicons
              name={'md-image-outline'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
              // style={styles.iconPadding}
            />
            <Text style={styles.text}>Open Gallery</Text>
          </View>
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <Ionicons
                name={'person'}
                size={ICON_SIZE}
                color={darkColors.TAB_BAR_ACTIVE_COLOR}
                // style={styles.iconPadding}
              />
              <Text style={styles.text}>View Image</Text>
            </View>
          )}
          {isImageSet !== false && (
            <View style={styles.roundContainer}>
              <Ionicons
                name={'trash'}
                size={ICON_SIZE}
                color={darkColors.TAB_BAR_ACTIVE_COLOR}
                // style={styles.iconPadding}
              />
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
    marginLeft: 20,
    marginVertical: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  text: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
});
