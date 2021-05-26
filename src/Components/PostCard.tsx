import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Width, Height, Sizes} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import PostModal from '../Modals/PostModel';

const MAX_TEXT_LENGTH = 300;

const PostCardButtons: FC = () => {
  return (
    <View style={styles.postButtonContainer}>
      <TouchableOpacity
        onPress={() => console.log('Pressed on like button')}
        style={styles.PostButton}>
        <Text style={styles.PostButtonText}>Like</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Pressed on comment button')}
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

const PostCard: FC<props> = ({postDetail}) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <View style={styles.parent}>
      <PostModal
        isShow={isModalOpen}
        toggleModal={() => setisModalOpen(!isModalOpen)}
        comments={postDetail.comments}
      />
      {/* header  */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image source={{uri: postDetail.image}} style={styles.userImage} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>{postDetail.user_name}</Text>
          <Text style={styles.date}>
            {postDetail.date.toUTCString().substring(0, 17)}
          </Text>
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          {postDetail.description.length > MAX_TEXT_LENGTH
            ? postDetail.description.substring(0, MAX_TEXT_LENGTH - 4) +
              '.... read more'
            : postDetail.description}
        </Text>
      </View>
      {/* image if any  */}
      {postDetail.images && (
        <View style={styles.imageContainer}>
          <Image
            source={{uri: postDetail.images}}
            style={styles.postImage}
            resizeMode={'center'}
          />
        </View>
      )}
      {/* like comment share details */}
      <TouchableOpacity
        style={styles.numberContainer}
        onPress={() => setisModalOpen(true)}>
        <View style={styles.likeContainer}>
          <Text style={styles.PostButtonText}>{postDetail.likes} Likes</Text>
        </View>
        <View style={styles.commentConatiner}>
          <Text style={styles.PostButtonText}>
            {postDetail.comments.length} Comment
          </Text>
        </View>
        <View style={styles.sharContainer}>
          <Text style={styles.PostButtonText}>{postDetail.shares} Share</Text>
        </View>
      </TouchableOpacity>
      {/* post buttons   */}
      <PostCardButtons />
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
    padding: 10,
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
  },
  headerImageContainer: {
    // width: Width * 0.3,
    flex: 2,
  },
  userImage: {
    height: Height * 0.07,
    width: Width * 0.14,
    borderRadius: 40,
  },
  headerTextContainer: {
    // width: Width * 0.6,
    flex: 8,
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
  contentContainer: {
    // minHeight: Height * 0.15,
    maxHeight: Height * 0.2,
    paddingHorizontal: 5,
    marginVertical: 7,
  },
  descriptionText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  imageContainer: {
    width: Width * 0.9,
    minHeight: Height * 0.15,
    maxHeight: Height * 0.2,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postImage: {
    width: Width * 0.7,
    height: Height * 0.2,
  },
  numberContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    // borderTopWidth: 2,
    paddingVertical: 6,
    borderColor: darkColors.SHADOW_COLOR,
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
    minHeight: Height * 0.05,
    maxHeight: Height * 0.07,
    flexDirection: 'row',
    marginVertical: Height * 0.009,
  },
  PostButton: {
    flex: 1,
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
