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

const usersReducer = (state = STATE, action) => {
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

export default usersReducer;