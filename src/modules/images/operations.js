import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken';

import Actions from './actions';
import {
  API_ROOT
} from '../../utils/apiConfig';

const deleteImageAction = Actions.deleteImage;
const deleteImageSuccessAction = Actions.deleteImageSuccess;

const deleteImage = (id) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(deleteImageAction());
    axios.delete(`${API_ROOT}/admin/images/${id}`)
      .then(async (response) => {
        console.log("DELETE SUCCESSSSSS", response);
        dispatch(deleteImageSuccessAction());
      })
      .catch((error) => {
        console.log("DELETE ERRROR:", error);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

export default {
  deleteImage
};