import React from 'react';
import {
  StyleSheet,
  TouchableOpacity
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
                <TouchableOpacity 
                    activeOpacity={0.95}
                    style={styles.slide} 
                    key={index}
                    onPress={() => props.onImagePress(image['listing_image']['url'])}
                >
                    <FastImage
                        style={StyleSheet.absoluteFill}
                        source={{ uri: image['listing_image']['url'] }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </TouchableOpacity>
            )}
        </Swiper>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        height: 350
    },
    slide: {
        flex: 1
    }
});

export default Slider;