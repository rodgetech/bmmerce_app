import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import FastImage from 'react-native-fast-image';

const Preview = props => {
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.image}
                source={{ uri: props.image }}
            /> */}
            <FastImage
              style={styles.image}
              source={{ uri: props.image, priority: FastImage.priority.normal }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={styles.touchStyles}
                    onPress={props.onRetake}
                >
                    <Text style={{color: "#FFF"}}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.touchStyles}
                    onPress={props.onContinue}
                >
                    <Text style={{color: "#FFF"}}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    image: {
        flex: 1
    },
    touchStyles: {
        flex: 1, 
        alignSelf: 'stretch', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    footer: {
        backgroundColor: '#000',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default Preview;