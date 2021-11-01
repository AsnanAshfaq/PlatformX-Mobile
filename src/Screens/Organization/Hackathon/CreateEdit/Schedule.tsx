//TODO:
// check if start date is equal to or greater than todays date
// check if time to start hackathon is after 1 hour of publishing hackahton
// check if end date is tomorrow or greater than tomorrow
// check if time to start hackathon is after 1 hour of publishing hackahton
// final reminder should not be empty

import React, {FC, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import CustomTextField from '../../../../Components/CustomTextField2';
import HelpText from '../../../../Components/HelpText';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock} from '../../../../Components/Icons';
import FormHandler from '../../../../Utils/FormHandler';
import {
  handeLocaleNotifications,
  handleScheduleNotifications,
} from '../../../../Utils/Notifications';
type props = {};
const Schedule: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [finalReminder, setFinalReminder] = useState({
    value: '',
    error: '',
  });
  const [date, setDate] = useState({
    start: {value: new Date().toLocaleDateString(), error: ''},
    end: {value: new Date().toLocaleDateString(), error: ''},
  });
  const [time, setTime] = useState({
    start: {value: new Date().toLocaleTimeString(), error: ''},
    end: {value: new Date().toLocaleTimeString(), error: ''},
  });
  const [loading, setLoading] = useState(false);

  const [modal, setmodal] = useState<{
    isShown: boolean;
    mode: 'date' | 'time' | 'datetime';
    type: 'start' | 'end';
  }>({
    isShown: false,
    mode: 'date',
    type: 'start',
  });

  const {isEmpty} = FormHandler();

  const handleSave = () => {
    if (!loading) {
      // setLoading(true);
      // check field validations here
      // make api call here
      // if (isEmpty(finalReminder.value.trim())) {
      //   setFinalReminder(props => {
      //     return {
      //       value: props.value,
      //       error: 'This field is required.',
      //     };
      //   });
      // }
    }
    handeLocaleNotifications();
  };
  return (
    <View style={styles.parent}>
      {/* date picker modal  */}
      <DateTimePicker
        open={modal.isShown}
        date={new Date()}
        mode={modal.mode}
        setDate={response => {
          // hide modal first
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });
          const getDate = new Date(response).toLocaleDateString();

          const getTime = new Date(response).toLocaleTimeString();
          // get mode and type
          const {mode, type} = modal;
          if (mode === 'date') {
            if (type === 'start') {
              setDate(props => {
                return {
                  ...props,
                  start: {
                    value: getDate,
                    error: '',
                  },
                };
              });
            } else if (type === 'end') {
              setDate(props => {
                return {
                  ...props,
                  end: {
                    value: getDate,
                    error: '',
                  },
                };
              });
            }
          } else if (mode === 'time') {
            if (type === 'start') {
              setTime(props => {
                return {
                  ...props,
                  start: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            } else if (type === 'end') {
              setTime(props => {
                return {
                  ...props,
                  end: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
          }
        }}
        cancel={() => {
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          });
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
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
                <Text
                  style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                  Date
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setmodal(props => {
                      return {
                        ...props,
                        isShown: true,
                        mode: 'date',
                        type: 'start',
                      };
                    })
                  }
                  style={[
                    styles.modalContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                  ]}>
                  <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                    {date.start.value}
                  </Text>
                  <View style={styles.iconContainer}>
                    <Calendar size={0.7} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {date.start.error !== '' && (
                  <View style={styles.errorContainer}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {date.start.error}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.rowContainer}>
                <Text
                  style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setmodal(props => {
                      return {
                        ...props,
                        isShown: true,
                        mode: 'time',
                        type: 'start',
                      };
                    })
                  }
                  style={[
                    styles.modalContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                  ]}>
                  <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                    {time.start.value}
                  </Text>
                  <View style={styles.iconContainer}>
                    <Clock size={0.75} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {time.start.error !== '' && (
                  <View style={styles.errorContainer}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {time.start.error}
                    </Text>
                  </View>
                )}
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
                <Text
                  style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                  Date
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setmodal(props => {
                      return {
                        ...props,
                        isShown: true,
                        mode: 'date',
                        type: 'end',
                      };
                    })
                  }
                  style={[
                    styles.modalContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                  ]}>
                  <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                    {date.end.value}
                  </Text>
                  <View style={styles.iconContainer}>
                    <Calendar size={0.7} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {date.end.error !== '' && (
                  <View style={styles.errorContainer}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {date.end.error}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.rowContainer}>
                <Text
                  style={[styles.subHeading, {color: theme.DIM_TEXT_COLOR}]}>
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    setmodal(props => {
                      return {
                        ...props,
                        isShown: true,
                        mode: 'time',
                        type: 'end',
                      };
                    })
                  }
                  style={[
                    styles.modalContainer,
                    {backgroundColor: theme.CARD_BACKGROUND_COLOR},
                  ]}>
                  <Text style={[styles.modalText, {color: theme.TEXT_COLOR}]}>
                    {time.end.value}
                  </Text>
                  <View style={styles.iconContainer}>
                    <Clock size={0.75} color={theme.GREEN_COLOR} />
                  </View>
                </TouchableOpacity>
                {time.end.error !== '' && (
                  <View style={styles.errorContainer}>
                    <Text
                      style={[
                        styles.errorText,
                        {color: theme.ERROR_TEXT_COLOR},
                      ]}>
                      {time.end.error}
                    </Text>
                  </View>
                )}
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
                  'Use this field to remind participants about any last minute work. Note that an email of your final reminider notes will be sent to participants on the last day of hackathon.'
                }
              />
              <CustomTextField
                defaultValue={finalReminder.value}
                keyboardType={'email-address'}
                onChangeText={text =>
                  setFinalReminder(props => {
                    return {
                      value: text,
                      error: '',
                    };
                  })
                }
                placeholder={'Enter final reminders here'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'name'}
                multiLine={true}
                error={finalReminder.error}
              />
            </View>
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
  errorContainer: {
    paddingLeft: 4,
    paddingTop: 8,
  },
  errorText: {
    fontSize: Sizes.small,
  },
  inputContainer: {
    marginTop: 4,
  },
});
