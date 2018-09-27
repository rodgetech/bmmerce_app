import types from './types.js';

const createMessage = () => ({
    type: types.CREATE_MESSAGE
});

const createMessageSuccess = (message) => ({
    type: types.CREATE_MESSAGE_SUCCESS,
    message: message
});

const createMessageFailure = (json) => ({
    type: types.CREATE_MESSAGE_FAILURE,
    createMessageErrors: json
});

const getUnreadCount = () => ({
    type: types.GET_UNREAD_COUNT
});

const getUnreadCountSuccess = (unreadCount) => ({
    type: types.GET_UNREAD_COUNT_SUCCESS,
    unreadCount: unreadCount
});

export default {
    createMessage,
    createMessageSuccess,
    createMessageFailure,
    getUnreadCount,
    getUnreadCountSuccess
};