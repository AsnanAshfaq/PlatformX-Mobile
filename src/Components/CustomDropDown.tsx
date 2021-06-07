// show list of data when clicked on custom drop down

import React, {FC, useState, forwardRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  data: Array<string>;
  isShow?: boolean;
  toggleShow?: any;
  Selected: string;
  setSelected: (type: string) => void;
};

const ICON_SIZE = Width * 0.07;

const CustomDropDown: FC<props> = ({
  data,
  isShow = false,
  toggleShow,
  Selected,
  setSelected,
}) => {
  const toggle = () => toggleShow(!isShow);
  return (
    <View style={styles.parent}>
      <TouchableOpacity onPress={toggle} style={styles.dropDownBar}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.selectedText}>{Selected}</Text>
          <Ionicons
            name={isShow === false ? 'caret-down-outline' : 'caret-up-outline'}
            size={ICON_SIZE}
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
            style={styles.dropDownIcon}
          />
        </View>
      </TouchableOpacity>

      {/* drop down view  */}
      <View style={styles.droppedViewContainer}>
        {isShow &&
          data.map(type => (
            <TouchableOpacity
              onPress={() => {
                toggle();
                setSelected(type);
              }}
              key={type}>
              <View style={styles.droppedView}>
                <Text style={styles.droppedText}>{type}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  parent: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  dropDownBar: {
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    width: Width * 0.9,
    marginHorizontal: Width * 0.01,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  dropDownIcon: {
    flex: 0.1,
  },
  selectedText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
    flex: 0.9,
  },
  droppedViewContainer: {
    // width: Width * 0.8,
    // marginHorizontal: 10,
    marginVertical: 5,
    // paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkColors.LIGHT_BACKGROUND,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
  },
  droppedView: {
    width: Width * 0.87,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: Width * 0.01,
  },
  droppedText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 1.1,
  },
});
