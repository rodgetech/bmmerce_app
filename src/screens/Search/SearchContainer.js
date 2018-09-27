import {
    connect
} from 'react-redux';
import Search from './Search';
import {
    listingsOperations
} from '../../modules/listings';

import ListingsActions from '../../modules/listings/actions';

const mapStateToProps = (state) => {
    const {
        listings,
        searching
    } = state.listings.search;
    return {
        listings,
        searching
    };
};

const mapDispatchToProps = (dispatch) => {
    const search = (query) => {
        dispatch(listingsOperations.search(query));
    };
    const clearSearch = () => {
        dispatch(ListingsActions.clearSearch());
    };
    return {
        search,
        clearSearch
    };
};

const SearchContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);

export default SearchContainer;