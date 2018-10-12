import axios from 'axios';
import {
  showMessage
} from "react-native-flash-message";
import Actions from './actions';
import {
  API_ROOT
} from '../../utils/apiConfig';
import messagesOperations from '../messages/operations';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

const getEngagementsAction = Actions.getEngagements;
const getEngagementsSuccessAction = Actions.getEngagementsSuccess;
const getEngagementAction = Actions.getEngagement;
const getEngagementSuccessAction = Actions.getEngagementSuccess;
const getEngagementMessagesAction = Actions.getEngagementMessages;
const getEngagementMessagesSuccessAction = Actions.getEngagementMessagesSuccess;
const createEngagementMessageAction = Actions.createEngagementMessage;
const createEngagementMessageSuccessAction = Actions.createEngagementMessageSuccess;
const createEngagementMessageFailureAction = Actions.createEngagementMessageFailure;

const getUnreadCountAction = Actions.getUnreadCount;
const getUnreadCountSuccessAction = Actions.getUnreadCountSuccess;
const markMessagesReadSuccessAction = Actions.markMessagesReadSuccess

const getEngagements = () => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(getEngagementsAction());
    axios.get(`${API_ROOT}/admin/engagements`)
      .then(function (response) {
        const responseData = response.data.engagements;
        let engagements = [];
        responseData.map(child => {
          const childData = {
            id: child.id,
            listing: child.listing,
            recipient: child.recipient,
            unreadMessagesCount: child.unread_messages_count,
            senderId: child.sender_id,
            createdAt: child.created_at
          };
          console.log(childData);
          engagements.push(childData);
        });
        dispatch(getEngagementsSuccessAction(engagements))
      })
      .catch(function (error) {
        console.log("FATAL BOY:", error);
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const getEngagement = (id) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(getEngagementAction());
    axios.get(`${API_ROOT}/admin/engagements/${id}`)
      .then(function (response) {
        const responseData = response.data.engagement;
        console.log("A ENGAGEMENT")
        console.log(responseData);
        const engagement = {
          id: responseData.id,
          listing: responseData.listing,
          recipient: responseData.recipient,
          senderId: responseData.sender_id,
          createdAt: responseData.created_at
        };
        dispatch(getEngagementSuccessAction(engagement))
      })
      .catch(function (error) {
        console.log("ENGAGEMENT FATAL:", error);
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const getEngagementMessages = (recipientId, listingId, page, showLoading = true) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    if (showLoading) dispatch(getEngagementMessagesAction());
    axios.get(`${API_ROOT}/admin/messages`, {
        params: {
          recipient_id: recipientId,
          listing_id: listingId,
          page: page
        }
      })
      .then(function (response) {
        const responseData = response.data.messages;
        let messages = [];
        let totalPages = 0;
        if (responseData) {
          totalPages = response.data.meta.total_pages;
          responseData.map(child => {
            const messageData = {
              _id: child.id,
              text: child.body,
              createdAt: child.created_at,
              user: {
                _id: child.account.id,
                name: child.account.name,
              }
            };
            messages.push(messageData);
          });
        }
        dispatch(getEngagementMessagesSuccessAction(messages, page, totalPages));
      })
      .catch(function (error) {
        console.log("FATAL ENGAGEMENT MESSAGES:", error);
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const createEngagementMessage = (newMessage, displayMessage = false) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(createEngagementMessageAction());
    axios.post(`${API_ROOT}/admin/messages`, {
        body: newMessage.body,
        recipient_id: newMessage.recipientId,
        listing_id: newMessage.listingId
      })
      .then(async (response) => {
        let responseData = response.data.message;
        const message = {
          _id: responseData.id,
          text: responseData.body,
          createdAt: responseData.created_at,
          user: {
            _id: responseData.account.id,
            name: responseData.account.name
          }
        };
        dispatch(createEngagementMessageSuccessAction(message));
        if (displayMessage) {
          showMessage({
            message: "Message sent",
            type: "success",
            backgroundColor: "#27ae60",
            duration: 1400,
            floating: true
          });
        }
      })
      .catch((error) => {
        console.log("Error:", error.response);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

const markMessagesRead = (engagementId) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    axios.patch(`${API_ROOT}/admin/engagements/${engagementId}/mark_messages_read`)
      .then((response) => {
        console.log("MARK MESSAGES READ SUCCESS");
        // Refresh unread messages count indicator
        dispatch(markMessagesReadSuccessAction(response.data));
      })
      .catch((error) => {
        console.log("MARK MESSAGES READ FAILURE", error);
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
  getEngagements,
  getEngagement,
  getEngagementMessages,
  createEngagementMessage,
  markMessagesRead,
  getUnreadCount
};