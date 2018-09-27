import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'

const Listing = props => {
  
    return (
        <Image
            resizeMode="contain"
            style={{width: 150, height: 150}}
            source={{ uri: props.listing.images[0]['listing_image']['url'] }}
        />
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Listing;