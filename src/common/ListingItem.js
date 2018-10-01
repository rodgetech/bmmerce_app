import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatDistance } from 'date-fns';
import { fonts, colors } from '../styles';
import { moderateScale } from '../utils/scaling';

export default class ListingItem extends React.PureComponent {
  render() {
    return (
        <View style={styles.itemContainer} key={this.props.listing.id}>
            <TouchableOpacity 
                onPress={() => this.props.onSelectListing(this.props.listing.id)}
                activeOpacity={0.8}
            >
            <Text style={{fontFamily: fonts.robotoCondensed, color: '#E3E3E3', fontSize: moderateScale(14, 2.5), paddingBottom: 2, textAlign: 'right'}} numberOfLines={1}>
                {formatDistance(this.props.listing.createdAt, new Date(), {addSuffix: true})}
            </Text>
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
            <View style={styles.infoContainer}>
                <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.5), color: colors.dark}} numberOfLines={1}>
                    {this.props.listing.title}
                </Text>
                <Text style={{fontFamily: fonts.robotoCondensed, color: colors.green, fontSize: moderateScale(16, 1.5), paddingTop: 1}}>
                    ${parseFloat(this.props.listing.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                </Text>
                <Text style={{fontFamily: fonts.robotoCondensed, color: colors.grey, fontSize: moderateScale(15, 2), paddingTop: 4}} numberOfLines={1}>
                    Near {this.props.listing.address}
                </Text>
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
      borderColor: '#E3E3E3'
    },
    infoContainer: {
      paddingVertical: 10,
      backgroundColor: "#FFF",
      borderTopWidth: 3,
      borderColor: "#27ae60"
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
  });
  