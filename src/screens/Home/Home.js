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
import { ListingItem, LatestUsers } from '../../common';

const numColumns = 2;

export default class Home extends React.Component {

  state = {
    loading: true,
    page: 1,
    bounds: null,
    latitude: null,
    longitude: null,
    userId: null
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      header: (
        <View style={{flexDirection: 'row', height: Header.HEIGHT,  backgroundColor: '#FFF', elevation: 2, alignItems: 'center'}}>
          <TouchableOpacity 
            style={{flex: 1, flexDirection: 'row', marginLeft: 10}}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Filter', {changeLocation: params.changeLocation})}
          >
            <Icon
              name='location'
              type='entypo'
              color='#7B8285'
            />
            {!params.loading ? 
              <Text 
                style={{
                  fontFamily: fonts.robotoCondensed, 
                  fontSize: moderateScale(17, 1.7), 
                  color: colors.dark,
                  marginLeft: 6,
                  flex: 1, 
                }} 
                numberOfLines={1}
              >
                {params.address}
              </Text>
            :
              <Text
                style={{
                  fontFamily: fonts.robotoCondensed, 
                  fontSize: moderateScale(17, 1.7), 
                  color: colors.dark,
                  marginLeft: 6
                }}   
              >
                Loading...
              </Text>
            }
          </TouchableOpacity>
          <TouchableOpacity 
            style={{marginRight: 10}}
            activeOpacity={0.4}
            onPress={() => navigation.navigate('Search')}
          >
            <Icon
              name='magnifying-glass'
              type='entypo'
              color='#7B8285'
            />
          </TouchableOpacity>
        </View>
      ),
    }
  };

  requestLocationPermission = () => {
    Permissions.request('location').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    })
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({
      changeLocation: this.changeLocation,
      loading: true
    });

    OneSignal.setSubscription(true); // Enable notifications
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    
    // Disbale push notification if app is focused
    OneSignal.inFocusDisplaying(0);
    OneSignal.configure();

    this.props.getAccount();

    Permissions.check('location').then(response => {
      console.log("PERMISION", response)
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response == 'undetermined' || response == 'denied') {
        this.requestLocationPermission();
      }
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        //console.log("POSITION", position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const geoResponse = await reverseGeocode(latitude, longitude);
        //console.log("GEOCODE", geoResponse);
        this.props.navigation.setParams({
          address: geoResponse.data.results[0].formatted_address,
          loading: false
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
        console.log("GEO ERROR:", error);
        // Current location unavailable, fetch all listings
        this.changeLocation("Nationwide");
        this.props.navigation.setParams({
          changeLocation: this.changeLocation
        });
        return error
      }, {
          enableHighAccuracy: true,
          timeout: 10000
      },
    );
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.account.id !== prevState.userId){
      // setState equivalent, updates the state
      return { userId: nextProps.account.id};
    }
    else return null;
  }

  componentDidUpdate = (prevProps, prevState) => {
    if(prevProps.account.id !== this.props.account.id){
      //Perform some operation here
      console.log("ONE TAG", this.state.userId);
      OneSignal.sendTag("userId", this.state.userId.toString());
    }
  }

  onReceived = (notification) => {
    this.props.getUnreadCount();
    console.log("NOTIFDSS", notification.payload);
    if (notification.payload.hasOwnProperty('additionalData')) {
      let additionalData = notification.payload.additionalData;
      if (additionalData.hasOwnProperty('listingId')) {
        this.handleRefresh();
      }
    }
  }

  onOpened = (openResult) => {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);
    // let additionalData = openResult.notification.payload.additionalData;
    // console.log("HERE I AM");
    // this.props.navigation.navigate('ListingView')
    // if (additionalData.hasOwnProperty('listingId')) {
    //   this.props.navigation.navigate('ListingView', {listingId: additionalData.listingId})
    // }
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
      bounds: bounds,
    });
  }

  onSelectListing = (listing) => {
    this.props.navigation.navigate('ListingView', {listingId: listing.id, hideTabBar: true });
  }

  renderItem = ({ item, index }) => {
    return (
      <ListingItem 
        listing={item}
        onSelectListing={(listingId) => this.props.navigation.navigate('ListingView', {listingId: listingId, hideTabBar: true })}
      />
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
        <View style={{paddingHorizontal: 10,backgroundColor: '#fafafa', paddingVertical: 18}}>
          <Icon
            name='ios-sad'
            type='ionicon'
            color={colors.dark}
            size={40}
            iconStyle={{marginBottom: 10}}
          />
          <Text style={{fontSize: moderateScale(16, 1.5), fontFamily: fonts.robotoCondensed, color: colors.dark}}>
            We're sorry, but nothing has been posted near this location. As soon as someone does, you'll be notified. So stay tuned.
          </Text>
        </View>
      )
    } else {
      return null;
    }
  }

  renderListingHeader = () => {
    return <LatestUsers navigate={this.props.navigation.navigate} />
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

