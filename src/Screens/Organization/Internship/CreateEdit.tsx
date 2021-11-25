/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {PlusCircle} from '../../../Components/Icons';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';

type props = {
  navigation: any;
  route: any;
};

const CreateEdit: FC<props> = ({navigation, route}) => {
  const {theme} = useStateValue()[0];
  const {method}: {method: 'edit' | 'create'} = route.params;
  const [InternshipID, setInternshipID] = useState('');
  const [Input, setInput] = useState({
    name: {value: '', error: ''},
    description: {value: '', error: ''},
    skills: {value: '', error: ''},
    responsibilities: {value: '', error: ''},
    duration: {value: 1, error: ''},
    end_date: {value: new Date(), error: ''},
    learning_outcome: {value: '', error: ''},
  });

  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Host Internship'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.scroll}>
          {/* name container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Name
              </Text>
            </View>
            <HelpText text={'Provide name of the internship.'} />
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
                placeholder={'Looking for ....'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                showLength
                error={Input.name.error}
              />
            </View>
          </View>
          {/* description container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Description
              </Text>
            </View>
            <HelpText text={'Provide description of the internship.'} />
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
                placeholder={'Enter description for the internship'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={150}
                showLength
                error={Input.description.error}
              />
            </View>
          </View>
          {/* skills container  */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Skills
                </Text>
              </View>
              <View style={{flex: 0.1}}>
                <PlusCircle color={theme.GREEN_COLOR} />
              </View>
            </View>
            <HelpText text={'Provide skills required for this internship.'} />

            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.skills.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      skills: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter a take away'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={Input.skills.error}
              />
            </View>
          </View>

          {/* responsibilites  */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Responsibilities
                </Text>
              </View>
              <View style={{flex: 0.1}}>
                <PlusCircle color={theme.GREEN_COLOR} />
              </View>
            </View>
            <HelpText text={'Provide responsibilites of the internee.'} />

            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.responsibilities.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      responsibilities: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter a take away'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={Input.responsibilities.error}
              />
            </View>
          </View>
          {/* duration container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Duration{' '}
                <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
                  (in months)
                </Text>
              </Text>
            </View>
            <HelpText text={'How long is the internship period?'} />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.duration.value}
                keyboardType={'numeric'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      duration: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'1'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                error={Input.duration.error}
                maxLength={1}
                width={Width * 0.2}
              />
            </View>
          </View>
        </View>
      </ScrollView>
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
  smallText: {
    fontSize: Sizes.small,
  },
  normalText: {
    fontSize: Sizes.normal,
  },
});
