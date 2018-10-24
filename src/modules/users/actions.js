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

const getUser = () => ({
    type: types.GET_USER
});

const getUserSuccess = (json) => ({
    type: types.GET_USER_SUCCESS,
    user: json,
});

const getUserFailure = (json) => ({
    type: types.GET_USER_FAILURE,
});

const getUserListings = () => ({
    type: types.GET_USER_LISTINGS
});

const getUserListingsSuccess = (listings, totalPages, currentPage) => ({
    type: types.GET_USER_LISTINGS_SUCCESS,
    listings: listings,
    totalPages: totalPages,
    currentPage: currentPage
});

export default {
    getUsers,
    getUsersSuccess,
    getUsersFailure,
    getLatestUsers,
    getLatestUsersSuccess,
    getLatestUsersFailure,
    getUser,
    getUserSuccess,
    getUserFailure,
    getUserListings,
    getUserListingsSuccess
};