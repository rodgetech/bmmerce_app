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

// Return the city from the reverse geocoded results
const geoCity = (results) => {
    let level_1; // state
    let level_2; // city
    for (let x = 0, length_1 = results.length; x < length_1; x++) {
        for (let y = 0, length_2 = results[x].address_components.length; y < length_2; y++) {
            let type = results[x].address_components[y].types[0];
            if (type === "administrative_area_level_1") {
                level_1 = results[x].address_components[y].long_name;
                if (level_2) break;
            } else if (type === "locality") {
                level_2 = results[x].address_components[y].long_name;
                if (level_1) break;
            }
        }
    }
    return level_2;
}

// Return the state/district from the reverse geocoded results
const geoState = (results) => {
    let level_1; // state
    let level_2; // city
    for (let x = 0, length_1 = results.length; x < length_1; x++) {
        for (let y = 0, length_2 = results[x].address_components.length; y < length_2; y++) {
            let type = results[x].address_components[y].types[0];
            if (type === "administrative_area_level_1") {
                level_1 = results[x].address_components[y].long_name;
                if (level_2) break;
            } else if (type === "locality") {
                level_2 = results[x].address_components[y].long_name;
                if (level_1) break;
            }
        }
    }
    return level_1;
}

export {
    reverseGeocode,
    geocode,
    geoCity,
    geoState
}