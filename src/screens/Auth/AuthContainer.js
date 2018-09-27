import { connect } from 'react-redux';
import SignIn from './SignIn';
import { authOperations } from '../../modules/auth';

const mapStateToProps = (state) => {
    const { account, authenticating, signInError } = state.auth;
    return { account, authenticating, signInError };
};

const mapDispatchToProps = (dispatch) => {
    const authenticate = (user) => {
        dispatch(authOperations.authenticate(user));
    };
    return { authenticate };
};

const SignInContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);

export default SignInContainer;