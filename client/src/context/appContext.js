import axios from 'axios';
import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import jobFormOptions from '../utils/form';

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
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  LOGOUT_USER,
  HANDLE_CHANGE_FORM,
  HANDLE_CLEAR_FORM,
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
  jobIsEdit: false,
  jobEditId: '',
  position: '',
  company: '',
  officeLocation: localStorage.getItem('officeLocation') || null,
  jobSetting: localStorage.getItem('jobSetting') || 'office',
  jobType: localStorage.getItem('jobType') || 'full-time',
  jobStatus: localStorage.getItem('jobStatus') || 'pending',
  jobs: [],
  hits: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: '/api/v1',
  });

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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
    setTimeout(() => {
      dispatch({
        type: HIDE_ALERT,
      });
    }, 2500);
  };
  const showAlert = (alertText, alertType) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alertText,
        alertType,
      },
    });
    hideAlert();
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
    hideAlert();
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
    hideAlert();
  };

  const logoutUser = () => {
    removeLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('/auth/update', currentUser);
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
      setLocalStorage(data);
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: error.response.data.msg,
        });
      }
    }
    hideAlert();
  };

  const createJob = async () => {
    const {
      position,
      company,
      officeLocation,
      jobStatus,
      jobSetting,
      jobType,
    } = state;

    const job = {
      position,
      company,
      officeLocation,
      jobStatus,
      jobSetting,
      jobType,
    };

    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      if (state.jobIsEdit) {
        await authFetch.patch(`/jobs/${state.jobEditId}`, job);
        dispatch({ type: CREATE_JOB_SUCCESS, payload: { msg: 'Job Updated' } });
        dispatch({ type: HANDLE_CLEAR_FORM });
      } else {
        await authFetch.post(`/jobs`, job);
        dispatch({ type: CREATE_JOB_SUCCESS, payload: { msg: 'Job Created' } });
        dispatch({ type: HANDLE_CLEAR_FORM });
      }
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: CREATE_JOB_ERROR, payload: error.response.data.msg });
    }
    hideAlert();
  };

  const handleChange = (e) => {
    dispatch({
      type: HANDLE_CHANGE_FORM,
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const clearForm = () => {
    dispatch({
      type: HANDLE_CLEAR_FORM,
    });
  };

  const getJobs = async () => {
    let url = `/jobs`;
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(`${url}`);
      const { jobs, hits, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, hits, numOfPages },
      });
    } catch (error) {
      console.log(error);
    }
    hideAlert();
  };

  const setIsEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const deleteJob = async (id) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    let url = `/jobs/${id}`;
    try {
      await authFetch.delete(`${url}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
        hideAlert,
        showAlert,
        loginUser,
        registerUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        createJob,
        getJobs,
        clearForm,
        setIsEditJob,
        deleteJob,
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
