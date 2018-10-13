import {
  combineReducers
} from "redux";
import types from './types';

const STATE = {
  gettingListing: false,
  listing: {},
  gettingListings: false,
  listings: [],
  creatingListing: false,
  createListingErrors: {},
  totalPages: 0,
  currentPage: 0,
  refreshing: false
}

const USER_LISTINGS_STATE = {
  userListings: [],
  gettingUserListings: false,
  updatingListing: false,
  updateListingErrors: [],
  deletingListing: false,
}

const SEARCH_STATE = {
  listings: [],
  searching: false
}

const defaultReducer = (state = STATE, action) => {
  switch (action.type) {
    case types.GET_LISTING:
      {
        return {
          ...state,
          gettingListing: true,
        }
      }

    case types.GET_LISTING_SUCCESS:
      {
        const {
          listing
        } = action;
        return {
          ...state,
          listing,
          gettingListing: false,
        }
      }

    case types.GET_LISTINGS:
      {
        return {
          ...state,
          gettingListings: true,
        }
      }

    case types.GET_LISTINGS_SUCCESS:
      {
        const {
          listings,
          totalPages,
          currentPage
        } = action;
        return {
          ...state,
          totalPages,
          currentPage,
          listings: currentPage === 1 ? listings : [...state.listings, ...listings],
          gettingListings: false,
        }
      }

    case types.CLEAR_LISTINGS:
      {
        return {
          ...state,
          totalPages: 0,
          listings: [],
        }
      }

    case types.CREATE_LISTING:
      {
        return {
          ...state,
          creatingListing: true,
        }
      }

    case types.CREATE_LISTING_SUCCESS:
      {
        const {
          listing
        } = action;
        return {
          ...state,
          listings: [listing, ...state.listings],
          creatingListing: false,
        }
      }

    case types.CREATE_LISTING_FAILURE:
      {
        return {
          ...state,
          creatingListing: false,
        }
      }

      case types.REFRESH:
      {
        return {
          ...state,
          refreshing: true,
        }
      }

    case types.REFRESH_SUCCESS:
      {
        const {
          listings,
          totalPages,
          currentPage
        } = action;
        return {
          ...state,
          totalPages,
          currentPage,
          listings: listings,
          refreshing: false,
        }
      }

    default:
      return state;
  }
}

const userListingsReducer = (state = USER_LISTINGS_STATE, action) => {
  switch (action.type) {
    case types.GET_USER_LISTINGS:
      {
        return {
          ...state,
          gettingUserListings: true,
        }
      }

    case types.GET_USER_LISTINGS_SUCCESS:
      {
        const {
          userListings
        } = action;
        return {
          ...state,
          userListings,
          gettingUserListings: false,
        }
      }

    case types.UPDATE_LISTING:
      {
        return {
          ...state,
          updatingListing: true,
        }
      }

    case types.UPDATE_LISTING_SUCCESS:
      {
        const {
          updatedListing
        } = action;
        return {
          ...state,
          updatingListing: false,
          userListings: state.userListings.map(listing => listing.id === updatedListing.id ?
            // transform the one with a matching id
            updatedListing :
            // otherwise return original item
            listing
          )
        }
      }

    case types.UPDATE_LISTING_FAILURE:
      {
        const {
          updateListingErrors
        } = action;
        return {
          ...state,
          updateListingErrors,
          updatingListing: false,
        }
      }

    case types.DELETE_LISTING:
      {
        return {
          ...state,
          deletingListing: true,
        }
      }

    case types.DELETE_LISTING_SUCCESS:
      {
        const {
          listingId
        } = action;
        return {
          ...state,
          userListings: state.userListings.filter(listing => listingId !== listing.id),
          deletingListing: false,
        }
      }

    default:
      return state;
  }
}

const searchReducer = (state = SEARCH_STATE, action) => {
  switch (action.type) {
    case types.SEARCH:
      {
        return {
          ...state,
          searching: true,
        }
      }

    case types.SEARCH_SUCCESS:
      {
        const {
          listings
        } = action;
        return {
          ...state,
          listings,
          searching: false,
        }
      }

    case types.CLEAR_SEARCH:
      {
        return {
          ...state,
          listings: [],
          searching: false,
        }
      }

    default:
      return state;
  }
}

const listingsReducer = combineReducers({
  default: defaultReducer,
  user: userListingsReducer,
  search: searchReducer
});

export default listingsReducer;