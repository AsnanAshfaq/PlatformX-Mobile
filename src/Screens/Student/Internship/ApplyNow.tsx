/* eslint-disable dot-notation */
import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
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
import DocumentPicker from 'react-native-document-picker';
import axios from '../../../Utils/Axios';

type Props = {
  value: any;
  error: string;
  onPress: () => void;
};
const UploadComponent: FC<Props> = ({value, error, onPress}) => {
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
              {value !== ''
                ? value.length > 10
                  ? `File ${value.slice(0, 10)}...`
                  : `File ${value}`
                : 'Upload'}
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
          File can only be of the type .pdf
        </Text>
      </View>
    </>
  );
};
type props = {
  route: any;
  navigation: any;
};
const ApplyNow: FC<props> = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const {theme} = useStateValue()[0];
  const [Input, setInput] = useState({
    github: {value: 'https://github.com/AsnanAshfaq', error: ''},
    linkedin: {value: 'https://www.linkedin.com/feed/', error: ''},
    portfolio: {value: '', error: ''},
    cv: {
      value: {
        name: '',
        uri: '',
      },
      error: '',
    },
    resume: {
      value: {
        name: '',
        uri: '',
      },
      error: '',
    },
  });
  const {ID} = route.params;

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

    if (isEmpty(Input.cv.value.name)) {
      x['cv']['error'] = 'CV is required.';
      isAllInputValid = false;
    }

    if (
      !isEmpty(Input.portfolio.value) &&
      !isLinkValid(Input.portfolio.value)
    ) {
      x['portfolio']['error'] = 'Link is not valid.';
      isAllInputValid = false;
    }

    setInput(props => {
      return {...x};
    });

    if (isAllInputValid) {
      setLoading(true);
      console.log('Safe to make api call');

      const bodyData = new FormData();
      const data = {
        github: Input.github.value.trim(),
        linked_in: Input.linkedin.value.trim(),
        cv: Input.cv.value.uri,
      };

      bodyData.append('github', Input.github.value.trim());
      bodyData.append('linked_in', Input.linkedin.value.trim());
      bodyData.append('cv', Input.cv.value);
      if (!isEmpty(Input.portfolio.value)) {
        bodyData.append('portfolio', Input.portfolio.value.trim());
        data['portfolio'] = Input.portfolio.value.trim();
      }

      axios({
        method: 'post',
        url: `/api/internship/${ID}/apply/`,
        // data: data,
        body: bodyData,
        header: {'Content-Type': 'application/form-data'}, //multipart/form-data
      })
        .then(respose => {
          if (respose.status === 201) {
            ToastAndroid.show(respose.data.success, 1500);
            navigation.pop(2);
          }
        })
        .catch(error => {
          if (error.response) {
            ToastAndroid.show(error.response.data.error, 1500);
          }
          return error.response;
        });
      setLoading(false);
      // make api call
    } else {
      setLoading(false);
    }
  };

  const handleFileUpload = async (Key: string) => {
    // Pick a single file
    const x = Input;
    try {
      const res: any = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
        ],
      });
      if (res[0].type === 'application/pdf') {
        // file type is valid

        x[Key]['value']['name'] = res[0].name;
        x[Key]['value']['uri'] = res[0];
        x[Key]['error'] = '';
        setInput(props => {
          return {
            ...props,
            ...x,
          };
        });
      } else {
        x[Key]['value'] = '';
        x[Key]['error'] = 'Invalid file type.';
        setInput(props => {
          return {
            ...props,
            ...x,
          };
        });
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
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
                keyboardType={'default'}
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
                keyboardType={'default'}
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
            <UploadComponent
              error={Input.cv.error}
              value={Input.cv.value.name}
              onPress={() => handleFileUpload('cv')}
            />
          </View>

          {/* resume  container*/}
          <View style={[styles.container]}>
            <View style={styles.headingContainer}>
              <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                Resume
              </Text>
            </View>
            <UploadComponent
              value={Input.resume.value.name}
              error={Input.resume.error}
              onPress={() => handleFileUpload('resume')}
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
                keyboardType={'default'}
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
              interview.
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
