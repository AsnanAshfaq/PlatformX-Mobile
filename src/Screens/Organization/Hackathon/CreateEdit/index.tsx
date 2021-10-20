import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {useStateValue} from '../../../../Store/StateProvider';

type props = {
  navigation: any;
  route: any;
};
const Index: FC<props> = ({navigation, route}) => {
  const [{theme}, dispatch] = useStateValue();
  const {screen} = route.params;

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Host Hackathon'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <Text>THis is the edit hackathon screen</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
