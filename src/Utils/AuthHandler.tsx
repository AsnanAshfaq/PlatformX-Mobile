// TODO:
// we will have two handlers. one for sign in and other for sign up
import React, {useState} from 'react';

type key = {
  value: string;
  error: string;
};
const AuthHandler = () => {
  const isEmpty = (value: string) => {
    return value.trim().length === 0 ? true : false;
  };

  const checkLength = (value: string, min: number, max: number) => {
    return value.trim().length < min
      ? 'min'
      : value.trim().length > max
      ? 'max'
      : '';
  };

  const isEmailValid = (value: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegex.test(String(value).toLowerCase()) ? false : true;
  };

  const isSame = (value1: string, value2: string) => {
    return value1.trim() != value2.trim() ? false : true;
  };

  return {
    isEmailValid,
    isEmpty,
    isSame,
    checkLength,
  };
};

export default AuthHandler;
