import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import CustomHeader from '../Components/CustomHeader';

const Projects = () => {
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Project'} />
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
