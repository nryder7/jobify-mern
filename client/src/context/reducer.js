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
  HANDLE_CHANGE_FORM,
  HANDLE_CLEAR_FORM,
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
      alertText: 'Job created',
    };
  }
  if (action.type === HANDLE_CHANGE_FORM) {
    const { name, value } = action.payload;
    return {
      ...state,
      [name]: value,
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
    };
  }

  throw new Error(`no matching action ${action.type}`);
};

export default reducer;
