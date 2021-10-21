import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Sizes, Width} from '../Constants/Size';
import {useStateValue} from '../Store/StateProvider';
import Loading from './Loading';

type props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  color?: string;
  width?: number;
};
const CustomButton: FC<props> = ({
  text,
  onPress,
  loading = false,
  color,
  width,
}) => {
  const [{theme}, dispatch] = useStateValue();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.joinNowButton,
          {
            backgroundColor: color ? color : theme.GREEN_COLOR,
          },
        ]}
        activeOpacity={0.5}
        onPress={onPress}>
        {loading ? (
          <Loading size={'small'} color={theme.SCREEN_BACKGROUND_COLOR} />
        ) : (
          <Text
            style={[
              styles.text,
              {
                color: theme.TEXT_COLOR,
              },
            ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    // width: Width * 0.9,
    marginHorizontal: Width * 0.03,
    height: Width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  joinNowButton: {
    width: Width * 0.9,
    // marginHorizontal: Width * 0.05,
    height: Width * 0.12,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: Sizes.normal,
  },
});
