import {
    connect
} from 'react-redux';
import Engagement from './Engagement';
import {
    engagementsOperations
} from '../../modules/engagements';
import {
    authOperations
} from '../../modules/auth';
import actions from '../../modules/engagements/actions';

const mapStateToProps = (state) => {
    const {
        engagement,
        gettingEngagement
    } = state.engagements.engagements;
    const {
        messages,
        gettingMessages,
        totalPages
    } = state.engagements.messages;
    const {
        gettingAccount,
        account
    } = state.auth;
    return {
        engagement,
        gettingEngagement,
        messages,
        gettingMessages,
        totalPages,
        gettingAccount,
        account
    };
};

const mapDispatchToProps = (dispatch) => {
    getAccount = () => {
        dispatch(authOperations.getAccount());
    };
    const getEngagement = (id) => {
        dispatch(engagementsOperations.getEngagement(id));
    };
    const getEngagementMessages = (recipientId, listingId, page, showLoading) => {
        dispatch(engagementsOperations.getEngagementMessages(recipientId, listingId, page, showLoading));
    };
    const createEngagementMessage = (newMessage) => {
        dispatch(engagementsOperations.createEngagementMessage(newMessage));
    };
    // New messages emitted from a Socket.IO connection
    const newEmittedMessage = (newMessage) => {
        dispatch(actions.createEngagementMessageSuccess(newMessage));
    };
    const markMessagesRead = (engagementId) => {
        dispatch(engagementsOperations.markMessagesRead(engagementId));
    };
    return {
        getAccount,
        getEngagement,
        getEngagementMessages,
        createEngagementMessage,
        newEmittedMessage,
        markMessagesRead,
    };
};

const EngagementContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Engagement);

export default EngagementContainer;