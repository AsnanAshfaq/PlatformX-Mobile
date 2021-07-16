import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import {Width} from '../Constants/Size';
import {POST_IMAGE} from '../Constants/sample';

type imageProps = {
  image: any;
  setHeight: (height: number) => void;
};
const ImageView: FC<imageProps> = ({image, setHeight}) => {
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
            width: Width * 0.9,
            height: Width * ImageAspectRatio * 0.9,
          },
        ]}
        resizeMode={'cover'}
        onLoadEnd={() => {
          // get image width and height
          Image.getSize(image.path, (width, heigth) => {
            // calculate aspect ratio of image
            setImageAspectRatio(heigth / width);
            setPostImageLoading(false);
            // set the height which will be the height of the scrollview
            // setHeight(Width * ImageAspectRatio * 0.9);
          });
        }}
        // onProgress={() => setPostImageLoading(true)}
      />
    </View>
  );
};

type props = {
  postImages: any;
};
const PostCarImageSlider: FC<props> = ({postImages}) => {
  const [Height, setHeight] = useState(400);

  useEffect(() => {
    console.log('Height is');
    console.log(Height);
  }, [Height]);
  return (
    <View
      onLayout={e => {
        console.log('Ratio is');
        console.log(e.nativeEvent.layout.height / e.nativeEvent.layout.width);
        // setHeight(
        //   Width *
        //     (e.nativeEvent.layout.height / e.nativeEvent.layout.width) *
        //     0.9,
        // );
      }}>
      <ScrollView
        horizontal
        pagingEnabled
        endFillColor="#000"
        contentContainerStyle={{
          // width: Width * 0.9,
          marginHorizontal: Width * 0.01,
          // backgroundColor: 'transparent',
          // alignContent: 'space-around',
          // alignItems: 'center',
          // width: Width * 0.9,
          // height: Height,
          // flex: 0,
          // flexGrow: 1,
        }}
        onContentSizeChange={(w, h) => {
          // console.log('Width and height of content is');
          // console.log(w, h);
          // setHeight(h);
        }}
        onScroll={({nativeEvent: {contentSize}}) => {
          // console.log(contentSize.width);
          // console.log(contentSize.height);
          // setHeight(contentSize.height / contentSize.width);
        }}
        onScrollEndDrag={e => {
          const height = e.nativeEvent.layoutMeasurement.height;
          const width = e.nativeEvent.layoutMeasurement.width;
          // console.log(height);
          // console.log('Height is');
          // console.log(height);
          // setHeight(Math.random() * 200);
        }}
        showsHorizontalScrollIndicator
        decelerationRate="fast">
        {postImages.map(image => (
          <ImageView image={image} setHeight={setHeight} key={image.id} />
        ))}
      </ScrollView>
    </View>
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
