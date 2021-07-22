//TODO:
// When the scroll has end
// calculate x value of scroll view
// if it is greater than prev
// increase the index by 1
// make an api to the image end point depending upon index value
// get image width and height
// calculate the height of the child component of scrollview that is on focus
// set the height to the height of scrollview
import React, {FC, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import {Width} from '../Constants/Size';
import {POST_IMAGE} from '../Constants/sample';

type imageProps = {
  image: any;
  setHeight?: (height: number) => void;
};
const ImageView: FC<imageProps> = ({image, setHeight}) => {
  const [ImageAspectRatio, setImageAspectRatio] = useState(0);
  const [PostImageLoading, setPostImageLoading] = useState(true);

  useEffect(() => {
    console.log('View is on Focus');
  }, []);
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
        resizeMode={'contain'}
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
type Props = {
  index: number;
  height: number;
  width: number;
};

const PostCarImageSlider: FC<props> = ({postImages}) => {
  const [ImageHeight, setHeight] = useState<Array<Props>>([]);
  const [isLoading, setisLoading] = useState(true);
  const [scrollWidth, setscrollWidth] = useState(0);
  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const [ScrollViewHeight, setScrollViewHeight] = useState(100);

  // useEffect(() => {
  //   // get the width and height of all the images
  //   // store them in state
  //   postImages.map((image, index) => {
  //     Image.getSize(
  //       image.path,
  //       (width, height) => {
  //         setHeight(prev => {
  //           return [
  //             ...prev,
  //             {
  //               index: index,
  //               height: height,
  //               width: width,
  //             },
  //           ];
  //         });
  //       },
  //       error => {
  //         setHeight(prev => {
  //           return [
  //             ...prev,
  //             {
  //               index: index,
  //               width: Width * 0.001,
  //               height: Width * 0.001,
  //             },
  //           ];
  //         });
  //       },
  //     );
  //   });
  // }, [isLoading, postImages]);

  // const getHeight: any = () => {
  //   console.log('Updating height');
  //   ImageHeight.filter(
  //     (value, index) => index === currentImageIndex && value.height,
  //   );
  // };

  return (
    <View
      onLayout={e => {
        // console.log('Ratio is');
        // console.log(e.nativeEvent.layout.height / e.nativeEvent.layout.width);
        // setHeight(
        //   Width *
        //     (e.nativeEvent.layout.height / e.nativeEvent.layout.width) *
        //     0.9,
        // );
      }}>
      <FlatList
        data={postImages}
        contentContainerStyle={{
          // width: Width * 0.9,
          marginHorizontal: Width * 0.001,
          // backgroundColor: 'transparent',
          // alignContent: 'space-around',
          // alignItems: 'center',
          // width: Width * 0.9,
          height: 500,
          // flex: 0,
          // flexGrow: 1,
        }}
        pagingEnabled
        onScrollEndDrag={e => {
          // const width = e.nativeEvent.contentOffset.x;
          // if (width > scrollWidth) {
          //   setcurrentImageIndex(prev => prev + 1);
          // } else {
          //   setcurrentImageIndex(prev => prev - 1);
          // }
          // setscrollWidth(width);
          // const height = getHeight();
          // setScrollViewHeight(height);
        }}
        horizontal
        keyExtractor={(item, _) => `${item.key * Math.random()}`}
        renderItem={({item, index, separators}) => <ImageView image={item} />}
        // onViewableItemsChanged={onViewRef.current}
      />
      {/* <ScrollView
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
          height: Height,
          // flex: 0,
          // flexGrow: 1,
        }}
        onContentSizeChange={(w, h) => {
          // console.log('Width and height of content is');
          // console.log(w, h);
          // setHeight(h);
        }}
        onScroll={({
          nativeEvent: {
            contentSize,
            layoutMeasurement,
            targetContentOffset,
            contentOffset,
          },
        }) => {
          // console.log(contentSize.width);
          console.log(contentOffset.x);
          // console.log(contentSize.height);
          // setHeight(contentSize.height / contentSize.width);
        }}
        onScrollEndDrag={e => {
          const height = e.nativeEvent.layoutMeasurement.height;
          const width = e.nativeEvent.layoutMeasurement.width;
          console.log('Scrolling has been end');
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
      </ScrollView> */}
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
