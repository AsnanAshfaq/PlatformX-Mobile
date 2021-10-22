import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock} from '../../../../Components/Icons';

type props = {};
const Schedule: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({text: '', error: ''});
  const [loading, setLoading] = useState(false);

  const [modal, setmodal] = useState<{
    isShown: boolean;
    mode: 'date' | 'time' | 'datetime';
    start: {
      date: any;
      time: any;
    };
    end: {
      date: any;
      time: any;
    };
  }>({
    isShown: false,
    mode: 'date',
    start: {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().toString(),
    },
    end: {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString().toString(),
    },
  });
  const handleSave = () => {
    if (!loading) {
      // setLoading(true);
      // check field validations here
      // make api call here
    }
  };
  return (
    <View style={styles.parent}>
      {/* date picker modal  */}
      <DateTimePicker
        open={modal.isShown}
        date={new Date()}
        mode={modal.mode}
        setDate={date => {
          console.log('Selected date is', date);
        }}
      />
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
          <View style={styles.subHeadingContainer}>
            <View style={styles.rowContainer}>
              <Text style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                Date
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'date',
                    };
                  })
                }
                style={[
                  styles.modalContainer,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                  {new Date().toLocaleDateString()}
                </Text>
                <View style={styles.iconContainer}>
                  <Calendar size={0.7} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Text style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                Time
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'time',
                    };
                  })
                }
                style={[
                  styles.modalContainer,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                  {new Date().toLocaleTimeString()}
                </Text>
                <View style={styles.iconContainer}>
                  <Clock size={0.75} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* end of hackathon  */}
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
              End of Hackathon
            </Text>
          </View>
          <View style={styles.subHeadingContainer}>
            <View style={styles.rowContainer}>
              <Text style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                Date
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'date',
                    };
                  })
                }
                style={[
                  styles.modalContainer,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                  {new Date().toLocaleDateString()}
                </Text>
                <View style={styles.iconContainer}>
                  <Calendar size={0.7} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Text style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                Time
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setmodal(props => {
                    return {
                      ...props,
                      isShown: true,
                      mode: 'time',
                    };
                  })
                }
                style={[
                  styles.modalContainer,
                  {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                ]}>
                <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                  {new Date().toLocaleTimeString()}
                </Text>
                <View style={styles.iconContainer}>
                  <Clock size={0.75} />
                </View>
              </TouchableOpacity>
            </View>
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
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
    flexDirection: 'row',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: Width * 0.015,
  },
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeading: {
    fontSize: Sizes.normal * 0.85,
  },
  modalContainer: {
    maxWidth: Width * 0.33,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  modalText: {
    fontSize: Sizes.normal * 0.8,
  },
  iconContainer: {
    marginLeft: 8,
  },
  inputContainer: {
    marginTop: 4,
  },
});
