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
import listingsActions from '../../modules/listings/actions';

const mapStateToProps = (state) => {
    const {
        listings,
        gettingListings,
        searching,
        totalPages,
        refreshing
    } = state.listings.default;
    return {
        listings,
        gettingListings,
        searching,
        totalPages,
        refreshing
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
    return {
        getListings,
        search,
        clearListings,
        getUnreadCount
    };
};

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;