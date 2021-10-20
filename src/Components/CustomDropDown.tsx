// show list of data when clicked on custom drop down

import React, {FC, useState, forwardRef} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useStateValue} from '../../src/Store/StateProvider';

type props = {
  data: Array<string>;
  isShow?: boolean;
  toggleShow?: any;
  Selected: string;
  setSelected: (type: any) => void;
};

const ICON_SIZE = Width * 0.07;

const CustomDropDown: FC<props> = ({
  data,
  isShow = false,
  toggleShow,
  Selected,
  setSelected,
}) => {
  const toggleDropDown = () => toggleShow(!isShow);

  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={styles.parent}>
      <TouchableOpacity
        onPress={() => toggleDropDown()}
        style={[
          styles.dropDownBar,
          {backgroundColor: theme.CARD_BACKGROUND_COLOR},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.selectedText, {color: theme.TEXT_COLOR}]}>
            {Selected}
          </Text>
          <Ionicons
            name={isShow === false ? 'caret-down-outline' : 'caret-up-outline'}
            size={ICON_SIZE}
            color={theme.ICON_COLOR}
            style={styles.dropDownIcon}
          />
        </View>
      </TouchableOpacity>

      {/* drop down view  */}
      <View
        style={[
          styles.droppedViewContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
          },
        ]}>
        {isShow &&
          data.map(type => (
            <TouchableOpacity
              onPress={() => {
                toggleDropDown();
                setSelected(prev => {
                  return {
                    ...prev,
                    category: type,
                  };
                });
              }}
              key={type}>
              <View style={styles.droppedView}>
                <Text style={[styles.droppedText, {color: theme.TEXT_COLOR}]}>
                  {type}
                </Text>
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
  },
  droppedView: {
    width: Width * 0.87,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginHorizontal: Width * 0.01,
  },
  droppedText: {
    fontSize: Sizes.normal * 1.1,
  },
});
