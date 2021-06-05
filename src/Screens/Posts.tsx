import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  FlatList,
} from 'react-native';
import PostCard from '../Components/PostCard';
import CustomHeader from '../Components/CustomHeader';
import CustomSearch from '../Components/Search';
import {postData} from '../Constants/sample';
import {darkColors} from '../Constants/Colors';
import axios from '../../Utils/Axios';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  const [Post, setPost] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        axios.get('/api/post/').then(response => {
          setPost(response.data);
          console.log('Data is ');
          console.log(response.data);
        });
      } catch (error) {
        console.log('Error is', error);
      }
    };
    getData();
  }, []);
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Home'} navigation={navigation} drawer chat bell />
      {/* {Post.length > 0 && (
        <View style={{flex: 1}}>
          <FlatList
            // style={{flex: 1}}
            data={Post}
            renderItem={({item, index, sepeator}) => (
              <PostCard key={index} postDetail={item} />
            )}
          />
        </View>
      )} */}
      {Post.length > 0 && (
        <ScrollView>
          <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
          {Post.map((post, index) => (
            <PostCard key={post?.id} postDetail={post} />
          ))}
        </ScrollView>
      )}
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
