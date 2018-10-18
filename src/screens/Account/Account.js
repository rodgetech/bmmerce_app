import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import FastImage from 'react-native-fast-image'
import { Icon } from 'react-native-elements'
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

export default class Account extends React.PureComponent {

  state = {
    account: {}
  }

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;
    console.log("Something went wrong", params);
    return {
      // headerRight: (
      //   <Icon
      //     name='cog'
      //     type='entypo'
      //     color={colors.dark}
      //     iconStyle={{marginRight: 14}}
      //     containerStyle={{justifyContent: 'center'}}
      //   />
      // ),
      headerLeft: (
        params ?      
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 14}}>
            <FastImage
              style={{height: 35, width: 35, borderRadius: 1, backgroundColor: '#f7f7f7'}}
              source={{
                uri: params.avatar || '',
                priority: FastImage.priority.normal
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <Text style={{fontSize: moderateScale(17, 1.7), color: colors.dark, fontFamily: fonts.robotoCondensed, paddingLeft: 8}}>
              {params.name}
            </Text>
          </View>
        :
          <Text style={{fontSize: moderateScale(17, 1.7), color: colors.dark, fontFamily: fonts.robotoCondensed, paddingHorizontal: 14}}>
            Loading...
          </Text>
      ),
    }
  };

  componentDidMount() {
    this.props.getAccount();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.account !== this.props.account) {
      let account = this.props.account;
      this.props.navigation.setParams({
        name: account.name,
        avatar: account.avatar,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.account !== prevState.account){
      return { account: nextProps.account};
    }
    else return null;
  }

  onSignOut = () => {
    Alert.alert(
      'Sign Out?',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Continue', onPress: () => this.signOut()},
      ],
      { cancelable: true }
    )
  }

  signOut = async() => {
    try {
      await AsyncStorage.removeItem('authToken', (err) => {
        OneSignal.deleteTag("userId");
        this.props.navigation.navigate('Auth');
        this.props.logout();
      });
    } catch(error) {
        console.log("Something went wrong", error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <TouchableOpacity 
              style={{paddingVertical:24, paddingHorizontal: 14, borderColor: "#fafafa", borderBottomWidth: 1, flexDirection: 'row'}}
              onPress={() => this.props.navigation.navigate('Post')}
            >
              <Icon
                name='camera'
                type='entypo'
                color={colors.dark}
              />
              <Text 
                style={styles.bodyLabel}
              >
                Post Something
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical:24, paddingHorizontal: 14, borderColor: "#fafafa", borderBottomWidth: 1, flexDirection: 'row' }}
              onPress={() => this.props.navigation.navigate('AccountListings')}
            >
              <Icon
                name='list'
                type='entypo'
                color={colors.dark}
              />
              <Text 
                style={styles.bodyLabel}
              >
                Listings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical:24, paddingHorizontal: 14, flexDirection: 'row', borderColor: "#fafafa", borderBottomWidth: 1, alignSelf: "stretch" }}
              onPress={() => this.props.navigation.navigate('Engagements')}
            >
              <Icon
                name='md-text'
                type='ionicon'
                color={colors.dark}
              />
              <Text 
                style={styles.bodyLabel}
              >
                Engagements
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical:24, paddingHorizontal: 14, flexDirection: 'row', borderColor: "#fafafa", borderBottomWidth: 1, alignSelf: "stretch" }}
              onPress={() => this.props.navigation.navigate('SetAddress', {bakToMenu: true})}
            >
              <Icon
                name='md-pin'
                type='ionicon'
                color={colors.dark}
              />
              <Text 
                style={styles.bodyLabel}
              >
                Update Your Address
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical: 24, paddingHorizontal: 14, flexDirection: 'row'}}
              onPress={this.onSignOut}
            >
              <Icon
                  name='log-out'
                  type='entypo'
                  color={colors.dark}
                />
              <Text 
                style={styles.bodyLabel}
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  body: {
    borderColor: "#f7f7f7",
  },
  bodyLabel: {
    fontFamily: fonts.robotoCondensed,
    fontSize: moderateScale(15, 2.5), 
    color: colors.altDark,
    marginLeft: 20
  },
  footer: {
    paddingBottom: 20
  }
});
