import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

const Loader = props => {
    const {
        loading,
    } = props;
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.container}>
                <ActivityIndicator
                    color="#27ae60"
                    size="small"
                    animating={loading} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center', 
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: 36/2,
        backgroundColor: "#FFF",
        elevation: 2
    },
});

export default Loader;