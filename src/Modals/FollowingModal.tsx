import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Height, Sizes, Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import Axios from '../Utils/Axios';
type unFollow = {
  id: string;
  description: string;
  show: boolean;
};
type props = {
  toggleModal: () => void;
  unFollow: unFollow;
  heading: string;
};
const FilterModal: FC<props> = ({toggleModal, unFollow, heading}) => {
  const unFollowUser = () => {
    console.log('Un following user', unFollow.id);
    // setshowModal(false);
    Axios.post('/user/follower/delete', {
      id: unFollow.id,
    })
      .then(result => {
        ToastAndroid.show(result.data, 1500);
      })
      .then(() => {
        // then toggle the modal
        toggleModal();
      })
      .catch(error => ToastAndroid.show(error, 1500));
  };

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   }}>
    <Modal
      isVisible={unFollow.show}
      style={styles.Modalparent}
      animationIn={'slideInUp'}
      animationInTiming={300}
      animationOut={'slideOutDown'}
      animationOutTiming={200}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        {/* heading container  */}
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{heading} </Text>
        </View>
        {/* description container  */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{unFollow.description} </Text>
        </View>
        {/*  buttons  */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.Button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => unFollowUser()}
            style={styles.Button}>
            <Text style={styles.buttonText}>Unfollow</Text>
          </TouchableOpacity>
        </View>
      </>
    </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    // flex: 1,
    maxHeight: Height * 0.3,
    backgroundColor: darkColors.BACKGROUND_COLOR,
    borderRadius: 20,
    borderWidth: 2,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    // margin: 0,
    // marginTop: Height * 0.28,
    // marginBottom: Height * 0.28,
    marginVertical: Height * 0.3,
  },
  headingContainer: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: Sizes.large * 1.3,
    color: darkColors.TEXT_COLOR,
  },
  descriptionContainer: {
    flex: 0.5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: Sizes.normal,
    color: darkColors.TEXT_COLOR,
  },
  scroll: {
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // backgroundColor: 'grey',
  },

  buttonsContainer: {
    flex: 0.25,
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
  },
  Button: {
    width: Width * 0.35,
    marginHorizontal: 10,
    height: Width * 0.1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.BADGE_COLOR,
    borderRadius: 10,
  },
  buttonText: {
    color: darkColors.BACKGROUND_COLOR,
    fontSize: Sizes.normal,
  },
});
export default FilterModal;
