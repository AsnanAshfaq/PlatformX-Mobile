import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

import {darkColors} from '../Constants/Colors';
import {Height, Width} from '../Constants/Size';

const SearchSkeleton = () => {
  return (
    <ContentLoader
      height={50}
      width={350}
      viewBox="0 10 350 30"
      backgroundColor={darkColors.SHADOW_COLOR}
      foregroundColor={'grey'}
      interval={0.2}
      style={{marginVertical: 10}}
      speed={1}>
      <Rect x="10" y="0" rx="0" ry="0" width="350" height="50" />
    </ContentLoader>
  );
};

export default SearchSkeleton;

const styles = StyleSheet.create({});
