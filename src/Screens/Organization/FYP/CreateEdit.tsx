/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {PlusCircle} from '../../../Components/Icons';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import TechnologiesModal from '../../../Modals/TechnologiesModal';

type props = {
  navigation: any;
  route: any;
};

const CreateEdit: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {screen}: {screen: 'edit' | 'create'} = route.params;
  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    description: {value: '', error: ''},
    category: {value: '', error: ''},
    techonologies: {value: '', error: ''},
    end_date: {value: new Date().toLocaleDateString(), error: ''},
  });
  const [learning_outcome, setlearning_outcome] = useState({
    value: '',
    error: '',
  }); // it will be an array

  const [modals, setmodals] = useState({
    category: false,
    technology: false,
  });
  const [loading, setloading] = useState(false);
  const handleSave = () => {
    // setloading(true);
    // setTimeout(() => {
    //   setloading(false);
    // }, 3000);
  };
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Host FYP'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      {/* technologies modal  */}
      <TechnologiesModal
        isShow={modals.technology}
        toggleModal={() =>
          setmodals(props => {
            return {
              ...props,
              technology: false,
            };
          })
        }
        onSelect={values => console.log('Values selected are', values)}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.scroll}>
            {/* name of the project */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Name
                </Text>
              </View>
              <HelpText text={'Provide name of the project.'} />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.name.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        name: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Project Name'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  error={Input.name.error}
                />
              </View>
            </View>
            {/* description of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Description
                </Text>
              </View>
              <HelpText text={'Provide description of the project.'} />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={Input.description.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        description: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter Project Description'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                  error={Input.description.error}
                />
              </View>
            </View>
            {/* category of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Category
                </Text>
              </View>
              <HelpText
                text={
                  'Select category of the project (you can also select multiple options).'
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setmodals(props => {
                    return {
                      ...props,
                      category: true,
                    };
                  })
                }>
                <View
                  style={[
                    styles.selectionContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR, padding: 6},
                  ]}>
                  <Text
                    style={[
                      styles.selectionText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Choose Project Category
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* technologies of the project  */}
            <View style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Techonologies
                </Text>
              </View>
              <HelpText
                text={
                  'Select technologies that will be used in the development of the project.'
                }
              />
              <TouchableOpacity
                onPress={() =>
                  setmodals(props => {
                    return {
                      ...props,
                      technology: true,
                    };
                  })
                }>
                <View
                  style={[
                    styles.selectionContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR, padding: 6},
                  ]}>
                  <Text
                    style={[
                      styles.selectionText,
                      {color: theme.DIM_TEXT_COLOR},
                    ]}>
                    Choose Technologies
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* outcomes of the project  */}
            <View style={styles.container}>
              <View style={{flexDirection: 'row'}}>
                <View style={[styles.headingContainer, {flex: 0.9}]}>
                  <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                    Project Learning Outcomes
                  </Text>
                </View>
                <View style={{flex: 0.1}}>
                  <PlusCircle color={theme.GREEN_COLOR} />
                </View>
              </View>
              <HelpText
                text={
                  'Write key points of learning outcomes for the participants.'
                }
              />
              <View style={styles.inputContainer}>
                <CustomTextField
                  defaultValue={learning_outcome.value}
                  keyboardType={'default'}
                  onChangeText={text =>
                    setlearning_outcome(props => {
                      return {
                        value: text,
                        error: '',
                      };
                    })
                  }
                  placeholder={'Enter a learning outcome'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  maxLength={30}
                  error={learning_outcome.error}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <CustomButton
        text={'Save and Continue'}
        onPress={handleSave}
        loading={loading}
      />
    </View>
  );
};

export default CreateEdit;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
    marginHorizontal: Width * 0.04,
  },
  container: {
    marginTop: 10,
  },
  headingContainer: {
    marginVertical: 2,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  selectionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    // width: Width * 0.2,
    borderRadius: 10,
  },
  selectionText: {
    fontSize: Sizes.normal * 0.95,
  },
});
