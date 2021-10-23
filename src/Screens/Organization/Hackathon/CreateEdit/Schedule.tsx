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

  const [Input, setInput] = useState({
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
                'Use this field to remind participants about any last minute work. Note that an email of your final reminider notes will be sent to participants on the last day of hackathon.'
              }
            />
            <CustomTextField
              defaultValue={Input.value}
              keyboardType={'email-address'}
              onChangeText={text =>
                setInput(props => {
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
