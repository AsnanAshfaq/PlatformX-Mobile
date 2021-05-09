import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

type props = {
  navigation?: any;
};
const CustomDrawer: FC<props> = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <Text>This is the custom drawer </Text>
      <DrawerItem
        label="Visit Us"
        icon={({focused, color, size}) => (
          <Ionicons name={'home-sharp'} size={25} color={'black'} />
        )}
        onPress={() => console.log('Pressed ')}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
