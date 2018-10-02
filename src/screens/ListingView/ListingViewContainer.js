import { connect } from 'react-redux';
import ListingView from './ListingView';
import { listingsOperations } from '../../modules/listings';
import {
    engagementsOperations
} from '../../modules/engagements';

const mapStateToProps = (state) => {
    const { listing, gettingListing } = state.listings.default;
    return { listing, gettingListing };
};

const mapDispatchToProps = (dispatch) => {
    const getListing = (id) => {
        dispatch(listingsOperations.getListing(id));
    };
    const createEngagementMessage = (newMessage) => {
        dispatch(engagementsOperations.createEngagementMessage(newMessage, true));
    };
    return { getListing, createEngagementMessage };
};

const ListingViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ListingView);

export default ListingViewContainer;