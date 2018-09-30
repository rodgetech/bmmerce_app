import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import { colors } from '../../styles';

const Slider = props => {
    return (
        <Swiper 
            style={styles.container} 
            showsButtons={false} 
            activeDotColor={colors.green}
        >
            {props.images.map((image, index) =>
                <View style={styles.slide} key={index}>
                    <FastImage
                        style={StyleSheet.absoluteFill}
                        source={{ uri: image['listing_image']['url'] }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
            )}
            
        </Swiper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        height: 350
    },
    slide: {
        flex: 1
    }
});

export default Slider;