import axios from 'axios';

import Actions from './actions';
import {
  API_ROOT
} from '../../utils/apiConfig';

import setAuthorizationToken from '../../utils/setAuthorizationToken';

const createMessageAction = Actions.createMessage;
const createMessageSuccessAction = Actions.createMessageSuccess;
const createMessageFailureAction = Actions.createMessageFailure;

const getUnreadCountAction = Actions.getUnreadCount;
const getUnreadCountSuccessAction = Actions.getUnreadCountSuccess;

const createMessage = (newMessage) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(createMessageAction());
    axios.post(`${API_ROOT}/admin/messages`, {
        body: newMessage.body,
        recipient_id: newMessage.recipientId,
        listing_id: newMessage.listingId
      })
      .then(async (response) => {
        console.log("SUCCESSSSSS", response);
        let responseData = response.data.message;
        const message = {
          id: responseData.id,
          body: responseData.body,
          createdAt: responseData.created_at
        };
        dispatch(createMessageSuccessAction(message));
      })
      .catch((error) => {
        console.log("Error:", error.response);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

const getUnreadCount = () => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    axios.get(`${API_ROOT}/admin/messages/unread`)
      .then(function (response) {
        //const responseData = response.data.listing;
        console.log("UNREAD COUNT", response.data);
        dispatch(getUnreadCountSuccessAction(response.data));
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

export default {
  createMessage,
  getUnreadCount
};