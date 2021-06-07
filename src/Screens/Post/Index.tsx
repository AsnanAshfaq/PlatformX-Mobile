import React, {FC, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import PostCard from '../../Components/PostCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
import {postData} from '../../Constants/sample';
import {darkColors} from '../../Constants/Colors';
import axios from '../../../Utils/Axios';

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

      {Post.length > 0 && (
        <ScrollView>
          <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
          {Post.map((post, index) => (
            <PostCard key={post?.id} postDetail={post} />
          ))}
        </ScrollView>
      )}

      {/* floating action button  */}
      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
  floatingButtonContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 30,
    bottom: 10,
    backgroundColor: darkColors.BADGE_COLOR,
  },
});

export default Posts;
