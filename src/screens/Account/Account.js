import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image'
import { Icon } from 'react-native-elements'
import { fonts, colors } from '../../styles';

export default class Account extends React.PureComponent {

  componentDidMount() {
    this.props.getAccount();
  }

  signOut = async() => {
    try {
        await AsyncStorage.removeItem('authToken', (err) => {
        this.props.navigation.navigate('Auth');
      });
    } catch(error) {
        console.log("Something went wrong", error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            {this.props.account.avatar &&
              <FastImage
                style={{width: 60, height: 60, borderRadius: 30, marginRight: 20}}
                source={{
                  uri: this.props.account.avatar,
                  priority: FastImage.priority.normal
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            }
            <Text 
              style={{fontFamily: fonts.robotoCondensed, fontSize: 20, color: colors.dark}} 
              numberOfLines={1}
              allowFontScaling={false}
            >
              {this.props.account.name}
            </Text>
          </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <TouchableOpacity 
              style={{paddingVertical:24, borderColor: "#F2F2F2", borderBottomWidth: 1, alignSelf: "stretch"}}
              onPress={() => this.props.navigation.navigate('Post')}
            >
              <Icon
                name='camera'
                type='entypo'
                color={colors.altGreen}
              />
              <Text 
                allowFontScaling={false}
                style={styles.bodyLabel}
              >
                Post Something
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical:24, borderColor: "#F2F2F2", borderBottomWidth: 1, alignSelf: "stretch" }}
              onPress={() => this.props.navigation.navigate('AccountListings')}
            >
              <Icon
                name='list'
                type='entypo'
                color={colors.altGreen}
              />
              <Text 
                allowFontScaling={false}
                style={styles.bodyLabel}
              >
                Listings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical:24, borderColor: "#F2F2F2", borderBottomWidth: 1, alignSelf: "stretch" }}
              onPress={() => this.props.navigation.navigate('Engagements')}
            >
              <Icon
                name='ios-chatbubbles'
                type='ionicon'
                color={colors.altGreen}
              />
              <Text 
                style={styles.bodyLabel}
                allowFontScaling={false}
              >
                Engagements
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{paddingVertical:24, borderColor: "#F2F2F2", borderBottomWidth: 1, alignSelf: "stretch" }}>
              <Icon
                name='ios-settings'
                type='ionicon'
                color={colors.altGreen}
              />
              <Text 
                allowFontScaling={false}
                style={styles.bodyLabel}
              >
                Account Settings
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{paddingVertical: 24, alignSelf: "stretch"}}
              onPress={this.signOut}
            >
              <Icon
                  name='log-out'
                  type='entypo'
                  color={colors.altGreen}
                />
              <Text 
                allowFontScaling={false}
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
  header: {
    paddingHorizontal: 20,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 2,
    borderTopWidth: 1,
    borderColor: "#f7f7f7",
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyLabel: {
    fontFamily: fonts.robotoCondensed,
    fontSize: 16, 
    textAlign: "center", 
    color: colors.altDark
  },
  footer: {
    paddingBottom: 20
  }
});
