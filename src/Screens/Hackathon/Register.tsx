import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {darkColors} from '../../Constants/Colors';

type props = {
  navigation: any;
  route: any;
};
const Register: FC<props> = ({navigation, route}) => {
  // get hackathon id from params
  const {ID} = route.params;

  console.log('Id is', ID);
  return (
    <View style={styles.parent}>
      <CustomHeader
        navigation
        title={'Register'}
        back
        onBackPress={() => navigation.goBack()}
      />
      <Text>This is the Register Screen</Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
  },
});
