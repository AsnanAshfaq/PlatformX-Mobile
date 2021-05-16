import React, {FC, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Height, Sizes, Width} from '../Constants/Size';
import {darkColors} from '../Constants/Colors';
import {hackathonFilterData} from '../Constants/Sample';

type Props = {
  list: Array<string>;
};
const SubTagList: FC<Props> = ({list}) => {
  return (
    <View style={styles.subtagContainer}>
      {list.map(item => (
        <View style={{flexDirection: 'row'}} key={item}>
          <BouncyCheckbox
            size={25}
            fillColor={darkColors.BADGE_COLOR}
            unfillColor="#FFFFFF"
            // text="Custom Checkbox"
            disableText={true}
            iconStyle={{borderColor: darkColors.SHADOW_COLOR}}
            // textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={isChecked => console.log(isChecked)}
            style={{marginRight: 10}}
          />
          <Text style={styles.subtag}>{item}</Text>
        </View>
      ))}
    </View>
  );
};
type props = {
  isShow: boolean;
  toggleModal: () => void;
};
const FilterModal: FC<props> = ({isShow, toggleModal}) => {
  return (
    <Modal
      isVisible={isShow}
      style={styles.Modalparent}
      animationIn={'slideInUp'}
      animationInTiming={400}
      animationOut={'slideOutDown'}
      animationOutTiming={400}
      backdropColor={'#575959'}
      backdropOpacity={0.3}
      onBackdropPress={toggleModal}
      onBackButtonPress={toggleModal}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}>
      <>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Filters </Text>
        </View>
        <ScrollView style={styles.scroll}>
          {hackathonFilterData.map((filterItem, index) => {
            console.log(index);
            console.log(hackathonFilterData.length);
            return (
              <View>
                {/* label of the filter  */}
                <Text key={filterItem.id} style={[styles.tag, styles.divider]}>
                  {filterItem.tag}
                </Text>
                {/* list of subtags  */}
                <SubTagList list={filterItem.subtag} />
              </View>
            );
          })}
        </ScrollView>
        {/* apply filters button  */}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity
            onPress={() => console.log('Apply filters')}
            style={styles.applyButton}>
            <Text style={styles.apply}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </>
    </Modal>
  );
};

const styles = StyleSheet.create({
  Modalparent: {
    flex: 1,
    maxHeight: Height * 0.85,
    backgroundColor: darkColors.BACKGROUND_COLOR,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    // alignItems: 'center',
    borderColor: 'transparent',
    marginVertical: Height * 0.15,
  },
  headingContainer: {justifyContent: 'center', alignItems: 'center'},
  heading: {
    fontSize: Sizes.large * 1.3,
    color: darkColors.TEXT_COLOR,
  },
  scroll: {
    marginHorizontal: 20,
    // marginVertical: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    // backgroundColor: 'grey',
  },
  tag: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large,
    marginRight: 30,
    padding: 3,
  },
  subtagContainer: {
    marginLeft: 20,
    marginVertical: 5,
  },
  subtag: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal,
    paddingVertical: 3,
  },
  applyButtonContainer: {
    minHeight: Height * 0.05,
    // maxHeight: Height * 0.07,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
  },
  applyButton: {
    width: Width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.BADGE_COLOR,
    borderRadius: 10,
  },
  apply: {
    color: darkColors.BACKGROUND_COLOR,
    fontSize: Sizes.normal,
  },
});
export default FilterModal;
