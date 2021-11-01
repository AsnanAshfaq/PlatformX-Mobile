/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomHeader from '../../../../Components/CustomHeader';
import HelpText from '../../../../Components/HelpText';
import {Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import {commaSeperator} from '../../../../Utils/Numbers';
import CheckBox from '../../../../Components/CheckBox';
import CustomTextField from '../../../../Components/CustomTextField2';
import PolicyCheck from '../../../../Components/PolicyCheck';
type props = {
  navigation: any;
  route: any;
};

const Payment: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const [input, setInput] = useState({
    value: '',
    error: '',
  });

  const {
    plan,
  }: {
    plan: {
      type: 'basic' | 'standard' | 'premium';
      charges: '';
    };
  } = route.params;

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Subscription Plans'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.wrapper}>
          <View style={[styles.container]}>
            <Text style={[styles.smallText, {color: theme.TEXT_COLOR}]}>
              Step 2 of 2
            </Text>
          </View>

          {/* image container */}
          <View style={[styles.container]}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Set up billing through your mobile carrier
              </Text>
            </View>
            <View style={[styles.center, styles.imageContainer]}>
              <Image
                style={styles.image}
                source={require('../../../../../assets/images/payment.png')}
              />
            </View>
          </View>

          {/* account number container  */}
          <View style={[styles.container]}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Easy Paisa Account Number
              </Text>
            </View>
            <HelpText
              text={'Please provide your easpaisa registered phone number'}
            />

            <View style={[styles.center, styles.container]}>
              <CustomTextField
                defaultValue={input.value}
                keyboardType={'numeric'}
                onChangeText={text => setInput({value: text, error: ''})}
                placeholder={'Enter phone Number'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'telephoneNumber'}
                code
                error={input.error}
              />
            </View>
          </View>
          {/* selected package container  */}
          <View>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Selected Package
              </Text>
            </View>
            <View
              style={[
                styles.packageContainer,
                {borderColor: theme.BORDER_COLOR, borderWidth: 1},
              ]}>
              <View
                style={[
                  styles.center,
                  {
                    flex: 1,
                    borderRightWidth: 1,
                    borderRightColor: theme.DIVIDER_COLOR,
                  },
                ]}>
                <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                  Rs {commaSeperator(plan.charges)}
                </Text>
              </View>
              <View style={[styles.center, {flex: 1}]}>
                <Text
                  style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                  {plan.type.charAt(0).toUpperCase() +
                    plan.type.slice(1, plan.type.length)}
                </Text>
              </View>
            </View>
          </View>

          {/* check box container  */}
          <View style={[styles.container]}>
            <View style={styles.checkBoxContainer}>
              <View style={{flexDirection: 'row'}}>
                <PolicyCheck
                  text={
                    'By checking the checkbox, you agree to our Terms and Conditions and Privacy Policy'
                  }
                  handleCheck={isChecked =>
                    console.log('Checked value is ', isChecked)
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={'Buy Now'}
        onPress={() => console.log(`Buying ${plan.type} now`)}
      />
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  wrapper: {
    marginHorizontal: Width * 0.04,
    flex: 0.9,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 10,
  },
  smallText: {
    fontSize: Sizes.normal * 0.66,
  },
  headingContainer: {
    marginTop: 10,
  },
  imageContainer: {
    marginVertical: 10,
    marginTop: 30,
  },
  image: {
    width: Width * 0.4,
    height: Width * 0.4,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal,
  },
  packageContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'transparent',
    marginTop: 10,
    // paddingHorizontal:
    paddingVertical: 8,
  },
  checkBoxContainer: {
    marginTop: 10,
    // backgroundColor: 'red',
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
});
