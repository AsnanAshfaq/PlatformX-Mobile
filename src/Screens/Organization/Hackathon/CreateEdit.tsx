import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStateValue} from '../../../Store/StateProvider';

const CreateEditHackathon = () => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <Text>THis is the edit hackathon screen</Text>
    </View>
  );
};

export default CreateEditHackathon;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
