import { connect } from 'react-redux';
import TryPosting from './TryPosting';
import { listingsOperations } from '../../modules/listings';

const mapStateToProps = (state) => {
    const { creatingListing, createListingErrors } = state.listings.default;
    return { creatingListing, createListingErrors };
};

const mapDispatchToProps = (dispatch) => {
    const createListing = (newListing) => {
        dispatch(listingsOperations.createListing(newListing));
    };
    return { createListing };
};

const TryPostContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TryPosting);

export default TryPostContainer;