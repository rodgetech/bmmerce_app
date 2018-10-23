import {
  combineReducers
} from "redux";
import types from './types';

const STATE = {
  gettingUsers: false,
  users: [],
  totalPages: 0,
  currentPage: 0,
  empty: false
}

const LATEST_USERS_STATE = {
  gettingUsers: false,
  users: [],
}

const defaultReducer = (state = STATE, action) => {
  switch (action.type) {
    case types.GET_USERS:
      {
        return {
          ...state,
          gettingUsers: true,
        }
      }

    case types.GET_USERS_SUCCESS:
      {
        const {
          users,
          totalPages,
          currentPage
        } = action;
        return {
          ...state,
          totalPages,
          currentPage,
          users: currentPage === 1 ? users : [...state.users, ...users],
          gettingUsers: false,
          empty: users.length > 0 ? false : true
        }
      }

    default:
      return state;
  }
}

const latestUsersReducer = (state = LATEST_USERS_STATE, action) => {
  switch (action.type) {
    case types.GET_LATEST_USERS:
      {
        return {
          ...state,
          gettingUsers: true,
        }
      }

    case types.GET_LATEST_USERS_SUCCESS:
      {
        const {
          users,
        } = action;
        return {
          ...state,
          users,
          gettingUsers: false,
        }
      }

    default:
      return state;
  }
}

const usersReducer = combineReducers({
  default: defaultReducer,
  latestUsers: latestUsersReducer,
});

export default usersReducer;