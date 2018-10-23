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

const getUsersAction = Actions.getUsers;
const getUsersSuccessAction = Actions.getUsersSuccess;

const getListing = (id) => {
  return async dispatch => {
    dispatch(getListingAction());
    await setAuthorizationToken('authToken');
    axios.get(`${API_ROOT}/listing_type/listings/${id}`)
      .then(function (response) {
        const responseData = response.data.listing;
        const listing = {
          id: responseData.id,
          title: responseData.title,
          price: responseData.price,
          address: responseData.address,
          description: responseData.description,
          district: responseData.district,
          userId: responseData.account_id,
          listedBy: responseData.business ? {
            account: responseData.business,
            business: true
          } : {
            account: responseData.account
          },
          images: responseData.images,
          latitude: responseData.latitude,
          longitude: responseData.longitude,
          createdAt: responseData.created_at
        };
        dispatch(getListingSuccessAction(listing))
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const getUsers = (page, per) => {
  let query = `page=${page}&per=${per}`;
  return async dispatch => {
    dispatch(getUsersAction());
    await setAuthorizationToken('authToken');
    axios.get(`${API_ROOT}/users?${query}`)
      .then(function (response) {
        const users = response.data.users;
        console.log("USERS", users);
        dispatch(getUsersSuccessAction(users, response.data.meta.total_pages, page));
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

export default {
  getUsers
};