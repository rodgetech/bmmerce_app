import types from './types.js';

const getEngagements = () => ({
    type: types.GET_ENGAGEMENTS
});

const getEngagementsSuccess = (json) => ({
    type: types.GET_ENGAGEMENTS_SUCCESS,
    engagements: json
});

const getEngagementsFailure = (json) => ({
    type: types.GET_ENGAGEMENTS_FAILURE,
});

const getEngagement = () => ({
    type: types.GET_ENGAGEMENT
});

const getEngagementSuccess = (json) => ({
    type: types.GET_ENGAGEMENT_SUCCESS,
    engagement: json
});

const getEngagementFailure = (json) => ({
    type: types.GET_ENGAGEMENT_FAILURE,
});

const getEngagementMessages = () => ({
    type: types.GET_ENGAGEMENT_MESSAGES
});

const getEngagementMessagesSuccess = (messages, currentPage, totalPages) => ({
    type: types.GET_ENGAGEMENT_MESSAGES_SUCCESS,
    messages: messages,
    currentPage: currentPage,
    totalPages: totalPages
});

const getEngagementMessagesFailure = (json) => ({
    type: types.GET_ENGAGEMENT_MESSAGES_FAILURE,
});

const createEngagementMessage = () => ({
    type: types.CREATE_ENGAGEMENT_MESSAGE
});

const createEngagementMessageSuccess = (message) => ({
    type: types.CREATE_ENGAGEMENT_MESSAGE_SUCCESS,
    message: message
});

const createEngagementMessageFailure = (json) => ({
    type: types.CREATE_ENGAGEMENT_MESSAGE_FAILURE,
    createMessageErrors: json
});

const getUnreadCount = () => ({
    type: types.GET_UNREAD_COUNT
});

const getUnreadCountSuccess = (unreadCount) => ({
    type: types.GET_UNREAD_COUNT_SUCCESS,
    unreadCount: unreadCount
});

const markMessagesReadSuccess = (unreadCount) => ({
    type: types.MARK_MESSAGES_READ_SUCCESS,
    unreadCount: unreadCount
});

export default {
    getEngagements,
    getEngagementsSuccess,
    getEngagementsFailure,
    getEngagement,
    getEngagementSuccess,
    getEngagementFailure,
    getEngagementMessages,
    getEngagementMessagesSuccess,
    getEngagementMessagesFailure,
    createEngagementMessage,
    createEngagementMessageSuccess,
    createEngagementMessageFailure,
    getUnreadCount,
    getUnreadCountSuccess,
    markMessagesReadSuccess
};