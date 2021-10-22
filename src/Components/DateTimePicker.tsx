import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

type props = {
  open: boolean;
  date: Date;
  setDate: (date) => void;
  mode: 'date' | 'time' | 'datetime';
};
const DateTimePicker: FC<props> = ({open = false, date, setDate, mode}) => {
  return (
    <>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={mode}
        onConfirm={date => {
          setDate(date);
        }}
        onCancel={() => {
          //   setOpen(false);
          console.log('Cancelling modal');
        }}
      />
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({});
