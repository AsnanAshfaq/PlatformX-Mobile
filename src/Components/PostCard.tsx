import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Width, Height, Sizes} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';

const MAX_TEXT_LENGTH = 300;

const PostCardButtons: FC = () => {
  return (
    <View style={styles.buttonContainer}>
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
  image: string;
  user_name: string;
  date: Date;
  description: string;
  screen: 'Home' | 'Hackathons' | 'Workshops' | 'Projects';
  title?: string;
};

const PostCard: FC<props> = ({image, date, user_name, description, screen}) => {
  return (
    <View style={styles.parent}>
      {/* header  */}
      <View style={styles.headerContainer}>
        <View style={styles.headerImageContainer}>
          <Image source={{uri: image}} style={styles.userImage} />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.username}>{user_name}</Text>
          <Text style={styles.date}>{date.toUTCString().substring(0, 17)}</Text>
        </View>
      </View>
      {/* content  */}
      <View style={styles.contentContainer}>
        <Text style={styles.descriptionText}>
          {description.length > MAX_TEXT_LENGTH
            ? description.substring(0, MAX_TEXT_LENGTH - 4) + '.... read more'
            : description}
        </Text>
      </View>

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
    maxHeight: Height * 0.4,
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
  buttonContainer: {
    minHeight: Height * 0.07,
    maxHeight: Height * 0.05,
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

// 30 = 8 + 15 + 7
// 40 = 15 + 20 + 5
