import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {color} from 'react-native-reanimated';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';

type props = {};
const General: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    title: {value: '', error: ''},
    tagLine: {value: '', error: ''},
    description: {value: '', error: ''},
    contact: {value: '', error: ''},
    teams: {
      isTrue: false,
      min: '',
      max: '',
    },
    resources: {value: '', error: ''},
  });

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!loading) {
      // setLoading(true);
      // check field validations here
      // make api call here
    }
  };
  return (
    <View style={styles.parent}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* title  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Title
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={Input.title.value}
              keyboardType={'default'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    title: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter Hackathon Title'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              maxLength={30}
              error={Input.title.error}
            />
          </View>
        </View>
        {/* tagline  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Tag Line
            </Text>
          </View>
          <HelpText
            text={'Create a short and catchy tagline for your hackathon.'}
          />

          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={Input.description.value}
              keyboardType={'default'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    tagLine: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter Hackathon Tag Line'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.tagLine.error}
            />
          </View>
        </View>
        {/* description  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Description
            </Text>
          </View>
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
              placeholder={'Enter Hackathon Description'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.description.error}
            />
          </View>
        </View>

        {/* theme tags  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Theme Tags
            </Text>
          </View>
          <HelpText text={'Choose theme for your hackathon.'} />
          <FlatList
            data={hackathonThemeTags}
            numColumns={3}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.checkBoxContainer,
                    {
                      marginVertical: 5,
                      marginLeft: 15,
                    },
                  ]}>
                  <CheckBox
                    size={20}
                    onPress={isCheck => console.log('Checked on', item)}
                  />
                  <Text
                    style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        {/* contact email  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Contact Email
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={Input.contact.value}
              keyboardType={'email-address'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    contact: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter contact email'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.contact.error}
            />
          </View>
        </View>

        {/* teams requirement  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Teams Requirement
            </Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              size={20}
              onPress={isCheck => {
                setInput(props => {
                  return {
                    ...props,
                    teams: {
                      isTrue: isCheck !== undefined && isCheck,
                      min: props.teams.min,
                      max: props.teams.max,
                    },
                  };
                });
              }}
            />
            <Text style={[styles.checkBoxText, {color: theme.TEXT_COLOR}]}>
              Yes
            </Text>
          </View>

          {/* only disable team input container if required  */}
          {Input.teams.isTrue && (
            <>
              <View style={styles.teamInputContainer}>
                <CustomTextField
                  defaultValue={Input.teams.min}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        teams: {
                          isTrue: props.teams.isTrue,
                          min: text,
                          max: props.teams.max,
                        },
                      };
                    })
                  }
                  keyboardType={'numeric'}
                  placeholder={'Min'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'telephoneNumber'}
                  width={Width * 0.138}
                  height={Width * 0.13}
                  maxLength={1}
                />
                <View style={styles.teamTextContainer}>
                  <Text
                    style={{
                      color: theme.DIM_TEXT_COLOR,
                      fontSize: Sizes.normal * 0.9,
                    }}>
                    to
                  </Text>
                </View>
                <CustomTextField
                  defaultValue={Input.teams.max}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        teams: {
                          isTrue: props.teams.isTrue,
                          max: text,
                          min: props.teams.min,
                        },
                      };
                    })
                  }
                  keyboardType={'numeric'}
                  placeholder={'Max'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'telephoneNumber'}
                  width={Width * 0.138}
                  height={Width * 0.13}
                  maxLength={1}
                />
                <View style={styles.teamTextContainer}>
                  <Text
                    style={{
                      color: theme.DIM_TEXT_COLOR,
                      fontSize: Sizes.normal * 0.9,
                    }}>
                    team members
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* resources  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Resources
            </Text>
          </View>
          <HelpText
            text={
              'List any resources that you want to provide to participants such as link to any tutorial, blog, resource tools, helping material or anything that might be useful for the participants'
            }
          />
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={Input.resources.value}
              keyboardType={'email-address'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    resources: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter hackathon resources'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.resources.error}
            />
          </View>
        </View>

        {/* submission requirements  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Submission Requirement
            </Text>
          </View>
          <HelpText
            text={
              'Clearly tell participants what they need to build for this hackathon.'
            }
          />
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={Input.resources.value}
              keyboardType={'email-address'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    resources: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter hackathon resources'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.resources.error}
            />
          </View>
        </View>
      </ScrollView>
      <CustomButton
        text={'Save and Continue'}
        onPress={handleSave}
        loading={loading}
      />
    </View>
  );
};

export default General;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.large * 1.1,
  },
  scroll: {
    marginTop: Height * 0.003,
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
  checkBoxContainer: {
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'row',
  },
  checkBoxText: {
    fontSize: Sizes.normal * 0.8,
  },
  teamInputContainer: {
    marginLeft: Width * 0.04,
    marginTop: 4,
    flexDirection: 'row',
  },
  teamTextContainer: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
