import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import CustomHeader from '../../../Components/CustomHeader';
// import {darkColors} from '../../../Constants/Colors';
import {Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

type props = {
  navigation: any;
};

const Hackathon: FC = () => {
  return (
    <View>
      <Text>This is the hackathon tab</Text>
    </View>
  );
};

const Workshop: FC = () => {
  return (
    <View>
      <Text>This is the workshop tab</Text>
    </View>
  );
};
const Activities: FC<props> = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'hackathon', title: 'Hackathon'},
    {key: 'workshop', title: 'Workshop'},
    {key: 'internship', title: 'Internship'},
    {key: 'project', title: 'Project'},
  ]);
  const [state, dispatch] = useStateValue();

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'hackathon':
        return <Hackathon />;
      case 'workshop':
        return <Workshop />;
      default:
        return null;
    }
  };
  return (
    <View
      style={[
        styles.parent,
        {backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR},
      ]}>
      {/* header  */}
      <CustomHeader
        navigation
        title={'My Activities'}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* list of hackathons, workshops, internship, projects which user has applied to */}

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={{width: 'auto'}}
            indicatorStyle={{backgroundColor: state.theme.LIGHT_BACKGROUND}}
            style={{backgroundColor: state.theme.SCREEN_BACKGROUND_COLOR}}
            activeColor={state.theme.TEXT_COLOR}
            inactiveColor={state.theme.SHADOW_COLOR}
          />
        )}
        keyboardDismissMode={'auto'}
      />
    </View>
  );
};

export default Activities;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
