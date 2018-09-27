import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  FlatList,
} from 'react-native';
import { ListItem, Badge } from 'react-native-elements';
import FastImage from 'react-native-fast-image'
import Loader from '../../components/Loader';
import { colors, fonts } from '../../styles';

export default class Engagements extends React.PureComponent {


  componentDidMount() {
    this.navListener = this.props.navigation.addListener('willFocus', () => {
      //console.log("I AM NOW FOCUSED");
      this.props.getEngagements();
    });
  }

  componentWillUnmount() {
    this.navListener.remove();
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: colors.gray,
        }}
      />
    )
  }

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        title={
          <View style={{marginBottom: 6}}>
            <Text 
              allowFontScaling={false}
              style={{fontFamily: fonts.robotoCondensed, fontSize: 16, color: colors.dark}}
            >
              {item.recipient.name}
            </Text>
          </View>
        }
        subtitle={
          <View>
            <Text 
              allowFontScaling={false}
              style={{fontFamily: fonts.robotoCondensed, fontSize: 16, color: colors.grey}}
            >
              {item.listing.title}
            </Text>
          </View>
        }
        leftAvatar={
          <FastImage
            style={{width: 70, height: 70, marginRight: 14}}
            source={{
              uri: item.listing.images[0].listing_image.url,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        }
        rightIcon={
          <View>
            {item.unreadMessagesCount > 0 &&
              <Badge
                containerStyle={{ backgroundColor: colors.green, marginTop: 4}}
              >
                <Text 
                  allowFontScaling={false}
                  style={{color: "#FFF", fontFamily: fonts.robotoCondensed, fontSize: 12}}>
                  {item.unreadMessagesCount}
                </Text>
              </Badge>
            }
          </View>
        }
        containerStyle={{borderBottomWidth: 0}}
        onPress={
          () => this.props.navigation.navigate(
            'Engagement', 
            {
              engagementId: item.id, 
              recipientId: item.recipient.id, 
              recipientName: item.recipient.name,
              senderId: item.senderId,
              listingId: item.listing.id,
              image: item.listing.images[0].listing_image.url,
              price: item.listing.price,
            }
          )}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.gettingEngagements ? (
            <FlatList 
              data={this.props.engagements}
              renderItem={this.renderItem}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
            />
        ) : (
          <Loader
            loading={this.props.gettingEngagements} 
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
});
