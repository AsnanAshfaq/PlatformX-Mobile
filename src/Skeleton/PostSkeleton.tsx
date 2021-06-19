import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

import {darkColors} from '../Constants/Colors';
import {Height, Width} from '../Constants/Size';

const Skeleton = () => {
  return (
    <ContentLoader
      height={350}
      viewBox="0 0 380 350"
      backgroundColor={darkColors.SHADOW_COLOR}
      foregroundColor={'white'}
      interval={0.2}
      speed={1}>
      <Circle cx="40" cy="30" r="30" />
      <Rect x="80" y="17" rx="4" ry="4" width="250" height="13" />
      <Rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
      <Rect x="20" y="80" rx="3" ry="3" width="340" height="200" />
      <Rect x="20" y="290" rx="3" ry="3" width="340" height="45" />
    </ContentLoader>
  );
};

const PostSkeleton = () => {
  return (
    <ScrollView>
      <>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </>
    </ScrollView>
  );
};

export default PostSkeleton;
const styles = StyleSheet.create({});
