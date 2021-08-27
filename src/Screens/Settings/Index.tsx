import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {darkColors} from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Height, Sizes, Width} from '../../Constants/Size';

type cardProps = {
  IconComponent: FC;
  title: string;
  description: string;
};
const Card: FC<cardProps> = ({IconComponent, title, description}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  // icon component
  // title
  // description
  return (
    <View style={styles.cardParent}>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        <IconComponent />
      </View>
      <View style={{flex: 0.8}}>
        <Text style={styles.cardTitleText}>{title}</Text>
        <Text style={styles.cardDescText}>{description}</Text>
      </View>
      <View>
        <Switch
          trackColor={{false: '#767577', true: darkColors.TEXT_COLOR}}
          thumbColor={isEnabled ? darkColors.SHADOW_COLOR : '#f4f3f4'}
          onValueChange={value => setIsEnabled(value)}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
type props = {
  navigation: any;
};
const ICON_SIZE = Width * 0.09;

const Index: FC<props> = ({navigation}) => {
  return (
    <View style={styles.parent}>
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
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Enable/Disable Account'}
        description={
          'You can enable/disable account.You can enable/disable account '
        }
      />

      <Card
        IconComponent={() => (
          <MaterialCommunityIcons
            name={'theme-light-dark'}
            size={ICON_SIZE}
            color={darkColors.TAB_BAR_ACTIVE_COLOR}
            // style={styles.iconPadding}
          />
        )}
        title={'Theme'}
        description={'Change theme. Light/Dark'}
      />

      {/* notification settings  */}
      {/* theme settings  */}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
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
    shadowColor: darkColors.SHADOW_COLOR,
    backgroundColor: darkColors.LIGHT_BACKGROUND,
    shadowOpacity: 1,
    shadowRadius: 25,
    shadowOffset: {width: 10, height: 12},
    elevation: 30,
  },
  cardTitleText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.large,
  },
  cardDescText: {
    color: darkColors.TEXT_COLOR,
    fontSize: Sizes.normal * 0.9,
  },
});
