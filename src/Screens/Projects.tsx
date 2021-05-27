import React, {FC} from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import CustomSearch from '../Components/Search';
import PostCard from '../Components/PostCard';
import {postData} from '../Constants/sample';
import {darkColors} from '../Constants/Colors';

type props = {
  navigation: any;
};
const Project: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'Projects'}
        navigation={navigation}
        drawer
        chat
        bell
      />

      <ScrollView>
        <CustomSearch placeholder={'Search Projects'} />
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

export default Project;
