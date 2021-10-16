import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

type cardProps = {
  title: string;
  onPress: () => void;
};
const Card: FC<cardProps> = ({title, onPress}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.CARD_BACKGROUND_COLOR,
        },
      ]}>
      <Text
        style={[
          styles.cardTitle,
          {
            color: theme.TEXT_COLOR,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};
type props = {
  navigation: any;
};

const Activities: FC<props> = ({navigation}) => {
  const [state, dispatch] = useStateValue();

  const activities = [
    {
      id: 1,
      title: 'Hackahtons',
      onPress: () => console.log('Pressed on hackathon '),
    },
    {
      id: 2,
      title: 'Workshops',
      onPress: () => console.log('Pressed on workshops '),
    },
    {
      id: 1,
      title: 'Inernships',
      onPress: () => console.log('Pressed on internships '),
    },
    {
      id: 1,
      title: 'Projects',
      onPress: () => console.log('Pressed on projects '),
    },
  ];
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'My Activities'}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* list of hackathons, workshops, internship, projects which user has applied to */}

      {/* card  */}

      {activities.map(item => {
        return <Card title={item.title} key={item.id} onPress={item.onPress} />;
      })}
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  card: {
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    // minHeight: Height * 0.35,
    // maxHeight: Height * 0.4,
    borderRadius: 10,
    // padding: 5,
    shadowOpacity: 1,
    padding: 10,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 5,
  },
  cardTitle: {
    fontSize: Sizes.normal,
  },
});
