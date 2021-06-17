import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {darkColors} from '../Constants/Colors';
import {Height, Width} from '../Constants/Size';

const PostSkeleton = () => {
  return (
    // <View>
    <SkeletonPlaceholder
      backgroundColor={darkColors.LIGHT_BACKGROUND}
      highlightColor={darkColors.BACKGROUND_COLOR}
      speed={1200}>
      <View
        style={{
          marginHorizontal: 10,
          //   marginVertical: 10,
          flexDirection: 'column',
          //   flex: 1,
          height: 300,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // height: 10,
          }}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{width: Width * 0.8, height: 40, marginVertical: 10}} />
      </View>
    </SkeletonPlaceholder>
    // </View>
  );
};

export default PostSkeleton;

const styles = StyleSheet.create({});
