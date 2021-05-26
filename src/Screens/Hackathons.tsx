import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import CustomSearch from '../Components/Search';
import {hackathonData} from '../Constants/Sample';
import {darkColors} from '../Constants/Colors';
import HackathonCard from '../Components/HackathonCard';

type props = {
  navigation: any;
};
const Hackathons: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'Hackathons'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      <ScrollView>
        <CustomSearch placeholder={'Search Hackathons'} />
        {hackathonData.map(hackathon => (
          <HackathonCard
            key={hackathon.id}
            user_name={hackathon.user_name}
            date={hackathon.date}
            description={hackathon.description}
            user_image={hackathon.user_image}
            event_type={hackathon.event_type}
            participants={hackathon.participants}
            prize={hackathon.prize}
            thumbnail_image={hackathon.thumbnail_image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
});

export default Hackathons;
