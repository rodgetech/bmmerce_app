import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Permissions from 'react-native-permissions';
import { Icon } from 'react-native-elements';
import OneSignal from 'react-native-onesignal';
import {
  reverseGeocode,
} from '../../utils/geocode';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles'
import ListingItem from '../../common/ListingItem';

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
                  fontSize: moderateScale(17, 1.7), 
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
                  fontSize: moderateScale(17, 2), 
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

  requestLocationPermission = () => {
    Permissions.request('location').then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    })
  }

  componentDidMount = async () => {
    console.log("YAYAYYAYAYAYYA");
    OneSignal.setSubscription(true); // Enable notifications
  
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    
    // Disbale push notification if app is focused
    OneSignal.inFocusDisplaying(0);
    OneSignal.configure();

    this.props.getAccount();

    Permissions.check('location').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response == 'undetermined' || response == 'denied') {
        this.requestLocationPermission();
      }
    })

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
        // Current location unavailable, fetch all listings
        this.props.navigation.setParams({
          address: 'Nationwide',
        });
        this.props.getListings(null, null, null, 1);
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
      bounds: bounds
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

