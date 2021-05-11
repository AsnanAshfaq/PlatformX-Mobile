import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  placeholder: string;
};
const Search: FC<props> = ({placeholder}) => {
  const [input, setinput] = useState('');
  return (
    <View style={styles.parent}>
      <View style={styles.searchContainer}>
        <TextInput
          value={input}
          onChangeText={text => setinput(text)}
          placeholder={placeholder}
          style={styles.textInput}
          placeholderTextColor={darkColors.TEXT_COLOR}
        />
        <Ionicons
          name={'search'}
          size={Width * 0.06}
          style={styles.searchIcon}
        />
      </View>
      <View style={styles.filterContainer}>
        <Ionicons
          name={'ios-options-outline'}
          size={Width * 0.07}
          style={styles.filterIcon}
        />
      </View>
    </View>
  );
};
// filter icon -- ios-options-outline(dark theme)  -- ios-options-sharp(light-them)
export default Search;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
  },
  searchContainer: {
    width: Width * 0.77,
    marginHorizontal: Width * 0.05,
    marginVertical: Width * 0.02,
    backgroundColor: darkColors.SHADOW_COLOR,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
  },
  textInput: {
    flex: 0.85,
    marginHorizontal: Width * 0.01,
    marginLeft: 10,
    // maxWidth: Width * 0.65,
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
  searchIcon: {
    flex: 0.15,
    color: darkColors.TAB_BAR_ACTIVE_COLOR,
  },
  filterContainer: {
    width: Width * 0.97,
    justifyContent: 'center',
  },
  filterIcon: {
    color: darkColors.TAB_BAR_ACTIVE_COLOR,
  },
});
