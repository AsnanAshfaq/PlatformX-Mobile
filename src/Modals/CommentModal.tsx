import React, {FC, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Height, Sizes, Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import {PROFILE_IMAGE} from '../Constants/sample';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../Utils/Axios';
import {BASE_URL} from 'react-native-dotenv';

type Props = {
  comment: any;
  index: number;
};

const CommentView: FC<Props> = ({comment, index}) => {
  const [ImageLoading, setImageLoading] = useState(true);
  return (
    <View style={[styles.commentContainer, styles.divider]} key={comment.id}>
      <View style={styles.commentImageContainer}>
        <Image
          source={{
            uri: ImageLoading
              ? PROFILE_IMAGE
              : BASE_URL + comment.user.user_profile_image.path,
          }}
          style={styles.userImage}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>
      <View style={styles.commentTextContainer}>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
      <TouchableOpacity
        style={styles.commentVoteContainer}
        onPress={() => console.log('Pressed on vote')}>
        {/* up and down arrows  */}
        <Ionicons
          name={'arrow-down-outline'}
          size={ICON_SIZE * 0.85}
          color={darkColors.GREEN_COLOR}
        />
        <Ionicons
          name={'arrow-up-outline'}
          size={ICON_SIZE * 0.85}
          color={darkColors.RED_COLOR}
        />
      </TouchableOpacity>
    </View>
  );
};

type props = {
  isShow: boolean;
  toggleModal: () => void;
  postID: any;
  focusTextInput: boolean;
};

const ICON_SIZE = Width * 0.07;

const CommentModal: FC<props> = ({
  isShow,
  toggleModal,
  postID,
  focusTextInput,
}) => {
  const [Comment, setComment] = useState([]);
  const [Input, setInput] = useState('');
  const textInput = useRef(null);
  const [isCommentPosted, setisCommentPosted] = useState(false);

  const postComment = () => {
    console.log('Input is ', Input);
    if (Input.trim() !== '') {
      setInput('');
      // Keyboard.addListener('keyboardDidHide', e => {
      //   if (textInput.current) {
      //     textInput?.current?.blur();
      //   }
      // });

      // post the comment
      axios
        .post('/api/post/comment/create', {
          post: postID,
          text: Input,
        })
        .then(() => {
          // set the comment posted state to true
          // to re-run the component
          // and fetch newly added comment
          setisCommentPosted(true);
        })
        .catch(error => ToastAndroid.show(error, 1500));
    } else {
      ToastAndroid.show('Comment is empty', 1500);
    }
  };

  useEffect(() => {
    // get all the comments of a post
    setisCommentPosted(false);
    console.log('Use Effect');
    if (!isCommentPosted) {
      axios
        .get(`/api/post/${postID}/comment/`)
        .then(response => {
          setComment(response.data);
        })
        .catch(error => console.log(error));
    }
    // if (textInput && textInput.current) textInput.current.onFocus();
  }, [isCommentPosted]);

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
        {Comment.length > 0 ? (
          <>
            {/* <View style={{flex: 1}}> */}
            {/* <ScrollView>
              <View onStartShouldSetResponder={() => true}> */}
            <View style={[styles.headingContainer, styles.divider]}>
              <Text style={styles.heading}> {Comment.length} Comments</Text>
            </View>
            {/* <ScrollView onScroll={event => console.log(event)}> */}
            <FlatList
              data={Comment}
              // style={{flex: 0.8}}
              keyExtractor={(item, index) => `${index}`}
              keyboardShouldPersistTaps="always"
              renderItem={({item, index}) => (
                <CommentView comment={item} index={index} key={item.id} />
              )}
              // onEndReached={() => console.log('End of list')}
            />
            {/* </ScrollView> */}
            {/* </View>
            </ScrollView> */}
            {/* </View> */}
          </>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.commentText}>No Comments yet </Text>
          </View>
        )}

        {/* comment text input container  */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          // enabled
          style={styles.keyboardAvoidingView}>
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder={'Write your comment here'}
              style={styles.commentInputField}
              ref={textInput}
              placeholderTextColor={darkColors.TEXT_COLOR}
              value={Input.trim() === '' ? '' : Input}
              onChangeText={setInput}
              // onFocus={e => console.log('on focus')}
              // onBlur={e => console.log('on blur')}
              multiline
              autoFocus={true}
              scrollEnabled
              showSoftInputOnFocus={focusTextInput ? true : false}
            />
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => postComment()}>
                <Ionicons
                  name={'send-outline'}
                  size={ICON_SIZE}
                  color={darkColors.TOMATO_COLOR}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    </Modal>
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
    paddingVertical: 10,
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  keyboardAvoidingView: {
    minHeight: Height * 0.09,
    maxHeight: Height * 0.15,
  },
  commentInputContainer: {
    minHeight: Height * 0.09,
    maxHeight: Height * 0.15,
    backgroundColor: darkColors.SHADOW_COLOR,
    flexDirection: 'row',
    padding: 0,
  },
  commentInputField: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    flex: 0.9,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: darkColors.TOMATO_COLOR,
    color: darkColors.TEXT_COLOR,
  },
  iconContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // marginHorizontal: 5,
  },
});
export default CommentModal;
