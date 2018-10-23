import types from './types.js';

const getUsers = () => ({
    type: types.GET_USERS
});

const getUsersSuccess = (json, totalPages, currentPage) => ({
    type: types.GET_USERS_SUCCESS,
    users: json,
    totalPages: totalPages,
    currentPage: currentPage
});

const getUsersFailure = (json) => ({
    type: types.GET_USERS_FAILURE,
});

export default {
    getUsers,
    getUsersSuccess,
    getUsersFailure
};