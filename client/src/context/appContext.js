import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from './reducer';

import {
  HIDE_ALERT,
  SHOW_ALERT,
  TOGGLE_SIDEBAR,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
} from './actions';

const initialState = {
  isLoading: false,
  alertText: '',
  alertType: '',
  alertVisible: false,
  showSidebar: false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  userLocation: localStorage.getItem('userLocation') || 'my city',
  jobLocation: localStorage.getItem('jobLocation') || null,
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

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
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

  const logoutUser = () => {
    removeLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axios.patch('api/v1/auth/update', currentUser, {
        headers: { Authorization: `Bearer ${state.token}` },
      });
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
      setLocalStorage(data);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: error.response.data.msg,
      });
    }
    setTimeout(() => {
      hideAlert();
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        hideAlert,
        showAlert,
        loginUser,
        registerUser,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
