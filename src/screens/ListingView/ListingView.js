import React from 'react';
import { 
  StyleSheet, 
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { format } from 'date-fns';
import { Button, Icon } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../../utils/scaling';
import { colors, fonts } from '../../styles';
import Slider from './Slider';
import MessageModal from './MessageModal';

export default class ListingView extends React.PureComponent {

  state = {
    message: 'Hello, is this still available?',
    showMessageModal: false,
    listingId: null
  }

  componentDidMount = () => {
    const listingId = this.props.navigation.getParam('listingId', null);
    this.props.getListing(listingId);
    this.setState({listingId})
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.navigation.state.params.listingId !== this.props.navigation.state.params.listingId) {
      let listingId = this.props.navigation.state.params.listingId;
      this.props.getListing(listingId);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.navigation.state.params.listingId !== prevState.listingId){
      return { listingId: nextProps.navigation.state.params.listingId};
    }
    else return null;
  }

  onMessage = () => {
    this.props.navigation.navigate('Message');
  }

  sendMessage = () => {
    const newMessage = {
      body: this.state.message,
      recipientId: this.props.listing.listedBy.account.id,
      listingId: this.props.listing.id
    }
    this.props.createEngagementMessage(newMessage);
    this.setState({
      showMessageModal: false,
      message: ''
    });
  }

  render() {
    const {navigate} = this.props.navigation;
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
            <MessageModal 
              showMessageModal={this.state.showMessageModal}
              hideMessageModal={() => this.setState({showMessageModal: false})}
              listing = {this.props.listing}
              message = {this.state.message}
              onMessageChange = {(message) => this.setState({message})}
              onSendMessage = {this.sendMessage}
            />
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
                        <TouchableOpacity 
                          activeOpacity={0.8}
                          onPress={() => this.props.navigation.navigate('User',{ user: this.props.listing.listedBy.account })}
                        >
                          <FastImage
                            style={{width: 45, height: 45, borderRadius: 1, marginRight: 12, backgroundColor: '#f7f7f7'}}
                            source={{
                              uri: this.props.listing.listedBy.account.avatar,
                              priority: FastImage.priority.normal
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </TouchableOpacity>
                        <View style={{flex: 1}}>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.dark, marginVertical: 0}}>
                            Listed by {this.props.listing.listedBy.account.name}
                          </Text>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.grey, paddingTop: 4}}>
                            Located near {this.props.listing.address}
                          </Text>
                          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 1.4), color: colors.grey}}>
                            {format(this.props.listing.createdAt, 'EEEE, LLLL do yyyy')}
                          </Text>
                        </View>
                    </View>
                  }
                  <Button
                    containerViewStyle={{width: '100%', marginLeft: 0, alignSelf: 'stretch', marginHorizontal: 12}}
                    buttonStyle={{backgroundColor: colors.green, marginHorizontal: 12, marginTop: 20, marginBottom: 9, paddingVertical: 2, elevation: 0}}
                    title='Message Seller' 
                    titleStyle={{fontFamily: fonts.robotoCondensed, fontWeight: 'normal', fontSize: moderateScale(18, 1.9)}}
                    icon={{name: 'md-text', type: 'ionicon', color: "#FFF", size: 20}}
                    onPress={() => this.setState({showMessageModal: true})}
                  />
                </View>
              </ScrollView>
            </View>
          <View>
            
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
