import {
    connect
} from 'react-redux';
import Home from './Home';
import {
    listingsOperations
} from '../../modules/listings';
import {
    engagementsOperations
} from '../../modules/engagements';
import {
    authOperations
} from '../../modules/auth';
import listingsActions from '../../modules/listings/actions';

const mapStateToProps = (state) => {
    const {
        listings,
        gettingListings,
        searching,
        totalPages,
        refreshing,
        empty
    } = state.listings.default;
    const {
        account
    } = state.auth;
    return {
        listings,
        gettingListings,
        searching,
        totalPages,
        refreshing,
        account,
        empty
    };
};

const mapDispatchToProps = (dispatch) => {
    const getListings = (latitude, longitude, bounds, page, refreshing) => {
        dispatch(listingsOperations.getListings(latitude, longitude, bounds, page, refreshing));
    };
    const search = (query) => {
        dispatch(listingsOperations.search(query));
    };
    const clearListings = () => {
        dispatch(listingsActions.clearListings());
    };
    const getUnreadCount = () => {
        dispatch(engagementsOperations.getUnreadCount());
    };
    const getAccount = () => {
        dispatch(authOperations.getAccount());
    };
    return {
        getListings,
        search,
        clearListings,
        getUnreadCount,
        getAccount
    };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;