//TODO:
// Fix this damn thing
import React, {FC, useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {Width} from '../Constants/Size';
import {POST_IMAGE} from '../Constants/sample';

type imageProps = {
  image: any;
};

const ImageView: FC<imageProps> = ({image}) => {
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [PostImageLoading, setPostImageLoading] = useState(true);

  return (
    <View style={styles.postImageContainer} key={image.id}>
      <Image
        source={{
          uri: PostImageLoading ? POST_IMAGE : image.path,
        }}
        style={[
          {
            width: Width * 0.93,
            height: Width * ImageAspectRatio * 0.9,
          },
        ]}
        resizeMode={'contain'}
        onLoadEnd={() => {
          // get image width and height
          Image.getSize(image.path, (width, height) => {
            // calculate aspect ratio of image
            setImageAspectRatio(height / width);
            setPostImageLoading(false);
          });
        }}
      />
    </View>
  );
};

type props = {
  postImages: Array<any>;
};

const PostCarImageSlider: FC<props> = ({postImages}) => {
  const ref = useRef(null);

  return (
    <FlatList
      data={postImages}
      ref={ref}
      // style={{flexGrow: 1}}
      contentContainerStyle={{
        height: 100,
        flexGrow: 1,
      }}
      onContentSizeChange={(w, h) => console.log('Width and height ', w, h)}
      pagingEnabled
      onScrollEndDrag={e => {
        // console.log('Height is', Height);
        // console.log(postImages);
        // ref.current.
      }}
      onScrollBeginDrag={e => {
        // get the height of the child component
      }}
      horizontal
      keyExtractor={(item, _) => `${item.id}`}
      renderItem={({item, index, separators}) => <ImageView image={item} />}
      // onViewableItemsChanged={onViewRef.current}
    />
  );
};

export default PostCarImageSlider;

const styles = StyleSheet.create({
  postImageContainer: {
    // width: Width * 0.961,
    // minHeight: Height * 0.25,
    // maxHeight: Height * 0.3,
    // height: 'auto',
    marginRight: 4,
    // flex: 1,
    // height: Width * (9 / 16),
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
