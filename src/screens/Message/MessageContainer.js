import { connect } from 'react-redux';
import Message from './Message';
import { messagesOperations } from '../../modules/messages';

const mapStateToProps = (state) => {
    const { creatingMessage, message } = state.messages;
    return { creatingMessage, message };
};

const mapDispatchToProps = (dispatch) => {
    const createMessage = (newMessage) => {
        dispatch(messagesOperations.createMessage(newMessage));
    };
    return { createMessage };
};

const MessageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Message);

export default MessageContainer;