import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
// import {darkColors} from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Height, Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';
import Axios from '../../Utils/Axios';

type cardProps = {
  IconComponent: FC;
  title: string;
  description: string;
  onPress: () => void;
};

const Card: FC<cardProps> = ({IconComponent, title, description, onPress}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.cardParent,
        {
          shadowColor: theme.SHADOW_COLOR,
          backgroundColor: theme.LIGHT_BACKGROUND,
        },
      ]}>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        <IconComponent />
      </View>
      <View style={{flex: 0.7}}>
        <Text style={[styles.cardTitleText, {color: theme.TEXT_COLOR}]}>
          {title}
        </Text>
        <Text style={[styles.cardDescText, {color: theme.TEXT_COLOR}]}>
          {description}
        </Text>
      </View>
      <View style={{flex: 0.1}}>
        <Switch
          trackColor={{false: '#767577', true: theme.TEXT_COLOR}}
          thumbColor={isEnabled ? theme.SHADOW_COLOR : '#f4f3f4'}
          onValueChange={value => {
            onPress();
            setIsEnabled(value);
          }}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

type props = {
  navigation: any;
};

const ICON_SIZE = Width * 0.08;

const Index: FC<props> = ({navigation}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      {/* header  */}
      <CustomHeader
        title="Settings"
        onBackPress={() => navigation.goBack()}
        navigation={navigation}
        back
      />
      {/* account settings  */}

      <Card
        IconComponent={() => (
          <MaterialCommunityIcons
            name={'shield-account'}
            size={ICON_SIZE}
            color={theme.TAB_BAR_ACTIVE_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Activate/Deactivate Account'}
        description={'You can activate/deactivate account'}
        onPress={() =>
          Axios.post('/user/activate/')
            .then(response => console.log(response.data))
            .catch(error => {
              console.log(error.response.data.error);
            })
        }
      />
      {/* theme settings  */}
      <Card
        IconComponent={() => (
          <MaterialCommunityIcons
            name={'theme-light-dark'}
            size={ICON_SIZE}
            color={theme.TAB_BAR_ACTIVE_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Theme'}
        description={'Change theme. Light/Dark'}
        onPress={() => {
          dispatch({type: 'TOGGLE_THEME'});
        }}
      />

      {/* notification settings  */}
      <Card
        IconComponent={() => (
          <Entypo
            name={'bell'}
            size={ICON_SIZE}
            color={theme.TAB_BAR_ACTIVE_COLOR}
          />
        )}
        title={'Notifications'}
        description={'Turn notifications on/off'}
        onPress={() => console.log('Setting notifications on/off')}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  cardParent: {
    width: Width * 0.9,
    // height: Height * 0.0,
    paddingVertical: 20,
    marginHorizontal: Width * 0.04,
    marginVertical: Width * 0.01,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  cardTitleText: {
    fontSize: Sizes.large,
  },
  cardDescText: {
    fontSize: Sizes.normal * 0.9,
  },
});
