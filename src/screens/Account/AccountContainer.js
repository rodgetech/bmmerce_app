import {
    connect
} from 'react-redux';
import Account from './Account';
import {
    authOperations
} from '../../modules/auth';
import authActions from '../../modules/auth/actions';

const mapStateToProps = (state) => {
    const {
        gettingAccount,
        account
    } = state.auth;
    return {
        gettingAccount,
        account
    };
};

const mapDispatchToProps = (dispatch) => {
    const getAccount = () => {
        dispatch(authOperations.getAccount());
    };
    const logout = () => {
        dispatch(authActions.logout());
    };
    return {
        getAccount,
        logout
    };
};

const AccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);

export default AccountContainer;