import React from 'react';
import { 
  StyleSheet, 
  View,
  AsyncStorage,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default class AuthLoading extends React.PureComponent {

  constructor(props) {
    super(props);
    this.authFlow();
  }

  authFlow = async () => {
    const authToken = await AsyncStorage.getItem('authToken');

    SplashScreen.hide();
    if (authToken) {
      this.props.navigation.navigate('App');
      // this.props.navigation.navigate('TryPosting');
    } else {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
});
