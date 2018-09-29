import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import { Button } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import authOperations from '../../modules/auth/operations';
import {colors, fonts} from '../../styles';
import { moderateScale } from '../../utils/scaling';
import ActivityLoader from '../../components/ActivityLoader';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    image: {
        height: 200,
        backgroundColor: '#f7f7f7'
    },
})

class SetAddress extends React.Component {
    
    state = {
        address: '',
        latitude: '',
        longitude: ''
    }

    updateAddress = () => {
        const { navigation } = this.props;
        const bakToMenu = navigation.getParam('bakToMenu', false);
        this.props.updateAddress(this.state, bakToMenu);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FastImage
                        style={styles.image}
                        source={{ uri: 'https://ssl.c.photoshelter.com/img-get2/I0000jH39T3rHDFk/fit=1000x750/TR-060908-XM2S7985.jpg', priority: FastImage.priority.normal }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{paddingBottom: 10, paddingHorizontal: 12, marginBottom: 10}}>
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(20, 2.5), color: colors.dark, paddingTop: 20, paddingBottom: 10}}>
                            Where do you live?
                        </Text>
                        <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 2.5), color: colors.dark}}>
                            Specify where you live. This allows us to notify you when new listings are posted nearby.
                        </Text>
                    </View>
                    {this.props.updatingAddress &&
                        <ActivityLoader
                            loading={this.props.updatingAddress} />
                    }
                    <GooglePlacesAutocomplete
                        placeholder='Search for your address'
                        minLength={2} // minimum length of text to search
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        // renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            console.log("MY SEARCH RESULT");
                            console.log(details.geometry.location);
                            this.setState({
                                address: data.description,
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                            })
                        }}
                        enablePoweredByContainer={false}
                
                        getDefaultValue={() => ''}
                        
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyD3kW1MKxA-HyUanywrHGuaYHTfr74mqMU',
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
                            },
                            textInput: {
                                borderBottomWidth: 1,
                                borderColor: '#e9eced',
                                height: 38,
                                color: colors.dark,
                                fontFamily: fonts.robotoCondensed,
                                fontSize: moderateScale(17, 2.5),
                                borderRadius: 0,
                            },
                            description: {
                                fontFamily: fonts.robotoCondensed,
                                fontSize: moderateScale(15, 2.5),
                                color: colors.dark
                            },
                            row: {
                                height: 52,
                                backgroundColor: '#F5F5F5'
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
                        // GooglePlacesSearchQuery={{
                        //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                        //     rankby: 'distance',
                        //     types: 'food'
                        // }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        // predefinedPlaces={[homePlace, workPlace]}

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                        //renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                    <View style={{marginTop: 30, marginBottom: 20, marginHorizontal: 12}}>
                        {this.state.address !== '' &&
                            <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark, paddingVertical: 2}}>
                                Selected address: {this.state.address}
                            </Text>
                        }
                        <Button 
                            title="Continue"
                            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 2.5), fontWeight: 'normal'}}
                            buttonStyle={{marginTop: 8, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}} 
                            disabled={!this.state.address}
                            onPress={this.updateAddress}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { updatingAddress } = state.auth;
    return { updatingAddress };
};

const mapDispatchToProps = (dispatch) => {
    const updateAddress = (newAddress, bakToMenu) => {
        dispatch(authOperations.updateAddress(newAddress, bakToMenu));
    };
    return { updateAddress };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SetAddress);