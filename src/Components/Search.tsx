import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FilterModal from '../Modals/FilterModal';
import {useStateValue} from '../Store/StateProvider';

type props = {
  placeholder: string;
  showFilterIcon?: boolean;
};

const Search: FC<props> = ({placeholder, showFilterIcon}) => {
  const [input, setinput] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const textInputRef = useRef<any>(null);

  const [{theme}, dispatch] = useStateValue();

  Keyboard.addListener('keyboardDidHide', e => {
    if (textInputRef.current) {
      textInputRef?.current.blur();
    }
  });

  return (
    <View style={styles.parent}>
      <FilterModal
        isShow={isModalOpen}
        toggleModal={() => setisModalOpen(!isModalOpen)}
        // Data={filterData}
      />
      <View
        style={[
          styles.searchContainer,
          {
            width: showFilterIcon === false ? Width * 0.9 : Width * 0.77,
            backgroundColor: theme.SHADOW_COLOR,
          },
        ]}>
        <TextInput
          value={input}
          ref={textInputRef}
          onChangeText={text => setinput(text)}
          placeholder={placeholder}
          style={[styles.textInput, {color: theme.TEXT_COLOR}]}
          placeholderTextColor={theme.TEXT_COLOR}
          maxLength={30}
        />
        <Ionicons
          name={'search'}
          size={Width * 0.06}
          style={[
            styles.searchIcon,
            {
              color: theme.TAB_BAR_ACTIVE_COLOR,
            },
          ]}
        />
      </View>
      {showFilterIcon !== false && (
        <View style={styles.filterContainer}>
          {/* filter icon -- ios-options-outline(dark theme) --ios-options-sharp(light-them) */}
          <TouchableWithoutFeedback onPress={() => setisModalOpen(true)}>
            <Ionicons
              name={'ios-options-outline'}
              size={Width * 0.07}
              style={{color: theme.TAB_BAR_ACTIVE_COLOR}}
            />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
  },
  searchContainer: {
    // width: Width * 0.77,
    marginHorizontal: Width * 0.05,
    marginVertical: Width * 0.02,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 0.85,
    marginHorizontal: Width * 0.01,
    marginLeft: 10,
    fontSize: Sizes.normal * 0.9,
  },
  searchIcon: {
    flex: 0.15,
  },
  filterContainer: {
    width: Width * 0.97,
    justifyContent: 'center',
  },
  filterIcon: {},
});
