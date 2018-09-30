import axios from 'axios';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import navigationService from '../../utils/navigationService';

import Actions from './actions';
import {
  API_ROOT
} from '../../utils/apiConfig';
import {
  reverseGeocode,
} from '../../utils/geocode';


const getListingAction = Actions.getListing;
const getListingSuccessAction = Actions.getListingSuccess;

const getListingsAction = Actions.getListings;
const getListingsSuccessAction = Actions.getListingsSuccess;

const getUserListingsAction = Actions.getUserListings;
const getUserListingsSuccessAction = Actions.getUserListingsSuccess;

const createListingAction = Actions.createListing;
const createListingSuccessAction = Actions.createListingSuccess;
const createListingFailureAction = Actions.createListingFailure;

const updateListingAction = Actions.updateListing;
const updateListingSuccessAction = Actions.updateListingSuccess;

const deleteListingAction = Actions.deleteListing;
const deleteListingSuccessAction = Actions.deleteListingSuccess;

const searchAction = Actions.search;
const searchSuccessAction = Actions.searchSuccess;

const refreshAction = Actions.refresh;
const refreshSuccessAction = Actions.refreshSuccess;

const getListing = (id) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(getListingAction());
    axios.get(`${API_ROOT}/listing_type/listings/${id}`)
      .then(function (response) {
        const responseData = response.data.listing;
        const listing = {
          id: responseData.id,
          title: responseData.title,
          price: responseData.price,
          address: responseData.address,
          description: responseData.description,
          listedBy: responseData.business ? {
            account: responseData.business,
            business: true
          } : {
            account: responseData.account
          },
          images: responseData.images,
          createdAt: responseData.created_at
        };
        dispatch(getListingSuccessAction(listing))
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const getUserListings = () => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(getUserListingsAction());
    console.log("GET USER LISTINGS")
    axios.get(`${API_ROOT}/admin/listings`)
      .then(function (response) {
        const responseData = response.data.listings;
        console.log(responseData);
        let data = [];
        responseData.map(child => {
          const childData = {
            id: child.id,
            title: child.title,
            price: child.price,
            address: child.address,
            description: child.description,
            listedBy: child.business ? {
              account: child.business,
              business: true
            } : {
              account: child.account
            },
            images: child.images,
            createdAt: child.created_at
          };
          data.push(childData);
        });
        dispatch(getUserListingsSuccessAction(data))
      })
      .catch(function (error) {
        console.log(error)
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const getListings = (latitude = null, longitude = null, bounds = null, page, refreshing = false) => {
  console.log("GET LISTINGS, CURRENT PAGE", page);
  let query = null;
  if (bounds) {
    query = `swlat=${bounds.southwest.lat}&swlong=${bounds.southwest.lng}&nelat=${bounds.northeast.lat}&nelong=${bounds.northeast.lng}`;
  } else if (latitude && longitude) {
    query = `latitude=${latitude}&longitude=${longitude}`;
  }
  query += `&page=${page}`;
  return async dispatch => {
    await setAuthorizationToken('authToken');
    refreshing ? dispatch(refreshAction()) : dispatch(getListingsAction());
    axios.get(`${API_ROOT}/listing_type/listings?${query}`)
      .then(function (response) {
        console.log("LISTINGS", response.data.listings);
        const responseData = response.data.listings;
        let listings = [];
        responseData.map(child => {
          const childData = {
            id: child.id,
            title: child.title,
            price: child.price,
            address: child.address,
            description: child.description,
            district: child.district,
            userId: child.account_id,
            listedBy: child.business ? {
              account: child.business,
              business: true
            } : {
              account: child.account
            },
            images: child.images,
            latitude: child.latitude,
            longitude: child.longitude,
            createdAt: child.created_at
          };
          // console.log("PRICE:", parseFloat(childData.price));
          listings.push(childData);
        });
        if (refreshing) {
          dispatch(refreshSuccessAction(listings, response.data.meta.total_pages, page))
        } else {
          dispatch(getListingsSuccessAction(listings, response.data.meta.total_pages, page))
        }
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

const createListing = (newListing) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(createListingAction());
    // Reverse geocode current location
    const geoResponse = await reverseGeocode(newListing.latitude, newListing.longitude);
    console.log("GEO RESPONSE", geoResponse);
    const address = geoResponse.data.results[0].address_components[1].short_name;
    const district = geoResponse.data.results[0].address_components[2].short_name
    // Format post data
    console.log(newListing);
    let formData = new FormData();
    formData.append('title', newListing.title);
    formData.append('price', newListing.price);
    formData.append('description', newListing.description);
    formData.append('address', address);
    formData.append('district', district);
    formData.append('latitude', newListing.latitude);
    formData.append('longitude', newListing.longitude);
    // Format images for posting
    for (var i = 0; i < newListing.images.length; i++) {
      let ext = newListing.images[i].split('.').pop();
      let name = newListing.images[i].split("/").pop();
      let image = {
        uri: `${newListing.images[i]}`,
        type: `image/${ext}`,
        name: name
      }
      formData.append("images[]", image);
    }

    axios.post(`${API_ROOT}/admin/listings`, formData)
      .then(async (response) => {
        console.log("CREATE SUCCESSSSSS", response);
        let responseData = response.data.listing;
        const listing = {
          id: responseData.id,
          title: responseData.title,
          price: responseData.price,
          address: responseData.address,
          district: responseData.district,
          description: responseData.description,
          listedBy: responseData.business ? {
            account: responseData.business,
            business: true
          } : {
            account: responseData.account
          },
          images: responseData.images,
          latitude: responseData.latitude,
          longitude: responseData.longitude,
          createdAt: responseData.created_at
        };
        dispatch(createListingSuccessAction(listing));
        navigationService.navigate('Home', {
          listing: listing
        });
      })
      .catch((error) => {
        console.log("CREATE ERRROR:", error);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

const updateListing = (listing) => {
  console.log(listing);
  let formData = new FormData();
  formData.append('title', listing.title);
  formData.append('price', listing.price);
  formData.append('description', listing.description);
  // Selected only newly added images for upload
  const newImages = listing.images.filter(image => !image.hasOwnProperty('id'));
  if (newImages.length > 0) {
    for (var i = 0; i < newImages.length; i++) {
      let ext = newImages[i].url.split('.').pop();
      let name = newImages[i].url.split("/").pop();
      let image = {
        uri: `${newImages[i].url}`,
        type: `image/${ext}`,
        name: name
      }
      formData.append("images[]", image);
    }
  }
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(updateListingAction());
    axios.put(`${API_ROOT}/admin/listings/${listing.id}`, formData)
      .then(async (response) => {
        console.log("UPDATE SUCCESSSSSS", response.data.listing);
        let responseData = response.data.listing;
        const listing = {
          id: responseData.id,
          title: responseData.title,
          price: responseData.price,
          address: responseData.address,
          description: responseData.description,
          images: responseData.images,
        };
        dispatch(updateListingSuccessAction(listing));
      })
      .catch((error) => {
        console.log("UPDATE ERRROR:", error);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

const deleteListing = (id) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(deleteListingAction());
    axios.delete(`${API_ROOT}/admin/listings/${id}`)
      .then(async (response) => {
        console.log("DELETE SUCCESS", response);
        dispatch(deleteListingSuccessAction(id));
        navigationService.navigate('AccountListings', {
          id: id
        });
      })
      .catch((error) => {
        console.log("DELETE ERRROR:", error);
        // dispatch(createListingFailureAction(error.response.data.errors));
        // dispatch(authenticateFailureAction(error.response.data.error.user_authentication[0]));
      });
  }
};

const search = (query) => {
  return async dispatch => {
    await setAuthorizationToken('authToken');
    dispatch(searchAction());
    axios.get(`${API_ROOT}/search?query=${query}`)
      .then(function (response) {
        const responseData = response.data.listings;
        if (response.data !== "") {
          let data = [];
          responseData.map(child => {
            const childData = {
              id: child.id,
              title: child.title,
              price: child.price,
              address: child.address,
              district: child.district,
              userId: child.account_id,
              listedBy: child.business ? {
                account: child.business,
                business: true
              } : {
                account: child.account
              },
              images: child.images,
              latitude: child.latitude,
              longitude: child.longitude,
              createdAt: child.created_at
            };
            // console.log("PRICE:", parseFloat(childData.price));
            data.push(childData);
          });
          dispatch(searchSuccessAction(data))
        } else {
          dispatch(searchSuccessAction([]));
        }
      })
      .catch(function (error) {
        //dispatch(getUsersFailureAction(error.response.data.data));
      });
  }
}

export default {
  createListing,
  getListing,
  getListings,
  getUserListings,
  updateListing,
  deleteListing,
  search
};