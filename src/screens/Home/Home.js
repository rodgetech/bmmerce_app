import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import OneSignal from 'react-native-onesignal';
import { formatDistance } from 'date-fns';
import {
  reverseGeocode,
} from '../../utils/geocode';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles'

const numColumns = 2;

export default class Home extends React.PureComponent {

  state = {
    loading: true,
    page: 1,
    bounds: null,
    latitude: null,
    longitude: null,
  }

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    const address = params ? params.address : ''
    return {
      headerRight: (
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={{alignSelf: 'stretch', justifyContent: 'center', marginRight: 10}}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon
              name='magnifying-glass'
              type='entypo'
              color={colors.dark}
            />
          </TouchableOpacity>
        </View>
      ),

      headerLeft: (
        <View style={styles.headerContainer}>
          <TouchableOpacity 
            style={{flexDirection: 'row', justifyContent: 'center', marginLeft: 10}}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Filter', {changeLocation: params.changeLocation})}
          >
            <Icon
              name='location'
              type='entypo'
              color={colors.dark}
            />
            {params ? 
              <Text 
                style={{
                  fontFamily: fonts.robotoCondensed, 
                  fontSize: moderateScale(17, 2.5), 
                  color: colors.dark,
                  marginLeft: 6
                }} 
                numberOfLines={1}
              >
                {address}
              </Text>
            :
              <Text
                style={{
                  fontFamily: fonts.robotoCondensed, 
                  fontSize: moderateScale(17, 2.5), 
                  color: colors.dark,
                  marginLeft: 6
                }}   
              >
                ...
              </Text>
            }
          </TouchableOpacity>
        </View>
      ),
    }
  };

  componentDidMount = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        //console.log("POSITION", position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoResponse = await reverseGeocode(latitude, longitude);
        //console.log("GEOCODE", geoResponse);
        this.props.navigation.setParams({
          address: geoResponse.data.results[0].address_components[1].short_name,
          changeLocation: this.changeLocation
        });
        this.setState({
          loading: false,
          latitude: latitude,
          longitude: longitude
        });
        // Fetch listings relative to current position
        this.props.getListings(latitude, longitude, null, this.state.page);
      },
      (error) => {
          return error
      }, {
          enableHighAccuracy: true,
          timeout: 10000
      },
    );
  }

  componentWillMount() {
    console.log("APP PUSH MOUNTED")
    OneSignal.setSubscription(true); // Enable notifications
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);

    // Disbale push notification if app is focused
    OneSignal.inFocusDisplaying(0);
    OneSignal.configure();
  }

  componentWillUnmount() {
    console.log("APP PUSH UNMOUNTED");
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  }

  onReceived = (notification) => {
    console.log("Notification received: ", notification);
    this.props.getUnreadCount();
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  changeLocation = (district, bounds = null) => {
    this.props.clearListings();
    this.props.navigation.setParams({
      address: district,
    });
    if (bounds) { // Fetch listings bounded by District
      this.props.getListings(null, null, bounds, 1);
    } else { // Fetch all listings
      this.props.getListings(null, null, null, 1);
    }
    this.setState({
      page: 1,
      longitude: null,
      latitude: null,
      bounds: bounds
    });
  }

  onSelectListing = (listing) => {
    this.props.navigation.navigate('ListingView', {listing, hideTabBar: true });
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          onPress={() => this.onSelectListing(item)}
          activeOpacity={0.8}
        >
          <Text style={{fontFamily: fonts.robotoCondensed, color: '#E3E3E3', fontSize: moderateScale(13, 2.5), paddingBottom: 2, textAlign: 'right'}} numberOfLines={1}>
            {formatDistance(item.createdAt, new Date(), {addSuffix: true})}
          </Text>
          <View style={styles.imageContainer}>
            <FastImage
              style={StyleSheet.absoluteFill}
              source={{
                uri: item.images[0]['listing_image']['url'],
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark}} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={{fontFamily: fonts.robotoCondensed, color: colors.green, fontSize: moderateScale(15, 2.5), paddingTop: 1}}>
              ${parseFloat(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
            </Text>
            <Text  style={{fontFamily: fonts.robotoCondensed, color: colors.grey, fontSize: moderateScale(15, 2.5), paddingTop: 4}} numberOfLines={1}>
              Near {item.address}
            </Text>
            
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
    }, 
    () => {
      this.props.getListings(
        this.state.latitude, 
        this.state.longitude, 
        this.state.bounds, 
        this.state.page
      )
    });
  }

  handleRefresh = () => {
    this.props.getListings(
      this.state.latitude, 
      this.state.longitude, 
      this.state.bounds, 
      1,
      true
    )
  }

  renderFooter = () => {
    if (this.props.gettingListings || this.state.loading) {
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

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          refreshing={this.props.refreshing}
          onRefresh={this.handleRefresh}
          data={this.props.listings}
          style={styles.container}
          renderItem={this.renderItem}
          numColumns={numColumns}
          keyExtractor={(item, index) => item.id.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={({ distanceFromEnd }) => {
            if (this.state.page != this.props.totalPages && this.totalPages !== 1) {
              this.handleLoadMore();
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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

