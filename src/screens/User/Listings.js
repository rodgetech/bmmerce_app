import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Header } from 'react-navigation';
import Permissions from 'react-native-permissions';
import { Icon } from 'react-native-elements';
import OneSignal from 'react-native-onesignal';
import {
  reverseGeocode,
} from '../../utils/geocode';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles'
import ListingItem from './ListingItem';

const numColumns = 3;

export default class Listings extends React.Component {

  state = {
    page: 1,
  }


  componentDidMount () {
    this.props.getUserListings(this.props.userId, this.state.page);
  }


  onSelectListing = (listing) => {
    this.props.navigate('ListingView', {listingId: listing.id, hideTabBar: true });
  }

  renderItem = ({ item, index }) => {
    return (
      <ListingItem 
        listing={item}
        onSelectListing={(listingId) => this.props.navigate('ListingView', {listingId: listingId, hideTabBar: true })}
      />
    );
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, 
    () => {
        this.props.getUserListings(this.props.userId, this.state.page);
    });
  }

  renderFooter = () => {
    if (this.props.gettingListings) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator 
            animating
            size="large"
            color={colors.green}
          />
        </View>
      )
    } else {
      return null;
    }
  }

  renderListEmpty = () => {
    if (this.props.empty && !this.props.gettingListings) {
      return (
        <View style={{flex: 1, paddingHorizontal: 10,  paddingVertical: 18, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: moderateScale(16, 1.5), fontFamily: fonts.robotoCondensed, color: colors.dark, textAlign: 'center'}}>
            This user has no listings at this time.
          </Text>
        </View>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          data={this.props.listings}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          keyExtractor={(item, index) => item.id.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (this.state.page != this.props.totalPages && this.props.totalPages !== 1) {
              console.log("PAGE: ", this.state.page)
              this.handleLoadMore();
            }
          }}
          ListEmptyComponent={this.renderListEmpty}
          ListHeaderComponent={this.renderListingHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 5
  },
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

