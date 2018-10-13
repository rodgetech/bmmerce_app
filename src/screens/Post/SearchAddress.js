import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

const SearchAddress = props => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search for address'
            minLength={2} // minimum length of text to search
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed={ false }    // true/false/undefined
            fetchDetails={true}
            autoFocus={false}
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                props.onPress(
                    data.description,
                    details.geometry.location.lat,
                    details.geometry.location.lng,
                )
            }}
            enablePoweredByContainer={false}
    
            getDefaultValue={() => ''}
            
            query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyA9ZhG7CEG04TrkNaAtje2CiqJiM1MoLhc',
                language: 'en', // language of the results
                //types: '(cities)', // default: 'geocode',
                components: 'country:bz'
            }}
            
            styles={{
                textInputContainer: {
                    width: '100%',
                    backgroundColor: '#FFF',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    marginTop: 0
                },
                textInput: {
                    width: '100%',
                    borderBottomWidth: 1,
                    borderColor: '#CCC',
                    height: 40,
                    color: colors.dark,
                    fontFamily: fonts.robotoCondensed,
                    fontSize: moderateScale(18, 2.5),
                    borderRadius: 0,
                    marginRight: 0,
                    marginLeft: 0,
                    marginTop: 0,
                    paddingBottom: 12
                },
                description: {
                    fontFamily: fonts.robotoCondensed,
                    fontSize: moderateScale(15, 2.5),
                    color: colors.green
                },
                row: {
                    height: 52,
                    backgroundColor: '#FFF'
                },
                separator: {
                    backgroundColor: '#e9eced',
                    height: 1
                },
                predefinedPlacesDescription: {
                    color: '#1faadb'
                }
            }}
            
            //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        flex: 1,
        justifyContent: 'center',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        paddingVertical: 25,
        marginHorizontal: 20,
        paddingHorizontal: 16,
        justifyContent: "center",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderBottomColor: colors.green,
        borderBottomWidth: 2

    },
    textInput: {
        paddingRight: 8,
        fontSize: moderateScale(16, 1.6),
        fontFamily: fonts.robotoCondensed,
        color: '#000',
        flex: 1,
        backgroundColor: "#FFF",
      },
});

export default SearchAddress;