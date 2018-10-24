import React from 'react';
import { 
  StyleSheet, 
  View,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import { format } from 'date-fns';
import FastImage from 'react-native-fast-image';
import { colors, fonts } from '../../styles';
import { moderateScale } from '../../utils/scaling';
import ListingsContainer from './ListingsContainer';


export default class User extends React.Component {

    state = {
        page: 1,
    }

    static navigationOptions = ({ navigation }) => {
        const user = navigation.getParam('user', {})
        return {
          title: user.name,
        };
    };

    // componentDidMount() {
    //     this.props.getUser();
    // }

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

    handleLoadMore = () => {
        this.setState({
          page: this.state.page + 1,
        }, 
        () => {
          this.props.getUsers(
            this.state.page,
            15
          )
        });
      }

    renderFooter = () => {
        if (this.props.gettingUsers) {
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
        const { navigation } = this.props;
        const user = navigation.getParam('user', {});
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginHorizontal: 8, marginTop: 13, borderBottomWidth: 1, borderColor: '#f7f7f7', paddingBottom: 13, marginBottom: 6}}>
                    <FastImage
                        style={{width: 90, height: 90, borderRadius: 90/2, backgroundColor: '#f7f7f7', marginRight: 20}}
                        source={{
                            uri: user.avatar,
                            priority: FastImage.priority.normal
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text
                            style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.green}}
                        >
                            From {user.address}
                        </Text>
                        <Text
                            style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(15, 2.5), color: colors.dark}}
                        >
                            Joined on {format(user.created_at, 'EEEE, LLLL do yyyy')}
                        </Text>
                    </View>
                </View>
                <ListingsContainer 
                    userId={user.id} 
                    navigate={this.props.navigation.navigate}
                />
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
