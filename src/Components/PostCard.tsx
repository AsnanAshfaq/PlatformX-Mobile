import React, {FC, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Width, Height, Sizes} from '../Constants/Size';
// import {darkColors} from '../Constants/Colors';
import {PROFILE_IMAGE, POST_IMAGE} from '../Constants/sample';
import CommentModal from '../Modals/CommentModal';
import DeleteModal from '../Modals/DeleteModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import PopUpMenu from '../Menu/PostCardPopUpMenu';
import Axios from '../Utils/Axios';
import PostCarImageSlider from './PostCardImageSlider';
//@ts-ignore
import {BASE_ADDRESS} from 'react-native-dotenv';
import {useStateValue} from '../Store/StateProvider';
import ShareModal from '../Modals/ShareModal';

const MAX_TEXT_LENGTH = 290;

const ICON_SIZE = Width * 0.07;

type Props = {
  setCommentModal: any;
  setShareModal: any;
  isLiked: string;
  handleLike: () => void;
};

const PostCardButtons: FC<Props> = ({
  setCommentModal,
  setShareModal,
  isLiked,
  handleLike,
}) => {
  const [state, dispatch] = useStateValue();

  return (
    <View style={styles.postButtonContainer}>
      <TouchableOpacity
        onPress={() => handleLike()}
        style={[
          styles.PostButton,
          {
            backgroundColor:
              isLiked === 'Liked'
                ? state.theme.SCREEN_BACKGROUND_COLOR
                : state.theme.SHADOW_COLOR,
          },
        ]}>
        <Text
          style={[
            styles.PostButtonText,
            {
              color: state.theme.TEXT_COLOR,
            },
          ]}>
          {isLiked === 'Liked' ? 'Liked' : 'Like'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setCommentModal({
            focusTextInput: true,
            showModal: true,
          });
        }}
        style={[
          styles.PostButton,
          {
            backgroundColor: state.theme.SHADOW_COLOR,
          },
        ]}>
        <Text
          style={[
            styles.PostButtonText,
            {
              color: state.theme.TEXT_COLOR,
            },
          ]}>
          Comment
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setShareModal(true)}
        style={[
          styles.PostButton,
          {
            backgroundColor: state.theme.SHADOW_COLOR,
          },
        ]}>
        <Text
          style={[
            styles.PostButtonText,
            {
              color: state.theme.TEXT_COLOR,
            },
          ]}>
          Share
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type props = {
  navigation: any;
  postDetail: any;
};

const PostCard: FC<props> = ({navigation, postDetail}) => {
  const [Commentmodal, setCommentmodal] = useState({
    showModal: false, // show modal or not
    focusTextInput: false, // if true, set auto focus on comment modal text input field to true
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // user image
  const [shareModal, setShareModal] = useState(false);
  const [Like, setLike] = useState<{
    isLiked: string;
    likeCount: number;
  }>({
    isLiked: postDetail.isLiked, // either '' or 'Liked'
    likeCount: postDetail.likes.length,
  });

  const [state, dispatch] = useStateValue();

  const {theme} = state;

  const handleDelete = () => {
    // hide the modal first
    setDeleteModal(false);

    Axios({
      method: 'post',
      url: `${BASE_URL}/api/post/delete/`,
      data: {
        post: postDetail.id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          ToastAndroid.show(response.data.success, 1500);
        } else {
          ToastAndroid.show(response.data.error, 1500);
        }
      })
      .catch(error => ToastAndroid.show(error, 1500));
  };

  const handleLike = () => {
    // make connection first

    const socket = new WebSocket(
      `ws://${BASE_ADDRESS}/ws/like/${postDetail.id}/${state.user.userName}/`,
    );

    socket.onopen = function () {
      console.log('Opening post like socket connection');
      socket.send('Like');
    };

    socket.onmessage = function (e) {
      const response = JSON.parse(e.data);

      const likeCount = Number.parseInt(response.likeCount);

      response.likeCount = likeCount;

      setLike(response);
      // change the like state
      socket.close = function () {
        console.log('Connection has been closed ');
      };
    };
  };

  const handleShare = () => {
    // hide the modal first
    setShareModal(false);
    // make api call

    Axios({
      method: 'post',
      url: `${BASE_URL}/api/post/share/create/`,
      data: {
        post: postDetail.id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        if (result.status === 201) {
          ToastAndroid.show(result.data.success, 1500);
        } else {
          ToastAndroid.show(result.data.error, 1500);
        }
      })
      .catch(error => {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return Promise.reject();
      });
  };

  return (
    <View
      style={[
        styles.parent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.LIGHT_BACKGROUND,
        },
      ]}>
      {/* comment modal  */}
      <CommentModal
        isShow={Commentmodal.showModal}
        toggleModal={() =>
          setCommentmodal(prev => ({
            ...prev,
            showModal: !prev.showModal,
          }))
        }
        focusTextInput={Commentmodal.focusTextInput}
        postID={postDetail.id}
      />

      {/* delete modal  */}
      <DeleteModal
        heading="Delete Post"
        description={'Are you sure that you want to delete your post?'}
        isShow={deleteModal}
        toggleModal={() => setDeleteModal(prev => !prev)}
        onDelete={handleDelete}
      />

      {/* share modal  */}

      <ShareModal
        isShow={shareModal}
        toggleModal={() => {
          setShareModal(prev => !prev);
        }}
        onShare={handleShare}
        heading={'Sharing Post'}
        description={`Do you want to share @${postDetail?.user?.username} post on your profile?`}
      />

      {/* header  */}
      <View
        style={[
          styles.headerContainer,
          {borderBottomColor: theme.SHADOW_COLOR},
        ]}>
        <View style={styles.headerImageContainer}>
          <Image
            source={{
              uri: ProfileImageLoading
                ? PROFILE_IMAGE
                : postDetail?.user?.user_profile_image
                ? postDetail?.user?.user_profile_image?.path
                : PROFILE_IMAGE,
            }}
            style={styles.userImage}
            onLoadEnd={() => setProfileImageLoading(false)}
            // onProgress={() => setPostImageLoading(true)}
          />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={[styles.username, {color: theme.TEXT_COLOR}]}>
            {postDetail?.user?.username}
          </Text>
          <Text style={[styles.date, {color: theme.TEXT_COLOR}]}>
            {new Date(postDetail.created_at).toDateString()}
          </Text>
        </View>

        {/* icon container  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu
            isEditable={postDetail.is_editable}
            deleteModal={postDetail.is_editable && setDeleteModal}
            post={postDetail.is_editable && postDetail}
            navigation={navigation}
          />
        </View>
      </View>

      {/* content  */}
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.descriptionText,
            {
              color: theme.TEXT_COLOR,
            },
          ]}>
          {postDetail.text.length > MAX_TEXT_LENGTH
            ? postDetail.text.substring(0, MAX_TEXT_LENGTH - 4) +
              '.... read more'
            : postDetail.text}
        </Text>
      </View>

      {/* image if any  */}
      {postDetail.images.length > 0 && (
        <PostCarImageSlider postImages={postDetail.images} />
      )}
      {/* like comment share details */}
      <TouchableOpacity
        style={[styles.numberContainer, {borderColor: theme.SHADOW_COLOR}]}
        onPress={() =>
          setCommentmodal({
            focusTextInput: false,
            showModal: true,
          })
        }>
        <View style={styles.likeContainer}>
          <Text
            style={[
              styles.PostButtonText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {Like.likeCount} Likes
          </Text>
        </View>

        <View style={styles.commentConatiner}>
          <Text
            style={[
              styles.PostButtonText,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {postDetail.comments.length} Comments
          </Text>
        </View>

        <View style={styles.sharContainer}>
          {/* <Text style={styles.PostButtonText}>{postDetail.shares} Share</Text> */}
        </View>
      </TouchableOpacity>
      {/* post buttons   */}
      <PostCardButtons
        setCommentModal={setCommentmodal}
        setShareModal={setShareModal}
        handleLike={handleLike}
        isLiked={Like.isLiked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 20,
    // padding: 5,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    borderBottomWidth: 2,
    flexDirection: 'row',
    padding: 7,
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 0.2,
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 0.7,
    flexDirection: 'column',
  },
  username: {
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    fontSize: Sizes.normal * 0.75,
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  contentContainer: {
    // minHeight: Height * 0.15,
    maxHeight: Height * 0.2,
    marginVertical: 7,
    // padding: 7,
    paddingHorizontal: 7,
  },
  descriptionText: {
    fontSize: Sizes.normal,
  },
  postImageContainer: {
    marginRight: 4,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  postImage: {
    width: Width * 0.9,
    minHeight: Height * 0.4,
    maxHeight: Height * 0.6,
  },
  numberContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    // borderTopWidth: 2,
    padding: 5,
    paddingVertical: 10,
    // marginTop: 10,
  },
  likeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postButtonContainer: {
    // height: Height * 0.06,
    flexDirection: 'row',
    marginVertical: Height * 0.009,
    padding: 5,
  },
  PostButton: {
    flex: 1,
    padding: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  PostButtonText: {
    fontSize: Sizes.small,
  },
});

export default PostCard;
