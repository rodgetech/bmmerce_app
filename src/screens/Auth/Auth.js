import React from 'react';
import { 
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Button, Icon } from 'react-native-elements'
import {
  LoginManager, 
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
// import { 
//   GoogleSignin, 
//   statusCodes 
// } from 'react-native-google-signin';
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import { authOperations } from '../../modules/auth';
import { fonts, colors } from '../../styles'
import { moderateScale } from '../../utils/scaling';

// GoogleSignin.configure();

class Auth extends React.Component {

  state = {
    playerId: '',
    loading: true
  }

  componentWillMount() {
    OneSignal.setSubscription(false); // Disable notifications
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure();
  }

  componentWillUnmount() {
    console.log("AUTH PUSH UNMOUNTED");
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onIds = (device) => {
    this.setState({
      playerId: device.userId,
      loading: false
    });
  }

  facebookLogin = () => {
    LoginManager.logInWithReadPermissions(['public_profile'])
      .then((result) => {
        if (result.isCancelled) {
          console.log("FB CANCELLED");
        } else {
          console.log("FB RESULT", result);
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log("ACCESS TOKEN", data.accessToken.toString());
              // Fetch user data
              const infoRequest = new GraphRequest(
                '/me?fields=name,picture.type(large)',
                null,
                this.facebookResponseCallback
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            }
          )
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
      })
  }

  // Facebook authenticate
  facebookResponseCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log("GRAPH RESPONSE", result);
      this.props.authenticate({
        uid: result.id,
        name: result.name,
        avatar: result.picture.data.url,
        provider: "facebook",
        player_id: this.state.playerId
      });
    }
  }

  googleLogin = async () => {
    console.log("CALLED");
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      //this.setState({ userInfo });
      console.log("GOOGLE SIGN IN", result);
      this.props.authenticate({
        uid: result.user.id,
        email: result.user.email,
        name: `${result.user.givenName} ${result.user.familyName}`,
        provider_image: result.user.photo,
        provider: "google",
        player_id: this.state.playerId
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log("GOOGLE SIGN IN ERROR", error)
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text 
          style={{fontFamily: fonts.robotoCondensed,fontSize: moderateScale(35, 2.5), color: colors.green, textAlign: 'center'}}
        >
          bmmerce
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Icon
              name='shopping-bag'
              type='font-awesome'
              color='#CCC'
              iconStyle={{marginRight: 10}}
              size={20}
            />
          <Text 
            style={{fontFamily: fonts.robotoCondensed,fontSize: moderateScale(17, 2.5), color: colors.dark, textAlign: 'center', paddingBottom: 60}}
          >
            Sell & buy stuff near you
          </Text>
        </View>
        <Button 
          title="Continue with Facebook"
          icon={{name: 'logo-facebook', type: 'ionicon', color: '#FFF'}}
          onPress={this.facebookLogin}
          titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 2.5), fontWeight: 'normal'}}
          buttonStyle={{ backgroundColor: "#3B5998", marginTop: 20, paddingVertical: 6, elevation: 0}} 
          disabled={this.state.loading}
        />
        {/* <Button 
          title="Continue with Google"
          icon={{name: 'logo-google', type: 'ionicon', color: '#FFF'}}
          onPress={this.googleLogin}
          titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: 16, fontWeight: 'normal'}}
          titleProps={{allowFontScaling: false}}
          buttonStyle={{ backgroundColor: "#3498db", marginTop: 16, borderRadius: 6, paddingVertical: 6}} 
        /> */}
        <View style={{marginTop: 28}}>
          <Text 
            style={{fontFamily: fonts.robotoCondensed, color: colors.dark, textAlign: "center", fontSize: moderateScale(16, 2.5)}}
          >
            Or continue with email
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 10}}>
              <Button 
                title="Sign up"
                onPress={() => this.props.navigation.navigate('Register')}
                titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 2.5), fontWeight: 'normal'}}
                buttonStyle={{backgroundColor: colors.altGreen, marginTop: 20, paddingVertical: 6, elevation: 0}} 
              />
            </View>
            <View style={{flex: 1}}>
              <Button 
                title="Log in"
                onPress={() => this.props.navigation.navigate('SignIn')}
                titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(16, 2.5), fontWeight: 'normal'}}
                buttonStyle={{backgroundColor: colors.altGreen, marginTop: 20, paddingVertical: 6, elevation: 0}} 
              />
            </View>
          </View> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
});

const mapStateToProps = (state) => {
  const { account, authenticating, signInError } = state.auth;
  return { account, authenticating, signInError };
};

const mapDispatchToProps = (dispatch) => {
  const authenticate = (user) => {
      dispatch(authOperations.authenticate(user));
  };
  return { authenticate };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
