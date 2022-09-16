import { initialState } from './appContext.js';
import {
  HIDE_ALERT,
  SHOW_ALERT,
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
  TOGGLE_SIDEBAR,
  CREATE_JOB_BEGIN,
  CREATE_JOB_ERROR,
  CREATE_JOB_SUCCESS,
  SET_EDIT_JOB,
  SET_SEARCH,
  SET_SORT,
  DELETE_JOB_BEGIN,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  HANDLE_CHANGE_FORM,
  HANDLE_CLEAR_FORM,
  CHANGE_PAGE,
  SET_DATE,
} from './actions';

const reducer = (state, action) => {
  if (action.type === HIDE_ALERT) {
    return {
      ...state,
      alertVisible: false,
      alertText: '',
      alertType: '',
    };
  }
  if (action.type === SHOW_ALERT) {
    const { alertText, alertType } = action.payload;
    return {
      ...state,
      alertVisible: true,
      alertText,
      alertType,
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'success',
      alertText: 'User created. Redirecting',
      userLocation: location || 'my city',
      jobLocation: location || 'my city',
      user,
      token,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'danger',
      alertText: action.payload,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'success',
      alertText: 'Login successful. Redirecting...',
      userLocation: location || 'my city',
      jobLocation: location || 'my city',
      user,
      token,
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'danger',
      alertText: action.payload,
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      user,
      token,
      isLoading: false,
      alertVisible: true,
      alertType: 'success',
      alertText: 'Update successful',
      userLocation: location || 'my city',
      jobLocation: location || 'my city',
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'danger',
      alertText: action.payload,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
    };
  }

  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'danger',
      alertText: action.payload,
    };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      alertVisible: true,
      alertType: 'success',
      alertText: action.payload.msg,
      jobIsEdit: false,
    };
  }
  if (action.type === HANDLE_CHANGE_FORM) {
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
      page: 1,
    };
  }
  if (action.type === HANDLE_CLEAR_FORM) {
    return {
      ...state,
      position: '',
      company: '',
      officeLocation: '',
      jobIsEdit: false,
      jobEditId: '',
      jobSetting: '',
      jobStatus: '',
      jobType: '',
      date: '',
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      alertVisible: false,
    };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.hits,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_SEARCH) {
    return {
      ...state,
      isSearch: action.payload,
    };
  }
  if (action.type === SET_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SET_EDIT_JOB) {
    const { id } = action.payload;
    const job = state.jobs.find((job) => job._id === id);
    const {
      company,
      position,
      officeLocation,
      type: jobType,
      status: jobStatus,
      setting: jobSetting,
    } = job;

    return {
      ...state,
      jobIsEdit: true,
      jobEditId: id,
      company,
      position,
      officeLocation,
      jobType,
      jobSetting,
      jobStatus,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload };
  }
  if (action.type === SET_DATE) {
    return {
      ...state,
      date: action.payload,
      search: true,
      status: 'interview',
    };
  }
  throw new Error(`no matching action ${action.type}`);
};

export default reducer;
