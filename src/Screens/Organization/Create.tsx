import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  navigation: any;
};

type cardProps = {
  title: string;
  description: string;
};

const ICON_SIZE = Width * 0.07;

const Card: FC<cardProps> = ({title, description}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.cardContainer,
        {backgroundColor: theme.CARD_BACKGROUND_COLOR},
      ]}>
      <View
        style={[
          styles.cardTitleContainer,
          {backgroundColor: theme.SCREEN_BACKGROUND_COLOR},
        ]}>
        <Text style={[styles.cardTitleText, {color: theme.TEXT_COLOR}]}>
          {title}
        </Text>
      </View>
      <View style={[styles.cardDescriptionContainer, {}]}>
        <Text style={[styles.cardDescText, {color: theme.TEXT_COLOR}]}>
          {description}
        </Text>
      </View>
      <View style={[styles.buttonContainer]}>
        <Ionicons
          name={'arrow-redo-circle-sharp'}
          size={ICON_SIZE * 1.5}
          color={theme.BUTTON_BACKGROUND_COLOR}
        />
      </View>
    </View>
  );
};
const Create: FC<props> = ({navigation}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[styles.parent, {backgroundColor: theme.SCREEN_BACKGROUND_COLOR}]}>
      <CustomHeader title={'Create'} navigation={navigation} drawer bell />
      <Card
        title={'Hackathon'}
        description={`Hackathons are taking over the world! Make yours run better and show the world what gets made at your event.${'\n'}START HOSTING YOUR HACKATHON NOW !!!`}
      />
      <Card title={'Workshop'} description={'Host Workshops'} />
      <Card title={'Project'} description={'Host Projects'} />
      <Card title={'Internship'} description={'Host Internships'} />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  cardContainer: {
    marginHorizontal: Width * 0.06,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'transparent',
    flex: 1,
  },
  cardTitleContainer: {
    // minWidth: Width * 0.21,
    // maxWidth: Width * 0.4,
    width: Width * 0.3,
    // flexGrow: 1,
    // flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRightWidth: 1,
    // borderTopRightRadius: 10,
    borderBottomRightRadius: 15,
    borderColor: 'transparent',
  },
  cardTitleText: {
    fontSize: Sizes.normal * 1.3,
  },

  cardDescriptionContainer: {
    flex: 1,
    marginRight: 20,
    marginLeft: 18,
    marginVertical: 5,
  },
  cardDescText: {
    fontSize: Sizes.normal * 0.83,
    lineHeight: 20,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'flex-end',
    position: 'absolute',
    right: -(Width * 0.053),
    top: Height * 0.06,
  },
});
export default Create;
