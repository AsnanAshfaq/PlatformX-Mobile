import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Sizes} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';

type props = {
  size: number;
  onPress: (isChecked: boolean | undefined) => void;
  star?: boolean;
  margin?: number;
};
const CheckBox: FC<props> = ({size, onPress, star, margin}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <>
      <BouncyCheckbox
        size={size}
        fillColor={theme.BADGE_COLOR}
        unfillColor="#FFFFFF"
        disableText={true}
        iconStyle={{borderColor: theme.SHADOW_COLOR}}
        // textStyle={{fontFamily: 'JosefinSans-Regular'}}
        onPress={isChecked => onPress(isChecked)}
        style={{marginRight: margin ? margin : 10}}
      />
      {star && (
        <View style={styles.starContainer}>
          <Text style={{color: theme.ERROR_TEXT_COLOR, fontSize: Sizes.normal}}>
            *
          </Text>
        </View>
      )}
    </>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  starContainer: {
    justifyContent: 'flex-start',
    height: 30,
    marginHorizontal: 4,
    marginBottom: 5,
  },
});
