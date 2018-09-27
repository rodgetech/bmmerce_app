import { connect } from 'react-redux';
import ListingView from './ListingView';
import { listingsOperations } from '../../modules/listings';

const mapStateToProps = (state) => {
    const { listing, gettingListing } = state.listings.default;
    return { listing, gettingListing };
};

const mapDispatchToProps = (dispatch) => {
    const getListing = (id) => {
        dispatch(listingsOperations.getListing(id));
    };
    return { getListing };
};

const ListingViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView);

export default ListingViewContainer;