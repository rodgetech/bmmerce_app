import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatDistance } from 'date-fns';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

export default class ListingItem extends React.PureComponent {
  render() {
    return (
        <View style={styles.itemContainer} key={this.props.listing.id}>
            <TouchableOpacity 
                onPress={() => this.props.onSelectListing(this.props.listing.id)}
                activeOpacity={0.8}
            >
            <View style={styles.imageContainer}>
                <FastImage
                    style={StyleSheet.absoluteFill}
                    source={{
                        uri: this.props.listing.images[0]['listing_image']['url'],
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
            </TouchableOpacity>
        </View>
    );
  };
}

const styles = StyleSheet.create({
    imageContainer: {
      backgroundColor: "#F7F7F7",
      alignItems: 'center',
      justifyContent: 'center',
      height: 130, // approximate a square
    },
    itemContainer: {
      flex: 1,
      backgroundColor: '#FFF',
      margin: 8,
      overflow: 'hidden',
      elevation: 0,
      borderBottomWidth: 1,
      borderColor: '#CCD9DE'
    },
    infoContainer: {
      paddingVertical: 10,
      backgroundColor: "#FFF",
      borderTopWidth: 2,
      borderColor: "#27ae60"
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
});
  