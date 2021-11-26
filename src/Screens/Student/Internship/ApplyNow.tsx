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

type Props = {
  onPress: () => void;
};
const UploadComponent: FC<Props> = ({onPress}) => {
  const {theme} = useStateValue()[0];
  return (
    <View style={styles.center}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.CARD_BACKGROUND_COLOR,
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
  );
};
type props = {
  navigation: any;
};
const ApplyNow: FC<props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const {theme} = useStateValue()[0];
  const [Input, setInput] = useState({
    github: {value: '', error: ''},
    linkedin: {value: '', error: ''},
    portfolio: {value: '', error: ''},
  });

  const {isLinkValid, isEmpty} = FormHandler();

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const handleCVUpload = () => {};
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
                Github
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
                LinkedIn
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
                CV
              </Text>
            </View>
            <UploadComponent onPress={handleCVUpload} />
          </View>

          {/* resume  container*/}
          <View style={[styles.container]}>
            <View style={styles.headingContainer}>
              <Text style={[styles.headingText, {color: theme.TEXT_COLOR}]}>
                Resume
              </Text>
            </View>
            <UploadComponent onPress={handleResumeUpload} />
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
