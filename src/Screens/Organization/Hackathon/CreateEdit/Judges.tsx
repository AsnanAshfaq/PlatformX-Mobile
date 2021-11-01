import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CustomTextField from '../../../../Components/CustomTextField2';
import CustomButton from '../../../../Components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Cross, PlusCircle} from '../../../../Components/Icons';

type Props = {};

const JudgingCriteria: FC<Props> = () => {
  return (
    <View>
      <Text>This is the judge form</Text>
    </View>
  );
};

type props = {};

const Judges: FC<props> = () => {
  const {theme} = useStateValue()[0];
  const [judges, setJudges] = useState({
    name: {value: '', error: ''},
    email: {value: '', error: ''},
    image: {value: '', error: ''},
  });
  const [criteria, setcriteria] = useState({
    title: {value: '', error: ''},
    description: {value: '', error: ''},
  });
  const [loading, setLoading] = useState(false);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      freeStyleCropEnabled: true,
    }).then(image => {
      const x = judges;
      x['image']['value'] = image.path;
      setJudges(props => {
        return {...x};
      });
    });
  };

  const unSelectImage = () => {
    const x = judges;

    x['image']['value'] = '';
    setJudges(props => {
      return {...x};
    });
  };
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
        {/* name  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Name
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={judges.name.value}
              keyboardType={'default'}
              onChangeText={text =>
                setJudges(props => {
                  return {
                    ...props,
                    name: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter judge name'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              maxLength={30}
              error={judges.name.error}
            />
          </View>
        </View>
        {/* email  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Email
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <CustomTextField
              defaultValue={judges.email.value}
              keyboardType={'default'}
              onChangeText={text =>
                setJudges(props => {
                  return {
                    ...props,
                    name: {
                      value: text,
                      error: '',
                    },
                  };
                })
              }
              placeholder={'Enter judge email address'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              maxLength={30}
              error={judges.email.error}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Image
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.imageCardContainer,
              {
                backgroundColor: theme.CARD_BACKGROUND_COLOR,
                height: judges.image.value === '' ? Height * 0.15 : 'auto',
                paddingTop: judges.image.value ? 10 : 0,
              },
            ]}
            activeOpacity={0.5}
            onPress={() => handleImagePicker()}>
            <Camera color={theme.GREEN_COLOR} size={1} />
            <Text style={[styles.imageText, {color: theme.DIM_TEXT_COLOR}]}>
              Upload Image
            </Text>
            <View>
              {judges.image.value !== '' && (
                <View style={styles.imageContainer}>
                  <TouchableOpacity
                    style={styles.crossContainer}
                    onPress={() => unSelectImage()}>
                    <Cross color={theme.GREEN_COLOR} size={0.9} />
                  </TouchableOpacity>
                  <Image
                    source={{uri: judges.image.value}}
                    style={styles.image}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
          {judges.image.error !== '' && (
            <View style={{alignItems: 'center'}}>
              <Text style={[styles.errorText, {color: theme.ERROR_TEXT_COLOR}]}>
                {judges.image.error}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={[styles.screenName, {color: theme.TEXT_COLOR}]}>
                Judging Criteria
              </Text>
            </View>

            <View
              style={{
                flex: 0.2,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <PlusCircle color={theme.GREEN_COLOR} size={0.9} />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Title
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={criteria.title.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setcriteria(props => {
                    return {
                      ...props,
                      title: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter title'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={criteria.title.error}
              />
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Description
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextField
                defaultValue={criteria.description.value}
                keyboardType={'default'}
                onChangeText={text =>
                  setcriteria(props => {
                    return {
                      ...props,
                      description: {
                        value: text,
                        error: '',
                      },
                    };
                  })
                }
                placeholder={'Enter description'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                maxLength={30}
                error={criteria.description.error}
              />
            </View>
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

export default Judges;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: Width * 0.04,
    marginTop: Height * 0.025,
  },
  screenName: {
    fontSize: Sizes.normal * 1.1,
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
    fontSize: Sizes.normal * 0.85,
  },
  inputContainer: {
    marginTop: 4,
    marginLeft: Width * 0.015,
    // alignItems: 'center',
  },
  imageCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // minHeight: Height * 0.14,
    marginTop: 10,
    marginHorizontal: Width * 0.15,
    // width: Width * 0.2,
    borderRadius: 10,
  },
  imageContainer: {
    // width: 60,
    // height: 60,
    paddingVertical: 5,
  },
  image: {
    width: Width * 0.5,
    height: Width * 0.5,
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
