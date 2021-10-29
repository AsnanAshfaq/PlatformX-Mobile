import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CustomTextField from '../../../../Components/CustomTextField2';
import CustomButton from '../../../../Components/CustomButton';

type Props = {};

const JudgeForm: FC<Props> = () => {
  return (
    <View>
      <Text>This is the judge form</Text>
    </View>
  );
};

type props = {};

const Judges: FC<props> = () => {
  const {theme} = useStateValue()[0];
  const [judges, setJudges] = useState([
    {
      name: {value: '', error: ''},
      email: {value: '', error: ''},
      image: {value: '', error: ''},
    },
  ]);
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
      <Text style={[styles.screenName, {color: theme.TEXT_COLOR}]}>Judges</Text>
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
              defaultValue={judges[0].name.value}
              keyboardType={'default'}
              onChangeText={text =>
                setJudges(props => {
                  return [
                    {
                      ...props[0],
                      name: {
                        value: text,
                        error: '',
                      },
                    },
                  ];
                })
              }
              placeholder={'Enter judge name'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              maxLength={30}
              error={judges[0].name.error}
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
              defaultValue={judges[0].email.value}
              keyboardType={'default'}
              onChangeText={text =>
                setJudges(props => {
                  return [
                    {
                      ...props[0],
                      email: {
                        value: text,
                        error: '',
                      },
                    },
                  ];
                })
              }
              placeholder={'Enter judge email address'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              maxLength={30}
              error={judges[0].email.error}
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

export default Judges;

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
    fontSize: Sizes.normal * 0.85,
  },
  inputContainer: {
    marginTop: 4,
    marginLeft: Width * 0.015,
    // alignItems: 'center',
  },
});
