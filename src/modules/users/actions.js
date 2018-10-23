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

const getLatestUsers = () => ({
    type: types.GET_LATEST_USERS
});

const getLatestUsersSuccess = (json) => ({
    type: types.GET_LATEST_USERS_SUCCESS,
    users: json,
});

const getLatestUsersFailure = (json) => ({
    type: types.GET_LATEST_USERS_FAILURE,
});

export default {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    getLatestUsers,
    getLatestUsersSuccess,
    getLatestUsersFailure
};