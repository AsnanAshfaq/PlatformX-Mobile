/* eslint-disable dot-notation */
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
  ToastAndroid,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import DateTimePicker from '../../../Components/DateTimePicker';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {Calendar, PlusCircle} from '../../../Components/Icons';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import TechnologiesModal from '../../../Modals/FYPTechnologiesModal';
import CategoriesModal from '../../../Modals/FYPCategoriesModal';
import FormHandler from '../../../Utils/FormHandler';
import Axios from '../../../Utils/Axios';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';

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
    category: {value: [], error: ''},
    techonologies: {value: [], error: ''},
    end_date: {value: new Date(), error: ''},
  });
  const [learning_outcome, setlearning_outcome] = useState({
    value: '',
    error: '',
  }); // it will be an array

  const [modals, setmodals] = useState({
    category: false,
    technology: false,
    date: false,
  });
  const [loading, setloading] = useState(false);
  const {checkLength, isEmpty} = FormHandler();

  const handleSave = () => {
    var isAllInputValid = true;
    const x = Input;

    // name check
    if (isEmpty(Input.name.value)) {
      isAllInputValid = false;
      x['name']['error'] = 'Name is required.';
    }
    if (isEmpty(Input.description.value)) {
      isAllInputValid = false;
      x['description']['error'] = 'Description is required.';
    }

    if (Input.category.value.length === 0) {
      isAllInputValid = false;
      x['category']['error'] = 'Category is required.';
    }
    if (Input.techonologies.value.length === 0) {
      isAllInputValid = false;
      x['techonologies']['error'] = 'Technology is required.';
    }

    if (isEmpty(learning_outcome.value)) {
      isAllInputValid = false;
      x['techonologies']['error'] = 'Technology is required.';
    }

    if (
      Input.end_date.value.toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      isAllInputValid = false;
      x['end_date']['error'] = 'Last date cannot be today.';
    } else if (Input.end_date.value < new Date()) {
      isAllInputValid = false;
      x['end_date']['error'] = 'Invalid date.';
    }
    setInput(props => {
      return {
        ...x,
      };
    });
    if (isAllInputValid) {
      var bodyFormData = new FormData();
      bodyFormData.append('name', Input.name.value.trim());
      bodyFormData.append('description', Input.description.value.trim());
      bodyFormData.append('category', Input.category.value);
      bodyFormData.append('technologies', Input.techonologies.value);
      bodyFormData.append('end_date', Input.end_date.value);
      console.log('Body form data is', bodyFormData);
      Axios({
        method: 'post',
        url: `${BASE_URL}/api/fyp/create/`,
        data: bodyFormData,
      })
        .then(response => {
          console.log('Response is', response.data);
          if (response.status === 201) {
            console.log('FYP has been created');
          }
        })
        .catch(error => {
          ToastAndroid.show(error.response.data.error, 1500);
        });
    }
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
        onSelect={(values: any) => {
          setInput(props => {
            return {
              ...props,
              techonologies: {
                value: values,
                error: '',
              },
            };
          });
        }}
        values={Input.techonologies.value}
      />

      {/* project modal  */}
      <CategoriesModal
        isShow={modals.category}
        toggleModal={() =>
          setmodals(props => {
            return {
              ...props,
              category: false,
            };
          })
        }
        onSelect={(values: any) => {
          setInput(props => {
            return {
              ...props,
              category: {
                value: values,
                error: '',
              },
            };
          });
        }}
        values={Input.category.value}
      />

      {/* date picker modal  */}
      <DateTimePicker
        open={modals.date}
        date={new Date()}
        mode={'date'}
        setDate={response => {
          // hide modal first
          setmodals(props => {
            return {
              ...props,
              date: false,
            };
          });

          //   get type of modal
          const getDate = new Date(response);

          setInput(props => {
            return {
              ...props,
              end_date: {
                value: getDate,
                error: '',
              },
            };
          });
        }}
        cancel={() =>
          setmodals(props => {
            return {
              ...props,
              date: false,
            };
          })
        }
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
                  maxLength={30}
                  showLength
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
                  maxLength={150}
                  showLength
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
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.category.error !== ''
                          ? theme.RED_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      padding: 6,
                    },
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
              {/* error container  */}
              {Input.category.error !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Text style={[{color: theme.RED_COLOR}, styles.errorText]}>
                    {Input.category.error}
                  </Text>
                </View>
              )}
              {/* show category container  */}
              {Input.category.value.length > 0 && (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  {Input.category.value.map(item => (
                    <Text style={{color: theme.TEXT_COLOR}}>{item}</Text>
                  ))}
                </View>
              )}
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
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.category.error !== ''
                          ? theme.RED_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      padding: 6,
                    },
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
              {/* error container  */}
              {Input.techonologies.error !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Text style={[{color: theme.RED_COLOR}, styles.errorText]}>
                    {Input.techonologies.error}
                  </Text>
                </View>
              )}
              {/* show technology container  */}
              {Input.techonologies.value.length > 0 && (
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  {Input.techonologies.value.map(item => (
                    <Text style={{color: theme.TEXT_COLOR}}>{item}</Text>
                  ))}
                </View>
              )}
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
            {/* last date to apply  */}
            <View style={styles.container}>
              <View style={[styles.headingContainer]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Last Date
                </Text>
              </View>
              <HelpText text={'Specify last date to apply for this project.'} />
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() =>
                    setmodals(props => {
                      return {
                        ...props,
                        date: true,
                      };
                    })
                  }
                  style={[
                    styles.cardContainer,
                    {
                      backgroundColor: theme.CARD_BACKGROUND_COLOR,
                      borderWidth: 1,
                      borderColor:
                        Input.end_date.error !== ''
                          ? theme.RED_COLOR
                          : theme.CARD_BACKGROUND_COLOR,
                      width: Width * 0.65,
                    },
                  ]}>
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                      {Input.end_date.value.toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.cardIconContainer}>
                    <Calendar size={0.9} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {Input.end_date.error !== '' && (
                  <View style={{alignItems: 'center'}}>
                    <Text style={[{color: theme.RED_COLOR}, styles.errorText]}>
                      {Input.end_date.error}
                    </Text>
                  </View>
                )}
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
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectionText: {
    fontSize: Sizes.normal * 0.95,
  },
  cardTextContainer: {
    flex: 0.85,
    alignItems: 'center',
  },
  cardIconContainer: {
    flex: 0.15,
    marginLeft: 8,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
