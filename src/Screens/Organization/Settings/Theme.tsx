import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import {darkColors, lightColors} from '../../../Constants/Colors';
import {Tick} from '../../../Components/Icons';
type Props = {
  name: string;
  theme: any;
  showTick: boolean;
  onPress: () => void;
};
const Card: FC<Props> = ({name, showTick, theme, onPress}) => {
  const [state, dispatch] = useStateValue();

  return (
    <View
      style={[styles.center, {flexDirection: 'column', marginVertical: 10}]}>
      {/* check mark container  */}
      {showTick && (
        <View
          style={{
            position: 'absolute',
            width: 15,
            height: 15,
            borderRadius: 10,
            zIndex: 1,
            top: 5,
            right: 10,
            backgroundColor: state.theme.GREEN_COLOR,
          }}></View>
      )}

      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View
          style={[
            styles.cardContainer,
            {backgroundColor: theme.CARD_BACKGROUND_COLOR},
          ]}>
          <View
            style={[
              styles.box,
              {
                backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.box1,
              {
                backgroundColor: theme.ERROR_TEXT_COLOR,
              },
            ]}
          />
          <View
            style={[
              styles.box2,
              {
                backgroundColor: theme.GREEN_COLOR,
              },
            ]}
          />
        </View>
      </TouchableOpacity>
      <Text style={[styles.nameText, {color: theme.TEXT_COLOR}]}>{name}</Text>
    </View>
  );
};
type props = {
  navigation: any;
};
const Theme: FC<props> = ({navigation}) => {
  const [state, dispatch] = useStateValue();
  const {theme} = state;

  const setTheme = (value: string) => {
    dispatch({
      type: 'CHANGE_THEME',
      payload: value,
    });
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        title="Themes"
        onBackPress={() => navigation.goBack()}
        navigation={navigation}
        back
      />

      {/* theme container  */}
      <View style={styles.row}>
        <Card
          name={'Light'}
          theme={lightColors}
          onPress={() => setTheme('light')}
          showTick={state.themeName === 'light' ? true : false}
        />
        <Card
          name={'Dark'}
          theme={darkColors}
          onPress={() => setTheme('dark')}
          showTick={state.themeName === 'dark' ? true : false}
        />
      </View>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  cardContainer: {
    width: Width * 0.4,
    height: Width * 0.4,
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.03,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: Sizes.normal,
  },
  box: {
    width: Width * 0.3,
    height: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  box1: {
    width: Width * 0.3,
    height: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  box2: {
    width: Width * 0.2,
    height: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
});
