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
import { moderateScale } from '../../utils/scaling';

export default class AccountListings extends React.Component {

    componentDidMount() {
        this.props.getUsers(1, 20);
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
                {!this.props.gettingUsers ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.users}
                        renderItem={({item}) => (
                            <ListItem
                                onPress={() => this.props.navigation.navigate("EditListing", {listing: item})}
                                containerStyle={{borderBottomWidth: 0}}
                                title={
                                    <View style={{marginBottom: 6}}>
                                        <Text
                                            style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark}}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                }
                                subtitle={
                                    <View>
                                      <Text
                                        style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.green}}
                                      >
                                        {item.address}
                                      </Text>
                                    </View>
                                  }
                                leftAvatar={
                                    <FastImage
                                        style={{width: 80, height: 80, marginRight: 20, backgroundColor: '#f7f7f7'}}
                                        source={{
                                            uri: item.avatar,
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
