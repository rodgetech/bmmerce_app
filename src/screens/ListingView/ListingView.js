import React from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  Text,
  ActivityIndicator
} from 'react-native';
import { format } from 'date-fns';
import { Button, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles';
import Slider from './Slider';

export default class ListingView extends React.PureComponent {

  componentDidMount = () => {
    const listingId = this.props.navigation.getParam('listingId', null);
    this.props.getListing(listingId);
  }

  onMessage = () => {
    this.props.navigation.navigate('Message');
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.props.gettingListing) {
      return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: '#FFF'}}>
          <ActivityIndicator 
            animating
            size="large"
            color={colors.green}
          />
        </View>
      )
    }
    return (
        this.props.gettingListing ? 
          <View style={{flex: 1, justifyContent: "center", backgroundColor: '#F7F7F7'}}>
            <ActivityIndicator 
              animating
              size="large"
              color={colors.green}
            />
          </View>
        :
          <View style={{flex: 1}}>
            <View style={{flex:1, backgroundColor: "#FFF"}}>
              <ScrollView showsVerticalScrollIndicator={false} >
                {this.props.listing.images ? 
                  <Slider 
                    images={this.props.listing.images} 
                    onImagePress={(image) => this.props.navigation.navigate('ImageView', {image: image})}
                  />
                :
                  <View style={{backgroundColor: '#f7f7f7', height: 350}}>
                  </View>
                }
                <View style={{backgroundColor: '#FFF', justifyContent: 'center', paddingVertical: 20}}>
                  <View style={{backgroundColor: "#FFF", flexDirection: "row", paddingBottom: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#F7F7F7"}}>
                    <View style={{flex: 2}}>
                      <Text style={{ fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 1.2), color: colors.dark}}>
                        {this.props.listing.title}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{ fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 1.2), color: "#1FB200", textAlign: "right"}}>
                        ${parseFloat(this.props.listing.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                      </Text>
                    </View>
                  </View>
                  {this.props.listing.description !== null && this.props.listing.description !== "" &&
                    <View style={{borderBottomWidth: 1, borderBottomColor: "#F7F7F7", paddingVertical: 12}}>
                      <Text style={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(16, 1.4), paddingHorizontal: 12}}>
                        {this.props.listing.description}
                      </Text>
                    </View>
                  }
                  {this.props.listing.listedBy &&
                    <View style={{flexDirection: 'row', paddingTop: 10, marginHorizontal: 12}}>
                        <View >
                        <FastImage
                          style={{width: 35, height: 35, borderRadius: 35/2, marginRight: 12}}
                          source={{
                            uri: this.props.listing.listedBy.account.avatar,
                            priority: FastImage.priority.normal
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                        </View>
                        <View style={{flex: 1}}>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.dark, marginVertical: 0}}>
                            Listed by {this.props.listing.listedBy.account.name}
                          </Text>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.dark, paddingTop: 1}}>
                            {`${this.props.listing.address}, ${this.props.listing.district}`}
                          </Text>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.grey, paddingTop: 8}}>
                            {format(this.props.listing.createdAt, 'EEEE, LLLL do yyyy')}
                          </Text>
                        </View>
                    </View>
                  }
                </View>
              </ScrollView>
            </View>
          <View>
            <Button
              containerViewStyle={{width: '100%', marginLeft: 0, alignSelf: 'stretch'}}
              buttonStyle={{backgroundColor: colors.green}}
              title='Message' 
              titleStyle={{fontFamily: fonts.robotoCondensed, fontWeight: 'normal', fontSize: moderateScale(18, 1.9)}}
              icon={{name: 'md-text', type: 'ionicon', color: "#FFF", size: 20}}
              //onPress={() => this.setState({modalVisible: true})}
              onPress={
                () => navigate('Engagement', {
                    listingId: this.props.listing.id, 
                    recipientId: this.props.listing.listedBy.account.id,
                    image: this.props.listing.images[0]['listing_image']['url'],
                    price: this.props.listing.price,
                    recipientName: this.props.listing.listedBy.account.name
                  }
                )}
            
            />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 100,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
