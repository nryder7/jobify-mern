import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from './reducer';

import {
  HIDE_ALERT,
  SHOW_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from './actions';

const initialState = {
  isLoading: false,
  alertText: '',
  alertType: '',
  alertVisible: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  userLocation: localStorage.getItem('userLocation') || '',
  jobLocation: localStorage.getItem('jobLocation') || '',
  //   alert: { show: true, type: 'danger', msg: 'enter value' },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const removeLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  };
  const setLocalStorage = ({ user, token, userLocation }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', userLocation || 'my city');
  };

  const hideAlert = (text, type) => {
    dispatch({
      type: HIDE_ALERT,
    });
  };
  const showAlert = (alertText, alertType) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alertText,
        alertType,
      },
    });
    setTimeout(() => {
      hideAlert();
    }, 2500);
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post('api/v1/auth/register', currentUser);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      setLocalStorage(data);
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data.msg });
      removeLocalStorage();
    }
    setTimeout(() => {
      hideAlert();
    }, 1500);
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post('api/v1/auth/login', currentUser);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
      setLocalStorage(data);
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.response.data.msg,
      });
      removeLocalStorage();
    }
    setTimeout(() => {
      hideAlert();
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{ ...state, hideAlert, showAlert, loginUser, registerUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
