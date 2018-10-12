import axios from 'axios';

const API_KEY = 'AIzaSyA9ZhG7CEG04TrkNaAtje2CiqJiM1MoLhc';

const API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const reverseGeocode = (latitude, longitude) => {
    return axios.get(`${API_URL}?address=${latitude},${longitude}&key=${API_KEY}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

const geocode = (location) => {
    return axios.get(`${API_URL}?address=${location}&key=${API_KEY}`)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
}

export {
    reverseGeocode,
    geocode
}