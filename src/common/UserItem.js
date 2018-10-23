import React from 'react';
import { 
  View,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { ListItem } from 'react-native-elements'
import { fonts, colors } from '../styles';
import { moderateScale } from '../utils/scaling';

export default class UserItem extends React.PureComponent {
  render() {
    return (
        <ListItem
            // onPress={() => this.props.navigation.navigate("EditListing", {listing: item})}
            containerStyle={{borderBottomWidth: 0}}
            title={
                <View style={{marginBottom: 6}}>
                    <Text
                        style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark}}
                    >
                        {this.props.user.name}
                    </Text>
                </View>
            }
            subtitle={
                <View>
                    <Text
                    style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.green}}
                    >
                    {this.props.user.address}
                    </Text>
                </View>
                }
            leftAvatar={
                <FastImage
                    style={{width: 80, height: 80, marginRight: 20, backgroundColor: '#f7f7f7', borderRadius: 2}}
                    source={{
                        uri: this.props.user.avatar,
                        priority: FastImage.priority.normal
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            }
        />
    );
  };
}
  