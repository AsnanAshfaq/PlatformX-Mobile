import React, {FC, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Width, Height, Sizes} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import {PROFILE_IMAGE, POST_IMAGE} from '../Constants/sample';
import CommentModal from '../Modals/CommentModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
// @ts-ignore
// import {DEVELOPMENT_URL} from '@types/react-native-dotenv';
const MAX_TEXT_LENGTH = 290;

type prop = {
  isEditable: boolean;
};
const PopUpMenu: FC<prop> = ({isEditable}) => {
  return (
    <Menu>
      <MenuTrigger>
        <View>
          <Ionicons
            name={'ellipsis-vertical'}
            size={ICON_SIZE}
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
          />
        </View>
      </MenuTrigger>
      {/* if the post is editable  */}
      {isEditable ? (
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: darkColors.SHADOW_COLOR,
              borderWidth: 1,
              borderRadius: 20,
              width: 120,
              borderColor: 'transparent',
              marginTop: 24,
              marginLeft: -10,
              // marginRight: 30,
            },
            optionWrapper: {
              height: 35,
            },
          }}>
          <MenuOption onSelect={() => console.log('Clicked on edit')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Edit</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => console.log('Clicked on delete')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Delete</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      ) : (
        // else report post
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: darkColors.SHADOW_COLOR,
              borderWidth: 1,
              borderRadius: 20,
              marginRight: 20,
              width: 140,
              marginTop: 24,
              marginLeft: -10,
              borderColor: 'transparent',
            },
            optionWrapper: {
              height: 35,
            },
          }}>
          {/* <MenuOption onSelect={() => console.log('Clicked on edit')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Not Editable</Text>
            </View>
          </MenuOption> */}
          <MenuOption onSelect={() => console.log('Clicked on save post')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Save Post</Text>
            </View>
          </MenuOption>
          <MenuOption onSelect={() => console.log('Clicked on report')}>
            <View style={styles.menuOptionContainer}>
              <Text style={styles.menuOptionText}>Report</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      )}
    </Menu>
  );
};
type Props = {
  setModal: any;
};
const PostCardButtons: FC<Props> = ({setModal}) => {
  return (
    <View style={styles.postButtonContainer}>
      <TouchableOpacity
        onPress={() => console.log('Pressed on like button')}
        style={styles.PostButton}>
        <Text style={styles.PostButtonText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModal({
            focusTextInput: true,
            showModal: true,
          });
          console.log('Clicked on comment');
        }}
        style={styles.PostButton}>
        <Text style={styles.PostButtonText}>Comment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Pressed on share button')}
        style={styles.PostButton}>
        <Text style={styles.PostButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

type props = {
  postDetail: any;
};

const ICON_SIZE = Width * 0.07;

const PostCard: FC<props> = ({postDetail}) => {
  const [Modal, setModal] = useState({
    showModal: false, // show modal or not
    focusTextInput: false, // if true, set auto focus on comment modal text input field to true
  });

  const [ProfileImageLoading, setProfileImageLoading] = useState(true); // user image
  const [PostImageLoading, setPostImageLoading] = useState(true);
  const ImageAspectRatio = useRef(0);

  return (
    <View style={styles.parent}>
      <CommentModal
        isShow={Modal.showModal}
        toggleModal={() =>
          setModal(prev => ({
            ...prev,
            showModal: !prev.showModal,
          }))
        }
        focusTextInput={Modal.focusTextInput}
        postID={postDetail.id}
      />
      {/* header  */}
      <View style={styles.headerContainer}>
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
          <Text style={styles.username}>{postDetail?.user?.username}</Text>
          <Text style={styles.date}>
            {new Date(postDetail.created_at).toDateString()}
          </Text>
        </View>
        {/* icon container  */}
        <View style={styles.headerIconContainer}>
          <PopUpMenu isEditable={postDetail.is_editable} />
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          {postDetail.text.length > MAX_TEXT_LENGTH
            ? postDetail.text.substring(0, MAX_TEXT_LENGTH - 4) +
              '.... read more'
            : postDetail.text}
        </Text>
      </View>
      {/* image if any  */}
      {postDetail.images.length > 0 && (
        <View style={styles.postImageContainer}>
          <Image
            source={{
              uri: PostImageLoading ? POST_IMAGE : postDetail.images[0].path,
            }}
            style={[
              // styles.postImage,
              {
                // flex: 1,
                // width: undefined,
                // height: undefined,
                // aspectRatio: 0.6,
                width: Width * 0.9,
                height: Width * ImageAspectRatio.current,
              },
            ]}
            resizeMode={'contain'}
            onLoadEnd={() => {
              setPostImageLoading(false);
              // get image width and height
              Image.getSize(postDetail.images[0].path, (width, heigth) => {
                // calculate aspect ratio of image
                ImageAspectRatio.current = heigth / width;
                console.log('Aspect ratio is', ImageAspectRatio.current);
              });
            }}
            // onProgress={() => setPostImageLoading(true)}
          />
        </View>
      )}
      {/* like comment share details */}
      <TouchableOpacity
        style={styles.numberContainer}
        onPress={() =>
          setModal({
            focusTextInput: false,
            showModal: true,
          })
        }>
        <View style={styles.likeContainer}>
          <Text style={styles.PostButtonText}>
            {postDetail.likes.length} Likes
          </Text>
        </View>
        <View style={styles.commentConatiner}>
          <Text style={styles.PostButtonText}>
            {postDetail.comments.length} Comment
          </Text>
        </View>
        <View style={styles.sharContainer}>
          {/* <Text style={styles.PostButtonText}>{postDetail.shares} Share</Text> */}
        </View>
      </TouchableOpacity>
      {/* post buttons   */}
      <PostCardButtons setModal={setModal} />
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
    shadowColor: darkColors.SHADOW_COLOR,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  headerContainer: {
    minHeight: Height * 0.08,
    maxHeight: Height * 0.15,
    borderBottomColor: darkColors.SHADOW_COLOR,
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
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large * 0.9,
    fontWeight: 'bold',
  },
  date: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.75,
  },
  headerIconContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  menuOptionContainer: {
    paddingHorizontal: 10,
  },
  menuOptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    // fontFamily: 'Raleway-Medium',
  },
  contentContainer: {
    // minHeight: Height * 0.15,
    maxHeight: Height * 0.2,
    marginVertical: 7,
    // padding: 7,
    paddingHorizontal: 7,
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  postImageContainer: {
    // width: Width * 0.961,
    // minHeight: Height * 0.25,
    // maxHeight: Height * 0.3,
    // height: 'auto',
    marginHorizontal: 0,
    // flex: 1,
    // height: Width * (9 / 16),
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  postImage: {
    // width: Width * 0.7,
    // minHeight: Height * 0.2,
    // maxHeight: Height * 0.4,
    // width: Width * 0.95,
    // flex: 1,
    // aspectRatio: 1,
    width: Width * 0.9,
    minHeight: Height * 0.4,
    maxHeight: Height * 0.6,
    // flex: 1,
    // minHeight: Width,
    // width: '100%',
    // height: 'auto',
    // height: Height * 0.3,
    // aspectRatio: 1,
    // maxHeight: Width,
  },
  numberContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    // borderTopWidth: 2,
    padding: 5,
    paddingVertical: 10,
    borderColor: darkColors.SHADOW_COLOR,
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
    backgroundColor: darkColors.SHADOW_COLOR,
    marginHorizontal: Width * 0.008,
    borderRadius: 10,
  },
  PostButtonText: {
    fontSize: Sizes.small,
    color: darkColors.TEXT_COLOR,
  },
});

export default PostCard;
