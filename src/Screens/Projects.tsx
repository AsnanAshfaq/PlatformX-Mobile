import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import CustomHeader from '../Components/CustomHeader';

type props = {
  navigation: any;
};
const Projects: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Projects'} navigation={navigation} />
      <Text>This is the Project componenet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

export default Projects;
