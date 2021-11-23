import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, ScrollView, Text, View, ToastAndroid} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import Axios from '../../../Utils/Axios';
type props = {
  navigation: any;
  route: any;
};
const ViewTest: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const [loading, setloading] = useState(true);
  const [test, settest] = useState<any>();
  const {ID} = route.params;

  useEffect(() => {
    //   get test of the fyp
    Axios.get(`/api/test/${ID}/`)
      .then(response => {
        settest(response.data);
        console.log(response.data);
        setloading(false);
      })
      .catch(error => {
        setloading(false);
        console.log('Error is', error.response.data);
        if (error.response) {
          ToastAndroid.show(error.response.data.error, 1500);
        }
        return error.response;
      });
  }, [ID]);

  if (loading) {
    <View>
      <Text>Loading</Text>
    </View>;
  }
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        navigation={navigation}
        back
        title={'Problem Statement'}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.scrollContainer}>
          {/* title of the problem  */}
          <View style={styles.nameContainer}>
            <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>
              {test.name}
            </Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={[styles.descriptionText, {color: theme.TEXT_COLOR}]}>
              {test.description}
            </Text>
          </View>
          {/* created at  */}
          <View style={styles.created_atContainer}>
            <Text
              style={[styles.created_atText, {color: theme.DIM_TEXT_COLOR}]}>
              Created at {new Date(test.created_at).toDateString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ViewTest;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  nameContainer: {
    marginVertical: 10,
  },
  nameText: {
    fontSize: Sizes.normal * 1.1,
  },
  descriptionContainer: {
    marginHorizontal: Width * 0.04,
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: Sizes.normal * 0.9,
  },
  created_atContainer: {
    marginVertical: 10,
  },
  created_atText: {},
});
