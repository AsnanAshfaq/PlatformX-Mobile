import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';

type props = {};
const Schedule: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({text: '', error: ''});
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
      <Text style={[styles.screenName, {color: theme.TEXT_COLOR}]}>
        Schedule
      </Text>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        horizontal={false}>
        {/* start of hackathon  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Start of Hackathon
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>Date</Text>
            <Text>Time</Text>
          </View>
        </View>
        {/* end of hackathon  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              End of Hackathon
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Text>Date</Text>
            <Text>Time</Text>
          </View>
        </View>
        {/* final reminder  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              Final Reminder
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <HelpText
              text={
                'Use this field to remind participants about any last minute work.'
              }
            />
            <CustomTextField
              defaultValue={Input.text}
              keyboardType={'email-address'}
              onChangeText={text =>
                setInput(props => {
                  return {
                    text: text,
                    error: '',
                  };
                })
              }
              placeholder={'Enter final reminders here'}
              placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
              textContentType={'name'}
              multiLine={true}
              error={Input.error}
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

export default Schedule;

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
});
