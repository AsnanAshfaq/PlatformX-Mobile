import React, {FC} from 'react';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {Sizes, Width} from '../../Constants/Size';
import {useStateValue} from '../../Store/StateProvider';

const ARTICLES = [];

type Props = {};

const Card: FC<Props> = () => {
  return <View></View>;
};

type props = {
  navigation: any;
};

const Articles: FC<props> = ({navigation}) => {
  const {theme} = useStateValue()[0];
  return (
    <View style={styles.parent}>
      <CustomHeader
        title={'Read Articles'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.margin}>
        <View style={styles.container} key={Math.random()}>
          <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
            Read articles based on your interests. You can always change your
            interest by editing on your profile.
          </Text>
        </View>
      </View>

      <FlatList
        data={ARTICLES}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => <Card {...item} />}
      />
    </View>
  );
};

export default Articles;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
  topicText: {
    fontSize: Sizes.large * 1.2,
  },
});
