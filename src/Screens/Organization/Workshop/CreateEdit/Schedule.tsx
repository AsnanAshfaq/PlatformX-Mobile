import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../../../../Components/CustomButton';
import {Height, Sizes, Width} from '../../../../Constants/Size';
import {useStateValue} from '../../../../Store/StateProvider';
import CheckBox from '../../../../Components/CheckBox';
import {hackathonThemeTags} from '../../../../Constants/sample';
import HelpText from '../../../../Components/HelpText';
import DateTimePicker from '../../../../Components/DateTimePicker';
import {Calendar, Clock, PlusCircle} from '../../../../Components/Icons';
import CustomTextField from '../../../../Components/CustomTextField2';

type Props = {};
const BreakDowns: FC<Props> = ({}) => {
  const {theme} = useStateValue()[0];

  const [breakDowns, setbreakDowns] = useState({
    time: {value: new Date().toLocaleTimeString(), error: ''},
    activity: {value: '', error: ''},
  });

  const [modal, setmodal] = useState(false);

  const openModal = () => {
    setmodal(true);
  };
  return (
    <>
      <DateTimePicker
        open={modal}
        date={new Date()}
        mode={'time'}
        setDate={response => {
          // hide modal first
          setmodal(false);
          const getTime = new Date(response).toLocaleTimeString();
          setbreakDowns(props => {
            return {
              ...props,
              time: {
                value: getTime,
                error: '',
              },
            };
          });
        }}
        cancel={() => setmodal(false)}
      />
      <View
        style={{
          // marginHorizontal: Width * 0.009,
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'center',
        }}>
        <View
          style={[
            styles.subHeadingContainer,
            {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[styles.headingContainer, {flexDirection: 'row'}]}>
            <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
              Time
            </Text>
          </View>
          <View style={styles.breakDownListContainer}>
            <TouchableOpacity
              onPress={openModal}
              style={[
                styles.cardContainer,
                {
                  backgroundColor: theme.CARD_BACKGROUND_COLOR,
                  width: Width * 0.4,
                },
              ]}>
              <View style={styles.cardTextContainer}>
                <Text
                  style={[styles.breakDownTimeText, {color: theme.TEXT_COLOR}]}>
                  {breakDowns.time.value}
                </Text>
              </View>
              <View style={styles.cardIconContainer}>
                <Clock size={0.7} color={theme.GREEN_COLOR} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.subHeadingContainer,
            {flex: 0.5, justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={[styles.headingContainer]}>
            <Text style={[styles.subHeading, {color: theme.TEXT_COLOR}]}>
              Activity
            </Text>
          </View>
          <View style={styles.breakDownListContainer}>
            <View
              style={[
                {
                  marginTop: 10,
                  padding: 8,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: Width * 0.4,
                },
              ]}>
              <CustomTextField
                defaultValue={''}
                keyboardType={'default'}
                onChangeText={text => console.log('Activity text is', text)}
                placeholder={'Enter an activity'}
                placeholderColor={theme.PLACE_HOLDER_TEXT_COLOR}
                textContentType={'streetAddressLine2'}
                //   maxLength={3}
                error={''}
                width={Width * 0.4}
                height={Width * 0.11}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
type props = {};

const Schedule: FC<props> = () => {
  const {theme} = useStateValue()[0];

  const [Input, setInput] = useState({
    event_date: {value: new Date().toLocaleDateString(), error: ''},
    start_time: {value: new Date().toLocaleTimeString(), error: ''},
    end_time: {value: new Date().toLocaleTimeString(), error: ''},
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

          //   get type of modal
          const {mode, type} = modal;
          const getDate = new Date(response).toLocaleDateString();
          const getTime = new Date(response).toLocaleTimeString();

          if (mode === 'date') {
            setInput(props => {
              return {
                ...props,
                event_date: {
                  value: getDate,
                  error: '',
                },
              };
            });
          } else {
            if (mode === 'time' && type === 'start') {
              setInput(props => {
                return {
                  ...props,
                  start_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
            if (mode === 'time' && type === 'end') {
              setInput(props => {
                return {
                  ...props,
                  end_time: {
                    value: getTime,
                    error: '',
                  },
                };
              });
            }
          }
        }}
        cancel={() =>
          setmodal(props => {
            return {
              ...props,
              isShown: false,
            };
          })
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          horizontal={false}>
          {/* event date container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Event Date
              </Text>
            </View>
            <View style={styles.center}>
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
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.event_date.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Calendar size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* start time container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                Start Time
              </Text>
            </View>
            <View style={styles.center}>
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
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.start_time.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Clock size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* end time container  */}
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                End Time
              </Text>
            </View>
            <View style={styles.center}>
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
                  styles.cardContainer,
                  {
                    backgroundColor: theme.CARD_BACKGROUND_COLOR,
                    width: Width * 0.65,
                  },
                ]}>
                <View style={styles.cardTextContainer}>
                  <Text style={[styles.cardText, {color: theme.TEXT_COLOR}]}>
                    {Input.end_time.value}
                  </Text>
                </View>
                <View style={styles.cardIconContainer}>
                  <Clock size={0.9} color={theme.GREEN_COLOR} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {/* breakdown container */}
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={[styles.headingContainer, {flex: 0.9}]}>
                <Text style={[styles.heading, {color: theme.TEXT_COLOR}]}>
                  BreakDown{' '}
                </Text>
              </View>
              <View style={{flex: 0.1}}>
                <PlusCircle color={theme.GREEN_COLOR} />
              </View>
            </View>
            <HelpText
              text={
                'List the timeline of your workshop with respect to workshop activities.'
              }
            />
            {/* time an activity container  */}
            <BreakDowns />
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
  heading: {
    fontSize: Sizes.normal * 1.1,
  },
  subHeadingContainer: {
    marginTop: 5,
    marginLeft: 10,
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
  cardContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'transparent',
  },
  cardTextContainer: {
    flex: 0.85,
    alignItems: 'center',
  },
  cardIconContainer: {
    flex: 0.15,
    marginLeft: 8,
  },
  cardText: {
    fontSize: Sizes.normal,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakDownListContainer: {},
  breakDownTimeText: {
    fontSize: Sizes.normal * 0.85,
  },
});
