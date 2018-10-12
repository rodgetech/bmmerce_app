import React from 'react';
import { 
  StyleSheet, 
  FlatList, 
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import { formatDistance } from 'date-fns';
import FastImage from 'react-native-fast-image'
import Loader from '../../components/Loader';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles'
import ListingItem from '../../common/ListingItem';


const numColumns = 2;

export default class Search extends React.Component {

  state = {
    searchQuery: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: (
        <View style={styles.searchSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight: 20}}>
            <Icon
              name='md-arrow-back'
              type='ionicon'
              color={colors.dark}
            />
          </TouchableOpacity>
          <TextInput
            autoFocus={true}
            placeholderTextColor="#CCC"
            style={styles.searchInput}
            placeholder="Search for something..."
            underlineColorAndroid="transparent"
            onChangeText={(query) => params.onSearch(query)}
          />
        </View>
      ),
    };
  };

  componentDidMount = () => {
    this.props.navigation.setParams({
      onSearch: this.onSearch,
    });
  }

  componentWillUnmount() {
    this.props.clearSearch();
  }

  onSearch = (query) => {
    console.log(query);
    if (query !== '') {
      this.props.search(query);
    } 
  }

  onPost = () => {
    this.props.navigation.navigate('Post');
  }

  onSelectListing = (listing) => {
    this.props.navigation.navigate('ListingView', {listing, hideTabBar: true });
  }

  renderItem = ({ item, index }) => {
    return (
      <ListingItem 
        listing={item}
        onSelectListing={(listingId) => this.props.navigation.navigate('ListingView', {listingId: listingId, hideTabBar: true })}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.searching ? (
          <Loader
              loading={this.props.searching} 
            />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.listings}
            style={styles.container}
            renderItem={this.renderItem}
            numColumns={numColumns}
            keyExtractor={(item, index) => item.id.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  buttonStyles: {
    marginLeft: 0,
    marginRight: 0,
  },
  imageContainer: {
    backgroundColor: "#fafafa",
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
  searchSection: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginTop: Platform.OS == "ios" ? 20 : 0,
    paddingHorizontal: 12,
    elevation: 2
  },
  searchIcon: {
      padding: 10,
  },
  searchInput: {
      flex: 1,
      paddingTop: 10,
      paddingRight: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      color: colors.dark,
      fontSize: moderateScale(16, 2),
      fontFamily: fonts.robotoCondensed,
  }
});
