import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../../../Components/CustomHeader';
import {useStateValue} from '../../../../Store/StateProvider';
import General from './General';
import Media from './Media';
import Prize from './Prize';
import Schedule from './Schedule';

type props = {
  navigation: any;
  route: any;
};
const Index: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
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

      {/* <General /> */}
      {/* <Media /> */}
      {/* prize  */}
      {/* <Prize /> */}
      <Schedule />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
