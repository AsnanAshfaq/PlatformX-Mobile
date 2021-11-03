import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {useStateValue} from '../../../Store/StateProvider';

type props = {
  navigation: any;
  route: any;
};
const Result: FC<props> = ({navigation, route}) => {
  const ID = route.params.ID;
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Result'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <FlatList data={[]} renderItem={item => null} />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
