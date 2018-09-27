import { connect } from 'react-redux';
import Post from './Post';
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

const PostContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Post);

export default PostContainer;