import types from './types.js';

const authenticate = () => ({
    type: types.AUTHENTICATE
});

const authenticateSuccess = () => ({
    type: types.AUTHENTICATE_SUCCESS,
});

const authenticateFailure = (json) => ({
    type: types.AUTHENTICATE_FAILURE,
    signInError: json
});

const unauthenticate = () => ({
    type: types.UNAUTHENTICATE,
});


const verifyTokenSuccess = () => ({
    type: types.VERIFY_TOKEN_SUCCESS,
});

const verifyTokenFailure = (json) => ({
    type: types.VERIFY_TOKEN_FAILURE,
    signInError: json
});

const register = () => ({
    type: types.REGISTER
});

const registerSuccess = () => ({
    type: types.REGISTER_SUCCESS,
});

const registerFailure = (json) => ({
    type: types.REGISTER_FAILURE,
    registerErrors: json
});

const getAccount = () => ({
    type: types.GET_ACCOUNT
});

const getAccountSuccess = (json) => ({
    type: types.GET_ACCOUNT_SUCCESS,
    account: json
});

const updateAddress = () => ({
    type: types.UPDATE_ADDRESS
});

const updateAddressSuccess = (json) => ({
    type: types.UPDATE_ADDRESS_SUCCESS,
    address: json
});

const updateAddressFailure = () => ({
    type: types.UPDATE_ADDRESS_FAILURE,
});

export default {
    authenticate,
    authenticateSuccess,
    authenticateFailure,
    unauthenticate,
    verifyTokenSuccess,
    verifyTokenFailure,
    register,
    registerSuccess,
    registerFailure,
    getAccount,
    getAccountSuccess,
    updateAddress,
    updateAddressSuccess,
    updateAddressFailure
};