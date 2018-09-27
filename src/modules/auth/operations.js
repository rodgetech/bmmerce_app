import {
  AsyncStorage
} from 'react-native';
import axios from 'axios';

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


const authenticate = (user) => {
  const url = user.hasOwnProperty('provider') ? `${API_ROOT}/auth/authenticate/${user.provider}` : `${API_ROOT}/auth/authenticate` ;
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
        console.log("WTF:", error);
        dispatch(authenticateFailureAction("Invalid email or password"));
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
        navigationService.navigate('App', {
          authToken: authToken
        });
      })
      .catch((error) => {
        console.log(error.response.data.data);
        dispatch(registerFailureAction(error.response.data.data));
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
        };
        console.log("MY GET ACCOUNT FAY", account);
        dispatch(getAccountSuccessAction(account))
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

export default {
  authenticate,
  register,
  verifyToken,
  getAccount
};