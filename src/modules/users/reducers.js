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

const USER_STATE = {
  gettingUser: false,
  user: {},
  gettingListings: false,
  listings: [],
  empty: false
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

const userReducer = (state = USER_STATE, action) => {
  switch (action.type) {
    case types.GET_USER:
      {
        return {
          ...state,
          gettingUser: true,
        }
      }

    case types.GET_USER_SUCCESS:
      {
        const {
          user,
        } = action;
        return {
          ...state,
          user,
          gettingUser: false,
        }
      }

      case types.GET_USER_LISTINGS:
      {
        return {
          ...state,
          gettingListings: true,
        }
      }

    case types.GET_USER_LISTINGS_SUCCESS:
      {
        const {
          listings,
          totalPages,
          currentPage
        } = action;
        return {
          ...state,
          totalPages,
          currentPage,
          listings: currentPage === 1 ? listings : [...state.listings, ...listings],
          gettingListings: false,
          empty: listings.length > 0 ? false : true
        }
      }

    default:
      return state;
  }
}

const usersReducer = combineReducers({
  default: defaultReducer,
  latestUsers: latestUsersReducer,
  user: userReducer
});

export default usersReducer;