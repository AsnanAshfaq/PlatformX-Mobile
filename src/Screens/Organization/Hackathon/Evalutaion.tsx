import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../../Components/CustomHeader';
import {Height, Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
//@ts-ignore
import {BASE_URL} from 'react-native-dotenv';
import {ForwardArrow, Tick} from '../../../Components/Icons';
import CustomButton from '../../../Components/CustomButton';
import Bullet from '../../../Components/Bullet';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {Rating, AirbnbRating} from 'react-native-ratings';

const ICON_SIZE = Width * 0.07;

type categoryProps = {
  heading: string;
  helpText: string;
  input: any;
  onChangeText: (text) => void;
};
const Category: FC<categoryProps> = ({
  heading,
  helpText,
  input,
  onChangeText,
}) => {
  const [{theme}, dispatch] = useStateValue();

  return (
    <View style={[styles.container, {flexDirection: 'row'}]}>
      <View style={styles.categoryContainer}>
        <View style={[styles.categoryHeadingContainer, {flexDirection: 'row'}]}>
          <View style={{flex: 0.1}}>
            <Bullet width={12} height={12} />
          </View>
          <View style={{flex: 0.9}}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              {heading}
            </Text>
            <View>
              <HelpText text={helpText} />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.inputContainer, styles.center]}>
        <CustomTextField
          defaultValue={input}
          keyboardType={'numeric'}
          onChangeText={text => onChangeText(text)}
          placeholder={'0'}
          placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
          textContentType={'telephoneNumber'}
          width={40}
          maxLength={1}
          height={40}
        />
        <View style={[styles.center]}>
          <Text
            style={{
              color: theme.GREEN_COLOR,
              fontSize: Sizes.normal * 1.1,
            }}>
            {' '}
            / 5
          </Text>
        </View>
      </View>
    </View>
  );
};

type props = {
  navigation: any;
  route: any;
};
const Evaluation: FC<props> = ({navigation, route}) => {
  const ID = route.params.ID;
  const [{theme}, dispatch] = useStateValue();

  const [Input, setInput] = useState({
    idea: {value: '', error: ''},
    originality: {value: '', error: ''},
    functionality: {value: '', error: ''},
    design: {value: '', error: ''},
    problem: {value: '', error: ''},
    remarks: {value: '', error: ''},
    rating: 1,
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
        title={'Evaluate'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.container}>
            <View style={[styles.headingContainer]}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Start Evaluating hackathon based on following criteria
              </Text>
            </View>
          </View>
          <View style={styles.container}>
            <Category
              input={Input.idea.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    idea: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Idea'}
              helpText={'How impressing is the idea of My First Project was?'}
            />
            <Category
              input={Input.originality.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    originality: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Originality'}
              helpText={`Originality refers to lending one${"'"}s personal uniqueness. So how original is My First Project?`}
            />
            <Category
              input={Input.functionality.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    functionality: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Functionality'}
              helpText={
                'How is My First Project performing the specified task. Does it have the functionality required?'
              }
            />
            <Category
              input={Input.design.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    design: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Design'}
              helpText={'How good is the actual design of My First Project?'}
            />
            <Category
              input={Input.problem.value}
              onChangeText={text =>
                setInput(props => {
                  return {
                    ...props,
                    problem: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              heading={'Problem Solving'}
              helpText={'Is My First Project a problem solving project?'}
            />
          </View>

          {/* over all status container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Overall Status
              </Text>
            </View>
            <AirbnbRating
              defaultRating={1}
              size={20}
              count={5}
              reviews={['Terrible', 'Bad', 'Fair', 'Good', 'Amazing']}
              reviewSize={Sizes.normal * 1.2}
              reviewColor={theme.TEXT_COLOR}
              selectedColor={theme.GREEN_COLOR}
              onFinishRating={rating =>
                setInput(props => {
                  return {
                    ...props,
                    rating: rating,
                  };
                })
              }
            />
          </View>
          {/* final remarks container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Final Remarks
              </Text>
            </View>
            <View style={{marginTop: 4}}>
              <HelpText
                text={
                  'Use this field to provide any final remarks based on your likes and dislikes of the project.'
                }
              />
              <View style={styles.container}>
                <CustomTextField
                  defaultValue={Input.remarks.value}
                  keyboardType={'email-address'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        remarks: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Enter any remarks for this project'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'name'}
                  multiLine={true}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <CustomButton
        text={'Submit'}
        onPress={() => console.log('Pressed on submit')}
      />
    </View>
  );
};

export default Evaluation;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  container: {
    marginTop: 10,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
  },
  headingContainer: {
    // fontSize: Sizes.normal * 1.1,
    marginTop: 10,
  },
  categoryContainer: {
    flex: 0.8,
    flexDirection: 'column',
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  categoryHeadingContainer: {
    flexDirection: 'row',
  },
  redMark: {},
  inputContainer: {
    flexDirection: 'row',
    flex: 0.2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
