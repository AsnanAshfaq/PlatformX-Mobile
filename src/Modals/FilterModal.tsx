import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const FilterModal = ({isShow}) => {
  const [isModalVisible, setModalVisible] = useState(isShow);
  // console.log('Value of isShow', isShow);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Modal isVisible={isModalVisible}>
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
