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
      <CustomHeader title={'Home'} navigation={navigation} />
      <CustomSearch placeholder={'Search here'} />
      <ScrollView>
        {postData.map(post => (
          <PostCard
            key={post.id}
            user_name={post.user_name}
            date={post.date}
            description={post.description}
            image={post.image}
            screen={'Home'}
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

export default Posts;
