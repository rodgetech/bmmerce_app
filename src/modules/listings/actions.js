import types from './types.js';

const getListing = () => ({
    type: types.GET_LISTING
});

const getListingSuccess = (json) => ({
    type: types.GET_LISTING_SUCCESS,
    listing: json
});

const getListingFailure = (json) => ({
    type: types.GET_LISTING_FAILURE,
});

const getListings = () => ({
    type: types.GET_LISTINGS
});

const getListingsSuccess = (listings, totalPages, currentPage) => ({
    type: types.GET_LISTINGS_SUCCESS,
    listings: listings,
    totalPages: totalPages,
    currentPage: currentPage
});

const clearListings = () => ({
    type: types.CLEAR_LISTINGS,
});

const getListingsFailure = (json) => ({
    type: types.GET_LISTINGS_FAILURE,
});

const getUserListings = () => ({
    type: types.GET_USER_LISTINGS
});

const getUserListingsSuccess = (json) => ({
    type: types.GET_USER_LISTINGS_SUCCESS,
    userListings: json
});

const getUserListingsFailure = (json) => ({
    type: types.GET_USER_LISTINGS_FAILURE,
});

const createListing = () => ({
    type: types.CREATE_LISTING
});

const createListingSuccess = (listing) => ({
    type: types.CREATE_LISTING_SUCCESS,
    listing: listing
});

const createListingFailure = (json) => ({
    type: types.CREATE_LISTING_FAILURE,
    createListingErrors: json
});

const updateListing = () => ({
    type: types.UPDATE_LISTING
});

const updateListingSuccess = (listing) => ({
    type: types.UPDATE_LISTING_SUCCESS,
    updatedListing: listing
});

const updateListingFailure = (json) => ({
    type: types.UPDATE_LISTING_FAILURE,
    updateListingErrors: json
});

const deleteListing = () => ({
    type: types.DELETE_LISTING
});

const deleteListingSuccess = (listingId) => ({
    type: types.DELETE_LISTING_SUCCESS,
    listingId: listingId
});

const search = () => ({
    type: types.SEARCH
});

const searchSuccess = (listings) => ({
    type: types.SEARCH_SUCCESS,
    listings: listings
});

const clearSearch = () => ({
    type: types.CLEAR_SEARCH,
});

const refresh = () => ({
    type: types.REFRESH
});

const refreshSuccess = (listings, totalPages, currentPage) => ({
    type: types.REFRESH_SUCCESS,
    listings: listings,
    totalPages: totalPages,
    currentPage: currentPage
});

export default {
    getListing,
    getListingSuccess,
    getListingFailure,
    getListings,
    getListingsSuccess,
    clearListings,
    getListingsFailure,
    getUserListings,
    getUserListingsSuccess,
    getUserListingsFailure,
    createListing,
    createListingSuccess,
    createListingFailure,
    updateListing,
    updateListingSuccess,
    updateListingFailure,
    deleteListing,
    deleteListingSuccess,
    search,
    searchSuccess,
    clearSearch,
    refresh,
    refreshSuccess
};