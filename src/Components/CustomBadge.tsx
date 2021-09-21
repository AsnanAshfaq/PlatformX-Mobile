import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStateValue} from '../Store/StateProvider';

type props = {
  value?: number;
};
const CustomBadge: FC<props> = ({value}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View
      style={[
        styles.badgeStyle,
        {
          backgroundColor: theme.BADGE_COLOR,
          borderColor: theme.BADGE_COLOR,
        },
      ]}>
      <Text style={{color: theme.BADGE_TEXT_COLOR}}>
        {value !== undefined ? value : 2}
      </Text>
    </View>
  );
};

export default CustomBadge;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 21,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  badgeText: {},
});
