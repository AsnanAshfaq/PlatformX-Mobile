import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useStateValue} from '../Store/StateProvider';
import CustomButton from './CustomButton';
import CustomHeader from './CustomHeader';
import axios from '../Utils/Axios';
import ListSkeleton from '../Skeleton/ListSkeleton';

type props = {
  navigation: any;
  route: any;
  ID: any;
  screen: 'student' | 'organization';
};
const ViewWorkshop: FC<props> = ({navigation, route, screen, ID}) => {
  const [loading, setLoading] = useState(true);
  const [WorkshopData, setWorkshopData] = useState({});
  const [PosterLoading, setPosterLoading] = useState(true);
  const {theme} = useStateValue()[0];

  useEffect(() => {
    // fetch hackathon data
    axios
      .get(`/api/hackathon/${ID}`)
      .then(result => {
        setWorkshopData(result.data);
        setLoading(false);
      })
      .catch(error => setLoading(false));
  }, [ID]);
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Details'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {!loading && WorkshopData ? (
        <>
          <ScrollView>
            <View></View>
          </ScrollView>

          {screen === 'student' && (
            <CustomButton
              text={'Participate'}
              onPress={() => console.log('Participating screen')}
            />
          )}
        </>
      ) : (
        <ListSkeleton repition={5} />
      )}
    </View>
  );
};

export default ViewWorkshop;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
