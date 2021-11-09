import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import {Camera, Cross, PlusCircle} from '../../../../Components/Icons';
import ImagePicker from 'react-native-image-crop-picker';

type props = {};
const General: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    topic: {value: '', error: ''},
    description: {value: '', error: ''},
    poster: {value: '', error: ''},
    isPaid: true,
    charges: {value: '', error: ''},
  });

  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!loading) {
      // setLoading(true);
      // check field validations here
      // make api call here
    }
  };

  const unSelectImage = () => {
    const x = Input;
    x['poster']['value'] = '';
    setInput(props => {
      return {...x};
    });
  };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      const x = Input;
      x['poster']['value'] = image.path;
      setInput(props => {
        return {...x};
      });
    });
  };
  return (
    <View style={styles.parent}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          {/* topic  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Topic
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.topic.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      topic: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter Workshop Topic'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={Input.topic.error}
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
                placeholder={'Enter Workshop Description'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                multiLine={true}
                error={Input.description.error}
              />
            </View>
          </View>

          {/* poster  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Poster
              </Text>
            </View>
            <>
              <TouchableOpacity
                style={[
                  styles.imageCardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    height: Input.poster.value === '' ? Height * 0.15 : 'auto',
                    paddingTop: Input.poster.value ? 10 : 0,
                    marginHorizontal:
                      Input.poster.value === '' ? Width * 0.15 : Width * 0.05,
                  },
                ]}
                activeOpacity={0.5}
                onPress={() => handleImagePicker()}>
                <Camera color={theme.GREEN_COLOR} size={1} />
                <Text style={[styles.imageText, {color: theme.DIM_TEXT_COLOR}]}>
                  Upload Image
                </Text>
                <View>
                  {Input.poster.value !== '' && (
                    <View style={styles.imageContainer}>
                      <TouchableOpacity
                        style={styles.crossContainer}
                        onPress={() => unSelectImage()}>
                        <Cross color={theme.GREEN_COLOR} size={0.9} />
                      </TouchableOpacity>
                      <Image
                        source={{uri: Input.poster.value}}
                        style={styles.image}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
              {Input.poster.error !== '' && (
                <View style={{alignItems: 'center'}}>
                  <Text
                    style={[styles.errorText, {color: theme.ERROR_TEXT_COLOR}]}>
                    {Input.poster.error}
                  </Text>
                </View>
              )}
            </>
          </View>

          {/* take away's */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Take Aways
                </Text>
              </View>
              <View style={{flex: 0.1}}>
                <PlusCircle color={theme.GREEN_COLOR} />
              </View>
            </View>
            <HelpText
              text={
                'Provide some key points that the participants will learn at the end of this workhsop.'
              }
            />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.topic.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      topic: {
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
                error={Input.topic.error}
              />
            </View>
          </View>

          {/* pre-requistie  */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  Prerequisites{' '}
                </Text>
              </View>
              <View style={{flex: 0.1}}>
                <PlusCircle color={theme.GREEN_COLOR} />
              </View>
            </View>
            <HelpText
              text={'Specify any prerequisites to attend this workshop.'}
            />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.topic.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      topic: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter a prerequisite'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={Input.topic.error}
              />
            </View>
          </View>

          {/* paid  */}
          <View style={styles.container}>
            <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
              <CheckBox
                onPress={isChecked =>
                  setInput(props => {
                    return {
                      ...props,
                      isPaid:
                        typeof isChecked === 'boolean' ? isChecked : false,
                    };
                  })
                }
                size={18}
              />
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Paid
              </Text>
            </View>
            <HelpText text={'Uncheck if you want to host a free workshop.'} />
            {Input.isPaid && (
              <View style={[styles.subHeadingContainer]}>
                <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
                  <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
                    Charges
                  </Text>
                </View>
                <CustomTextField
                  defaultValue={Input.charges.value}
                  keyboardType={'numeric'}
                  onChangeText={text =>
                    setInput(props => {
                      return {
                        ...props,
                        topic: {
                          value: text,
                          error: '',
                        },
                      };
                    })
                  }
                  placeholder={'Rs 0'}
                  placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                  textContentType={'streetAddressLine2'}
                  maxLength={3}
                  error={Input.charges.error}
                  width={Width * 0.2}
                  height={Width * 0.13}
                />
              </View>
            )}
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
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.9,
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
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    // width: Width * 0.2,
    borderRadius: 10,
  },
  imageContainer: {
    // width: 60,
    // height: 60,
    paddingVertical: 5,
  },
  image: {
    width: Width * 0.7,
    height: Width * 0.8,
    borderRadius: 10,
    marginVertical: 10,
  },
  imageText: {
    fontSize: Sizes.normal * 0.95,
  },
  crossContainer: {
    position: 'absolute',
    top: -1,
    // top: 4,
    left: -15,
  },
  errorText: {
    fontSize: Sizes.small,
  },
});
