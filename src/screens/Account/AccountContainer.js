import { connect } from 'react-redux';
import Account from './Account';
import { authOperations } from '../../modules/auth';

const mapStateToProps = (state) => {
    const { gettingAccount, account } = state.auth;
    return { gettingAccount, account };
};

const mapDispatchToProps = (dispatch) => {
    const getAccount = () => {
        dispatch(authOperations.getAccount());
    };
    const unauthenticate = () => {
        dispatch(authOperations.unauthenticate());
    };
    return { getAccount };
};

const AccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);

export default AccountContainer;