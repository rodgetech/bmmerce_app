import types from './types';

const STATE = {
  signInError: '',
  authenticated: false,
  authenticating: false,
  verifyingToken: true,
  registering: false,
  registerErrors: {},
  gettingAccount: false,
  account: {}
}

const authReducer = (state = STATE, action) => {
  switch (action.type) {
    case types.AUTHENTICATE:
      {
        return {
          ...state,
          authenticating: true,
        }
      }

    case types.AUTHENTICATE_SUCCESS:
      {
        return {
          ...state,
          authenticated: true,
          authenticating: false,
        }
      }

    case types.AUTHENTICATE_FAILURE:
      {
        const {
          signInError
        } = action;
        return {
          ...state,
          signInError,
          authenticating: false,
        }
      }

    case types.UNAUTHENTICATE:
      {
        return {
          ...state,
          account: {},
          authenticated: false,
          verifyingToken: false
        }
      }

    case types.REGISTER:
      {
        return {
          ...state,
          registering: true,
        }
      }

    case types.REGISTER_SUCCESS:
      {
        return {
          ...state,
          authenticated: true,
          registering: false,
        }
      }

    case types.REGISTER_FAILURE:
      {
        const {
          registerErrors
        } = action;
        return {
          ...state,
          registerErrors,
          registering: false,
        }
      }

    case types.VERIFY_TOKEN_SUCCESS:
      {
        return {
          ...state,
          authenticated: true,
          verifyingToken: false,
        }
      }

    case types.VERIFY_TOKEN_FAILURE:
      {
        return {
          ...state,
          account: {},
          verifyingToken: false,
          authenticated: false,
        }
      }

    case types.GET_ACCOUNT:
      {
        return {
          ...state,
          gettingAccount: true,
        }
      }

    case types.GET_ACCOUNT_SUCCESS:
      {
        const {
          account
        } = action;
        return {
          ...state,
          account,
          gettingAccount: false,
        }
      }

    default:
      return state;
  }
}

export default authReducer;