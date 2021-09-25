import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {useStateValue} from '../Store/StateProvider';

const SearchSkeleton = () => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <ContentLoader
      height={50}
      width={350}
      viewBox="0 0 350 30"
      backgroundColor={theme.SHADOW_COLOR}
      foregroundColor={'grey'}
      interval={0.2}
      style={{marginVertical: 10}}
      speed={1}>
      <Rect x="40" y="0" rx="0" ry="0" width="350" height="50" />
    </ContentLoader>
  );
};

export default SearchSkeleton;

const styles = StyleSheet.create({});
