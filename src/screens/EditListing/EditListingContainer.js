import {
    connect
} from 'react-redux';
import EditListing from './EditListing';
import {
    listingsOperations
} from '../../modules/listings';
import {
    imagesOperations
} from '../../modules/images';


const mapStateToProps = (state) => {
    const {
        updatingListing,
        deletingListing
    } = state.listings.user
    const {
        deleting
    } = state.images;
    return {
        deleting,
        updatingListing,
        deletingListing
    };
};

const mapDispatchToProps = (dispatch) => {
    const deleteImage = (id) => {
        dispatch(imagesOperations.deleteImage(id));
    };
    const updateListing = (listing) => {
        dispatch(listingsOperations.updateListing(listing));
    };
    const deleteListing = (id) => {
        dispatch(listingsOperations.deleteListing(id));
    };
    return {
        deleteImage,
        updateListing,
        deleteListing
    };
};


const EditListingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditListing);

export default EditListingContainer;