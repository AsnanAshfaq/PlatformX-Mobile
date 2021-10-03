import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../../Constants/Colors';
import {Sizes, Width} from '../../Constants/Size';
import {PROFILE_IMAGE} from '../../Constants/sample';
import {useStateValue} from '../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

type props = {
  navigation: any;
  chat: any;
  onPress: (e: any) => void;
};

const MAX_TEXT_LENGTH = Width * 0.09;

//icon size
const ICON_SIZE = Width * 0.07;

const ChatCard: FC<props> = ({navigation, chat, onPress}) => {
  const [ImageLoading, setImageLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.parent,
          {
            shadowColor: state.theme.SHADOW_COLOR,
            backgroundColor: state.theme.LIGHT_BACKGROUND,
          },
        ]}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: ImageLoading
                ? PROFILE_IMAGE
                : BASE_URL + chat.user.profile_image.path,
            }}
            style={styles.image}
            onLoad={() => setImageLoading(false)}
          />
        </View>
        {/* name container  */}
        <View style={styles.messageContainer}>
          <Text style={[styles.title, {color: state.theme.TEXT_COLOR}]}>
            {chat.user.username}
          </Text>
          <Text style={[styles.desc, {color: state.theme.TEXT_COLOR}]}>
            {chat.message.message.length > MAX_TEXT_LENGTH
              ? chat.message.message.substring(0, MAX_TEXT_LENGTH - 4) + '....'
              : chat.message.message}
          </Text>
        </View>
        <View style={styles.sideContainer}>
          <View style={styles.optionContainer}>
            <TouchableOpacity>
              <Ionicons
                name={'ellipsis-vertical'}
                size={ICON_SIZE}
                color={darkColors.TAB_BAR_ACTIVE_COLOR}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dateContainer}>
            <Text style={[styles.dateText, {color: state.theme.TEXT_COLOR}]}>
              {new Date(chat.message.created_at).toDateString().slice(0, 10)}
            </Text>
          </View>
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
  messageContainer: {
    marginVertical: 5,
    flex: 0.6,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  title: {
    fontSize: Sizes.normal * 1.3,
    // fontWeight: 'bold',
  },
  desc: {
    fontSize: Sizes.normal * 0.8,
  },
  sideContainer: {
    flex: 0.2,
    flexDirection: 'column',
  },
  optionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: Sizes.small * 0.8,
  },
});
