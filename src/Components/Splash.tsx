import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {darkColors} from '../Constants/Colors';
import {Sizes, Width} from '../Constants/Size';
import Loading from './Loading';

const Splash = () => {
  return (
    <View style={styles.parent}>
      <View style={styles.logoContainer}>
        <Text style={styles.bracket}>{'<'}</Text>
        <Text style={styles.logo}>PlatformX</Text>
        <Text style={styles.bracket}>{'/>'}</Text>
      </View>
      {/* loading view  */}
      <View style={styles.loadingContainer}>
        <Loading size={Width * 0.15} color={darkColors.TEXT_COLOR} />
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: darkColors.SCREEN_BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 0.6,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracket: {
    fontSize: Sizes.large * 3,
    // fontWeight: 'bold',
    fontFamily: 'ComicNeue-Regular',
    color: darkColors.TEXT_COLOR,
  },
  logo: {
    fontSize: Sizes.large * 2,
    color: darkColors.TEXT_COLOR,
    fontFamily: 'Comfortaa-SemiBold',
  },
  loadingContainer: {
    flex: 0.1,
  },
});
