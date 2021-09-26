import React, {FC, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Height, Sizes, Width} from '../Constants/Size';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FilterModal from '../Modals/FilterModal';
import {useStateValue} from '../Store/StateProvider';

type props = {
  placeholder: string;
  handleSearch: (query: string) => void;
  showFilterIcon?: boolean;
  applyFilters?: () => void | undefined;
};

const Search: FC<props> = ({
  placeholder,
  showFilterIcon,
  handleSearch,
  applyFilters,
}) => {
  const [input, setinput] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);
  const textInputRef = useRef<any>(null);

  const [{theme}, dispatch] = useStateValue();

  Keyboard.addListener('keyboardDidHide', e => {
    if (textInputRef.current) {
      textInputRef?.current.blur();
    }
  });

  useEffect(() => {
    const subscribe = Keyboard.addListener('keyboardDidHide', e => {
      if (textInputRef.current) {
        textInputRef?.current.blur();
      }
    });
    return () => {
      subscribe.remove();
    };
  }, []);

  const hanldeSearch = () => {
    // hide the keyboard if it is open
    Keyboard.dismiss();
    if (input.trim() !== '') {
      // make api call
      handleSearch(input.trim());
    }
  };

  const emptyInput = () => {
    setinput('');
  };

  return (
    <View style={styles.parent}>
      <FilterModal
        isShow={isModalOpen}
        toggleModal={() => setisModalOpen(!isModalOpen)}
        applyFilters={() => {
          setisModalOpen(!isModalOpen);
          typeof applyFilters !== 'undefined' && applyFilters();
        }}
      />
      <View
        style={[
          styles.searchContainer,
          {
            width: showFilterIcon === false ? Width * 0.9 : Width * 0.77,
            backgroundColor: theme.SHADOW_COLOR,
          },
        ]}>
        <View style={styles.textInputContainer}>
          <TextInput
            value={input}
            ref={textInputRef}
            onChangeText={text => setinput(text)}
            placeholder={placeholder}
            style={[styles.textInput, {color: theme.TEXT_COLOR}]}
            placeholderTextColor={theme.TEXT_COLOR}
            maxLength={30}
          />
        </View>
        <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={() => hanldeSearch()}>
            <Ionicons
              name={'search'}
              size={Width * 0.06}
              style={{
                color: theme.TAB_BAR_ACTIVE_COLOR,
              }}
            />
          </TouchableOpacity>

          {/* show the cross sign when the input is !== '' */}
          {input.trim() !== '' && (
            <TouchableOpacity onPress={() => emptyInput()}>
              <Entypo
                name={'cross'}
                size={Width * 0.065}
                style={{
                  color: theme.TAB_BAR_ACTIVE_COLOR,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
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
    // flex: 1,
    marginHorizontal: Width * 0.05,
    marginVertical: Width * 0.02,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputContainer: {
    flex: 0.85,
  },
  textInput: {
    marginHorizontal: Width * 0.01,
    marginLeft: 10,
    fontSize: Sizes.normal * 0.9,
  },
  searchIconContainer: {
    flex: 0.15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterContainer: {
    width: Width * 0.97,
    justifyContent: 'center',
  },
  filterIcon: {},
});
