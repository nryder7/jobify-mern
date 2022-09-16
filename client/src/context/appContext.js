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
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  LOGOUT_USER,
  HANDLE_CHANGE_FORM,
  HANDLE_CLEAR_FORM,
  SET_SEARCH,
  SET_SORT,
  SET_DATE,
  CHANGE_PAGE,
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
  officeLocation: '',
  jobSetting: '',
  jobType: '',
  jobStatus: '',
  jobs: [],
  hits: 0,
  numOfPages: 1,
  page: 1,
  isSearch: false,
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'created.new',
  date: '',
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

  const createJob = async (job) => {
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
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_FORM,
      payload: { name, value },
    });
  };

  const setFilter = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE_FORM,
      payload: { name, value },
    });
  };
  const clearForm = () => {
    dispatch({
      type: HANDLE_CLEAR_FORM,
    });
  };

  const getJobs = async () => {
    let url = `/jobs/?page=${state.page}&sort=${state.sort}&date=${state.date}`;
    if (state.isSearch) {
      url =
        url +
        `&company=${state.company}&position=${state.position}&officeLocation=${state.officeLocation}&jobSetting=${state.jobSetting}&jobType=${state.jobType}&status=${state.jobStatus}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(`${url}`);
      const { jobs, hits, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, hits, numOfPages },
      });
    } catch (error) {
      logoutUser();
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
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch('/jobs/stats');
      dispatch({ type: SHOW_STATS_SUCCESS, payload: data });
    } catch (error) {
      logoutUser();
    }
  };
  const resetFilters = () => {
    console.log('reset filters');
  };
  const setIsSearch = (flag) => {
    dispatch({ type: SET_SEARCH, payload: flag });
  };
  const setSort = (e) => {
    dispatch({ type: SET_SORT, payload: e.target.value });
  };

  const setPage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
  const setDate = (date) => {
    dispatch({ type: SET_DATE, payload: date });
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
        showStats,
        resetFilters,
        setIsSearch,
        setSort,
        setPage,
        setDate,
        setFilter,
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
