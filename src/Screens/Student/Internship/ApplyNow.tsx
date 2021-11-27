import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../Components/CustomButton';
import CustomHeader from '../../../Components/CustomHeader';
import CustomTextField from '../../../Components/CustomTextField2';
import HelpText from '../../../Components/HelpText';
import {CodeDownload, FileUpload} from '../../../Components/Icons';
import Loading from '../../../Components/Loading';
import {Sizes, Width} from '../../../Constants/Size';
import {useStateValue} from '../../../Store/StateProvider';
import FormHandler from '../../../Utils/FormHandler';
import FilePickerManager from 'react-native-file-picker';

type Props = {
  error: string;
  onPress: () => void;
};
const UploadComponent: FC<Props> = ({error, onPress}) => {
  const {theme} = useStateValue()[0];
  return (
    <>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.cardContainer,
            {
              backgroundColor: theme.CARD_BACKGROUND_COLOR,
              borderColor:
                error !== ''
                  ? theme.ERROR_TEXT_COLOR
                  : theme.CARD_BACKGROUND_COLOR,
            },
          ]}>
          <View style={styles.cardTextContainer}>
            <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
              Upload
            </Text>
          </View>
          <View style={styles.cardIconContainer}>
            <FileUpload size={1} color={theme.GREEN_COLOR} />
          </View>
        </TouchableOpacity>
      </View>
      {error !== '' && (
        <View style={{alignItems: 'center'}}>
          <Text style={[{color: theme.ERROR_TEXT_COLOR}, styles.smallText]}>
            {error}
          </Text>
        </View>
      )}
      <View style={styles.center}>
        <Text
          style={{color: theme.DIM_TEXT_COLOR, fontSize: Sizes.small * 0.75}}>
          File can only be of the type .pdf, .doc or .docx
        </Text>
      </View>
    </>
  );
};
type props = {
  navigation: any;
};
const ApplyNow: FC<props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {theme} = useStateValue()[0];
  const [Input, setInput] = useState({
    github: {value: 'https://github.com/AsnanAshfaq', error: ''},
    linkedin: {value: 'https://www.linkedin.com/feed/', error: ''},
    portfolio: {value: '', error: ''},
    cv: {value: '', error: ''},
    resume: {value: '', error: ''},
  });

  const {isLinkValid, isEmpty} = FormHandler();

  const handleApply = () => {
    var isAllInputValid = true;
    const x = Input;
    if (isEmpty(Input.github.value)) {
      x['github']['error'] = 'This field is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.github.value)) {
      x['github']['error'] = 'Link is not valid.';
      isAllInputValid = false;
    }
    if (isEmpty(Input.linkedin.value)) {
      x['linkedin']['error'] = 'This field is required.';
      isAllInputValid = false;
    } else if (!isLinkValid(Input.linkedin.value)) {
      x['linkedin']['error'] = 'Link is not valid.';
      isAllInputValid = false;
    }

    if (isEmpty(Input.cv.value)) {
      x['cv']['error'] = 'CV is required.';
    }

    setInput(props => {
      return {...x};
    });
  };

  const handleCVUpload = () => {
    FilePickerManager.showFilePicker(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled file picker');
      } else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      } else {
        // this.setState({
        //   file: response,
        // });
      }
    });
  };
  const handleResumeUpload = () => {};
  return (
    <View
      style={[
        styles.parent,
        {
          backgroundColor: theme.SCREEN_BACKGROUND_COLOR,
        },
      ]}>
      <CustomHeader
        title={'Apply Now'}
        navigation={navigation}
        back
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Github <Text style={{color: theme.ERROR_TEXT_COLOR}}>*</Text>
              </Text>
            </View>
            <HelpText text={'Provide your Github URL.'} />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.github.value}
                keyboardType={'number-pad'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      github: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter Github URL'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                error={Input.github.error}
              />
            </View>
          </View>
          {/* linked in url  */}
          <View>
            <View>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                LinkedIn <Text style={{color: theme.ERROR_TEXT_COLOR}}>*</Text>
              </Text>
            </View>
            <HelpText text={'Provide your LinkedIn URL.'} />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.linkedin.value}
                keyboardType={'number-pad'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      linkedin: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter LinkedIn URL'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                error={Input.linkedin.error}
              />
            </View>
          </View>

          {/* cv container */}

          <View>
            <View>
              <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                Curriculum Vitae (CV){' '}
                <Text style={{color: theme.ERROR_TEXT_COLOR}}>*</Text>
              </Text>
            </View>
            <UploadComponent error={Input.cv.error} onPress={handleCVUpload} />
          </View>

          {/* resume  container*/}
          <View style={[styles.container]}>
            <View style={styles.headingContainer}>
              <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                Resume
              </Text>
            </View>
            <UploadComponent
              error={Input.resume.error}
              onPress={handleResumeUpload}
            />
          </View>

          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Portfolio Link
              </Text>
            </View>
            <HelpText text={'Provide your portfolio URL.'} />
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={Input.portfolio.value}
                keyboardType={'number-pad'}
                onChangeText={text =>
                  setInput(props => {
                    return {
                      ...props,
                      portfolio: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter Portfolio URL'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                error={Input.portfolio.error}
              />
            </View>
          </View>
          <View>
            <Text style={[styles.smallText, {color: theme.DIM_TEXT_COLOR}]}>
              Note: An email will be sent to you if you get shortlisted for the
              interview
            </Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton text={'Apply'} onPress={handleApply} loading={loading} />
    </View>
  );
};

export default ApplyNow;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  scroll: {
    marginHorizontal: Width * 0.04,
    marginBottom: 10,
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
  headingContainer: {
    marginVertical: 2,
  },
  headingText: {
    fontSize: Sizes.normal * 1.1,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  inputContainer: {
    marginTop: 4,
  },
  cardTextContainer: {
    flex: 0.82,
    paddingLeft: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconContainer: {
    flex: 0.18,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    width: Width * 0.56,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  margin: {
    marginHorizontal: Width * 0.04,
  },
});
