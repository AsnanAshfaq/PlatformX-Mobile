import React, {FC, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

type props = {
  isShow: boolean;
  toggleModal: () => void;
};
const FilterModal: FC<props> = ({isShow, toggleModal}) => {
  return (
    <Modal isVisible={isShow}>
      <View style={{flex: 1}}>
        <Text>Hello!</Text>

        <Button title="Hide modal" onPress={toggleModal} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
export default FilterModal;
