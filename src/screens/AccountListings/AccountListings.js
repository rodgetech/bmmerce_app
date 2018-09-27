import React from 'react';
import { 
  StyleSheet, 
  View,
  FlatList,
  Text
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { ListItem } from 'react-native-elements'
import Loader from '../../components/Loader';
import { fonts, colors } from '../../styles';

export default class AccountListings extends React.Component {

    componentDidMount() {
        this.props.getUserListings();
    }

    renderSeparator = () => {
        return (
            <View 
                style={{
                    height: 1, 
                    width: '100%', 
                    backgroundColor: colors.gray
                }}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.props.gettingUserListings ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.userListings}
                        renderItem={({item}) => (
                            <ListItem
                                onPress={() => this.props.navigation.navigate("EditListing", {listing: item})}
                                containerStyle={{borderBottomWidth: 0}}
                                title={
                                    <View style={{marginBottom: 6}}>
                                        <Text 
                                            allowFontScaling={false}
                                            style={{fontFamily: fonts.robotoCondensed, fontSize: 16, color: colors.dark}}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                }
                                subtitle={
                                    <View>
                                      <Text 
                                        allowFontScaling={false}
                                        style={{fontFamily: fonts.robotoCondensed, fontSize: 16, color: colors.green}}
                                      >
                                        ${parseFloat(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                      </Text>
                                    </View>
                                  }
                                leftAvatar={
                                    <FastImage
                                        style={{width: 80, height: 80, marginRight: 20}}
                                        source={{
                                            uri: item.images[0]['listing_image']['url'],
                                            priority: FastImage.priority.normal
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                }
                            />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                ) : (
                    <Loader
                        loading={this.props.gettingUserListings} 
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
