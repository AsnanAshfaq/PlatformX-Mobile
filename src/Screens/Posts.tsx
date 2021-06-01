import React, {FC, useEffect} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import PostCard from '../Components/PostCard';
import CustomHeader from '../Components/CustomHeader';
import CustomSearch from '../Components/Search';
import {postData} from '../Constants/sample';
import {darkColors} from '../Constants/Colors';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetch('http://127.0.0.1:8000/api/post/');
        const result = await data.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Home'} navigation={navigation} drawer chat bell />

      <ScrollView>
        <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
        {postData.map(post => (
          <PostCard key={post.id} postDetail={post} />
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

export default Posts;
