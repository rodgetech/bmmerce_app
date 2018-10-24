import {
    connect
} from 'react-redux';
import User from './User';
import {
    usersOperations
} from '../../modules/users';

const mapStateToProps = (state) => {
    const {
        gettingUser,
        user
    } = state.users.user;
    return {
        gettingUser,
        user
    };
};

const mapDispatchToProps = (dispatch) => {
    const getUser = (id) => {
        dispatch(usersOperations.getUser(id));
    };
    return {
        getUser
    };
};

const UserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(User);

export default UserContainer;