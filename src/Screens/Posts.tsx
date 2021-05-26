import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import PostCard from '../Components/PostCard';
import CustomHeader from '../Components/CustomHeader';
import CustomSearch from '../Components/Search';
import {postData} from '../Constants/Sample';
import {darkColors} from '../Constants/Colors';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
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
