import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';

type props = {
  navigation: any;
  chat: any;
};

//icon size
const ICON_SIZE = Width * 0.07;
//random image

const RANDOM_PROFILE_IMAGE =
  'https://conservation-innovations.org/wp-content/uploads/2019/09/Dummy-Person.png';

const ChatCard: FC<props> = ({navigation, chat}) => {
  const [ImageLoading, setImageLoading] = useState(true);
  return (
    <TouchableOpacity>
      <View style={styles.parent}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: ImageLoading ? RANDOM_PROFILE_IMAGE : chat.user_image,
            }}
            style={styles.image}
            onLoad={() => setImageLoading(false)}
          />
        </View>
        {/* name container  */}
        <View style={styles.nameContainer}>
          <Text style={styles.title}>{chat.user_name}</Text>
          <Text style={styles.desc}>{chat.little_desc}</Text>
        </View>
        <View style={styles.optionContainer}>
          <TouchableOpacity>
            <Ionicons
              name={'ellipsis-vertical'}
              size={ICON_SIZE}
              color={darkColors.TAB_BAR_ACTIVE_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
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
  imageContainer: {
    margin: 2,
    flex: 0.2,
  },
  image: {
    width: Width * 0.14,
    height: Width * 0.14,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: 'transparent',
  },
  nameContainer: {
    margin: 5,
    flex: 0.7,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    fontWeight: 'bold',
  },
  desc: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.8,
  },
  optionContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
