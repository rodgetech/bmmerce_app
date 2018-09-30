import {
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import {
  showMessage
} from "react-native-flash-message";

import setAuthorizationToken from '../../utils/setAuthorizationToken';
import navigationService from '../../utils/navigationService';

import Actions from './actions';
import {
  API_ROOT
} from '../../utils/apiConfig';

const authenticateAction = Actions.authenticate;
const authenticateSuccessAction = Actions.authenticateSuccess;
const authenticateFailureAction = Actions.authenticateFailure;
const verifyTokenAction = Actions.verifyToken;
const verifyTokenSuccessAction = Actions.verifyTokenSuccess;
const verifyTokenFailureAction = Actions.verifyTokenFailure;
const registerAction = Actions.register;
const registerSuccessAction = Actions.registerSuccess;
const registerFailureAction = Actions.registerFailure;
const getAccountAction = Actions.getAccount;
const getAccountSuccessAction = Actions.getAccountSuccess;
const updateAddressAction = Actions.updateAddress;
const updateAddressSuccessAction = Actions.updateAddressSuccess;
const updateAddressFailureAction = Actions.updateAddressFailure;

const authenticate = (user) => {
  const url = user.hasOwnProperty('provider') ? `${API_ROOT}/auth/authenticate/${user.provider}` : `${API_ROOT}/auth/authenticate`;
  return dispatch => {
    dispatch(authenticateAction());
    axios.post(url, user)
      .then(async (response) => {
        let authToken = response.data.auth_token;
        // Store the token on device
        await AsyncStorage.setItem('authToken', authToken);
        dispatch(authenticateSuccessAction());
        navigationService.navigate('App', {
          authToken: authToken
        });
      })
      .catch((error) => {
        dispatch(authenticateFailureAction("Invalid email or password"));
        showMessage({
          message: "Sign in failed",
          description: "Make sure you are entering the right credentials",
          type: "danger",
          backgroundColor: "#e74c3c",
          duration: 3000,
          floating: true
        });
      });
  }
};

const register = (newUser) => {
  return dispatch => {
    dispatch(registerAction());
    axios.post(`${API_ROOT}/auth/register`, newUser)
      .then(async (response) => {
        let authToken = response.data.auth_token;
        await AsyncStorage.setItem('authToken', authToken);
        // Apply token to request headers
        setAuthorizationToken(authToken);
        dispatch(registerSuccessAction());
        navigationService.navigate('Address', {
          authToken: authToken
        });
      })
      .catch((error) => {
        console.log(error.response.data.data);
        dispatch(registerFailureAction(error.response.data.data));
        showMessage({
          message: "Registration failed",
          description: "Make sure you are entering all required values",
          type: "danger",
          backgroundColor: "#e74c3c",
          duration: 3000,
          floating: true
        });
      });
  }
};

const verifyToken = (token) => {
  const url = `${API_ROOT}/auth/verify_token`;
  return dispatch => {
    axios.get(url)
      .then(async () => {
        setAuthorizationToken(token);
        dispatch(verifyTokenSuccessAction());
      })
      .catch((error) => {
        console.log("ERROR");
        console.log(error)
        dispatch(verifyTokenFailureAction());
      });
  }
};

const getAccount = () => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(getAccountAction());
    axios.get(`${API_ROOT}/admin/account`)
      .then(function (response) {
        const responseData = response.data.user;
        console.log("GET ACCOUNT", response.data)
        const account = {
          id: responseData.id,
          avatar: responseData.avatar,
          name: responseData.name,
          email: responseData.email,
          address: responseData.address,
        };
        console.log("MY GET ACCOUNT FAY", account);
        dispatch(getAccountSuccessAction(account))
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const updateAddress = (newAddress, bakToMenu = false) => {
  return async dispatch => {
    dispatch(updateAddressAction());
    await setAuthorizationToken('authToken');
    axios.put(`${API_ROOT}/admin/account/address`, newAddress)
      .then(async (response) => {
        // Apply token to request headers
        dispatch(updateAddressSuccessAction());
        redirectLocation = bakToMenu ? 'Menu' : 'App';
        navigationService.navigate(redirectLocation, {
          temp: {}
        });
      })
      .catch((error) => {
        console.log(error.response.data.data);
        dispatch(updateAddressFailureAction());
      });
  }
};

export default {
  authenticate,
  register,
  verifyToken,
  getAccount,
  updateAddress
};