import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';

type props = {
  ID: string;
};
const ViewResult: FC<props> = ({ID}) => {
  const {theme} = useStateValue()[0];

  return (
    <View style={{flex: 1}}>
      <View style={[styles.container, styles.center]}>
        <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>WINNERS</Text>
      </View>

      {/* card  */}
      <View style={[{flexDirection: 'row', marginVertical: 20}]}>
        {/* 3rd position  */}
        <View
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.011,
              borderLeftWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.29,
            },
          ]}>
          <Text
            style={[
              {color: theme.TEXT_COLOR, flexShrink: 1, fontSize: Sizes.normal},
            ]}>
            3rd
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={styles.projectImage}
          />
          <Text
            style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal * 0.8}]}>
            Face Recognition Face Recognition
          </Text>
        </View>
        {/* 1st position  */}
        <View
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              //   padding: 20,
              paddingVertical: 20,
              position: 'absolute',
              marginLeft: Width * 0.295,
              borderWidth: 1,
              borderRadius: 10,
              width: Width * 0.41,
            },
          ]}>
          <Text
            style={[{fontSize: Sizes.normal * 1.4, color: theme.TEXT_COLOR}]}>
            1st
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={styles.projectImage}
          />
          <Text style={[{fontSize: Sizes.normal, color: theme.TEXT_COLOR}]}>
            Face Recognition Face Recognition
          </Text>
        </View>
        {/* 2nd position  */}
        <View
          style={[
            styles.card,
            styles.center,
            {
              borderColor: theme.CARD_BACKGROUND_COLOR,
              padding: 7,
              position: 'absolute',
              marginTop: 10,
              marginLeft: Width * 0.7,
              borderRightWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 10,
              borderTopWidth: 1,
              width: Width * 0.3,
            },
          ]}>
          <Text style={[{color: theme.TEXT_COLOR, fontSize: Sizes.normal}]}>
            2nd
          </Text>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1572177812156-58036aae439c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={styles.projectImage}
          />
          <Text
            style={[
              {
                color: theme.TEXT_COLOR,
                fontSize: Sizes.normal * 0.8,
              },
            ]}>
            Face Recognition Face Recognition
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewResult;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    fontSize: Sizes.normal * 1.2,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  projectImage: {
    borderRadius: 40,
    width: Width * 0.15,
    height: Width * 0.15,
  },
  card: {
    // marginHorizontal: 10,
    flexDirection: 'column',
  },
  projectText: {
    fontSize: Sizes.normal,
  },
});
