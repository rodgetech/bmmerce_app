import {
    connect
} from 'react-redux';
import Users from './Users';
import {
    usersOperations
} from '../../modules/users';

const mapStateToProps = (state) => {
    const {
        gettingUsers,
        users
    } = state.users.default;
    return {
        gettingUsers,
        users
    };
};

const mapDispatchToProps = (dispatch) => {
    const getUsers = (page, per) => {
        dispatch(usersOperations.getUsers(page, per));
    };
    return {
        getUsers
    };
};

const UsersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

export default UsersContainer;