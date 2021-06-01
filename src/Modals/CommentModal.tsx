import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Height, Sizes, Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import {hackathonFilterData} from '../Constants/Sample';

type Props = {
  comments: Array<any>;
};

const Comment: FC<Props> = ({comments}) => {
  return <View>{/* image-username-comment text - comment vote */}</View>;
};

type props = {
  isShow: boolean;
  toggleModal: () => void;
  comments: Array<any>;
};

const PostModal: FC<props> = ({isShow, toggleModal, comments}) => {
  const toggleHeight = (percent, gesture) => {
    console.log(percent);
  };

  return (
    <>
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
        swipeDirection={'right'}
        swipeThreshold={200}
        onSwipeComplete={toggleModal}
        propagateSwipe
        // onSwipeComplete={params => console.log(params)}
        onSwipeMove={toggleHeight}
        deviceWidth={Width}
        deviceHeight={Height}
        useNativeDriverForBackdrop={true}>
        {/* show  comments and shares  */}
        <>
          <View style={[styles.headingContainer, styles.divider]}>
            <Text style={styles.heading}> {comments.length} Comments</Text>
          </View>
          <FlatList
            data={comments}
            style={{flex: 0.8}}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[styles.commentContainer, styles.divider]}
                key={item.id}>
                <View style={styles.commentImageContainer}>
                  <Image
                    style={styles.userImage}
                    source={{uri: item.user_image}}
                  />
                </View>
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
                <View style={styles.commentVoteContainer}></View>
                {/* list of subtags  */}
              </TouchableOpacity>
            )}
          />
          {/* <ScrollView style={styles.scroll} keyboardShouldPersistTaps="handled">
          {comments.map(comment => (
            <TouchableOpacity
              style={[styles.commentContainer, styles.divider]}
              key={comment.id}>
              <View style={styles.commentImageContainer}>
                <Image
                  style={styles.userImage}
                  source={{uri: comment.user_image}}
                />
              </View>
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
              <View style={styles.commentVoteContainer}></View>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

          {/* comment text input container  */}

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
            style={{height: Height * 0.09}}>
            <View style={styles.commentInputContainer}>
              <TextInput
                placeholder={'Write your comment here'}
                style={styles.commentInputField}
                placeholderTextColor={darkColors.TEXT_COLOR}
              />
            </View>
          </KeyboardAvoidingView>
        </>
        {/* </KeyboardAvoidingView> */}
      </Modal>
      {/* // </KeyboardAvoidingView> */}
    </>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    backgroundColor: darkColors.BACKGROUND_COLOR,
    justifyContent: 'flex-end',
    margin: 0,
    marginTop: Height * 0.15,
    borderColor: 'transparent',
    paddingTop: 5,
    paddingHorizontal: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftWidth: 1,
    borderTopWidth: 1,
  },
  headingContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 5,
    paddingHorizontal: 5,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
    color: darkColors.TEXT_COLOR,
  },
  scroll: {
    // marginHorizontal: 20,
    height: Height * 0.6,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: darkColors.SHADOW_COLOR,
  },

  commentContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 5,
  },

  commentImageContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  userImage: {
    height: Width * 0.12,
    width: Width * 0.12,
    borderRadius: 40,
  },
  commentTextContainer: {
    flex: 0.8,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  commentText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },

  commentVoteContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  commentInputContainer: {
    flex: 1,
    backgroundColor: darkColors.SHADOW_COLOR,
    padding: 0,
  },
  commentInputField: {
    margin: 10,
  },
});
export default PostModal;
