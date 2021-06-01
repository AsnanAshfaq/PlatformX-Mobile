import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';

type props = {
  navigation: any;
  notification: any;
};

const ICON_SIZE = Width * 0.07;

const RANDOM_PROFILE_IMAGE =
  'https://conservation-innovations.org/wp-content/uploads/2019/09/Dummy-Person.png';

const NotificationCard: FC<props> = ({navigation, notification}) => {
  const [ImageLoading, setImageLoading] = useState(true);
  return (
    <TouchableOpacity>
      <View style={styles.parent}>
        {/* image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: ImageLoading
                ? RANDOM_PROFILE_IMAGE
                : notification.user_image,
            }}
            style={styles.image}
            onLoad={() => setImageLoading(false)}
          />
        </View>
        {/* title container  */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{notification.notification}</Text>
          <Text style={styles.date}>
            {notification.timestamp.toUTCString().substring(0, 17)}
          </Text>
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

export default NotificationCard;

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
  titleContainer: {
    margin: 5,
    flex: 0.7,
    justifyContent: 'space-between',
  },
  title: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
  },
  date: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.75,
  },
  optionContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
