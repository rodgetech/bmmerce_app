import types from './types.js';

const deleteImage = () => ({
    type: types.DELETE_IMAGE
});

const deleteImageSuccess = () => ({
    type: types.DELETE_IMAGE_SUCCESS,
    listingId: listingId
});

export default {
    deleteImage,
    deleteImageSuccess
};