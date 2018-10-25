import React from 'react';
import { 
  StyleSheet, 
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { ListItem } from 'react-native-elements'
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

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
                                            style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark}}
                                        >
                                            {item.title}
                                        </Text>
                                    </View>
                                }
                                subtitle={
                                    <View>
                                      <Text
                                        style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.green}}
                                      >
                                        ${parseFloat(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                                      </Text>
                                    </View>
                                  }
                                leftAvatar={
                                    <FastImage
                                        style={{width: 80, height: 80, marginRight: 20, backgroundColor: '#f7f7f7'}}
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
                    <View style={{paddingVertical: 20}}>
                        <ActivityIndicator 
                        animating
                        size="large"
                        color={colors.green}
                        />
                    </View>
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
