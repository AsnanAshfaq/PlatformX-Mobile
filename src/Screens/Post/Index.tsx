import React, {FC, useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import PostCard from '../../Components/PostCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomSearch from '../../Components/Search';
import {postData} from '../../Constants/sample';
import {darkColors} from '../../Constants/Colors';
import axios from '../../Utils/Axios';
import {Sizes} from '../../Constants/Size';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';

type props = {
  navigation: any;
};
const Posts: FC<props> = ({navigation}) => {
  const [Post, setPost] = useState([]);
  const isFocuses = useIsFocused();
  const [Refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('is focues', isFocuses);
      // getData();
    }, []),
  );
  const getData = async () => {
    try {
      axios.get('/api/post/').then(response => {
        console.log('Response object is');
        console.log(response.data);
        setPost(response.data);
      });
    } catch (error) {
      console.log('Error is', error);
    }
  };

  const onRefresh = () => {
    console.log('Refreshing');
    getData().then(() => {
      // console.log(Post);
      setRefreshing(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.parent}>
      <CustomHeader title={'Home'} navigation={navigation} drawer chat bell />
      <CustomSearch placeholder={'Search here'} showFilterIcon={false} />
      {Post.length > 0 && (
        <>
          <FlatList
            data={Post}
            // disableVirtualization
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({item: Post, index}: any) => {
              return <PostCard key={Post?.id} postDetail={Post} />;
            }}
            // progressViewOffset={10}
            refreshControl={
              <RefreshControl
                refreshing={Refreshing}
                onRefresh={onRefresh}
                colors={[darkColors.TEXT_COLOR]}
                progressBackgroundColor={darkColors.SHADOW_COLOR}
                progressViewOffset={20}
                size={Sizes.large}
              />
            }
            // contentOffset={{y: -300, x: 0}}
          />
          {/* floating action button  */}
          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Create_Post')}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 30,
    bottom: 20,
    right: 5,
    borderColor: 'transparent',
    backgroundColor: darkColors.TOMATO_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: Sizes.large * 1.4,
    color: darkColors.TEXT_COLOR,
  },
});

export default Posts;
