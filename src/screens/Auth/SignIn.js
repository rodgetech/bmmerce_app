import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  ScrollView
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import { Input, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ActivityLoader from '../../components/ActivityLoader';
import { moderateScale } from '../../utils/scaling';
import { authOperations } from '../../modules/auth';
import { fonts, colors } from '../../styles'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingVertical: 40
  },
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {
    OneSignal.setSubscription(false); // Disable notifications
  }

  authenticate = () => {
    console.log(this.state.email, this.state.password);
    this.props.authenticate({
      email: this.state.email, 
      password: this.state.password,
    })
  }

  render() {
    return (
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
          showsVerticalScrollIndicator={false}
        >
        <ActivityLoader
          loading={this.props.authenticating} />
        <Text 
          style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(25, 2.5), color: colors.dark, paddingHorizontal: 20, paddingBottom: 40}}
        >
          Sign in to continue
        </Text>
        <View style={{paddingHorizontal: 20}}>
          <Input 
            autoCapitalize="none" 
            autoCorrect={false}
            keyboardType='email-address'
            underlineColorAndroid='transparent'
            placeholder="Email"
            placeholderTextColor='#CCC'
            containerStyle={{marginBottom: 20, width: '100%'}}
            inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(18, 2.5), paddingVertical: 0}}
            inputContainerStyle={{borderColor: '#CCC', borderBottomWidth: 1, borderRadius: 0, paddingVertical: 6}}
            leftIcon={
              <Icon
                name='mail'
                color='#CCC'
                type='feather'
              />
            }
            value={this.state.email} 
            onChangeText={(email) => this.setState({email})}
          />
          <Input 
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            placeholderTextColor='#CCC'
            placeholder="Password"
            containerStyle={{marginBottom: 30, width: '100%'}}
            inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(18, 2.5), paddingVertical: 0}}
            inputContainerStyle={{borderColor: '#CCC', borderBottomWidth: 1, borderRadius: 0, paddingVertical: 6}}
            leftIcon={
              <Icon
                name='lock'
                color='#CCC'
                type='feather'
              />
            }
            value={this.state.password} 
            onChangeText={(password) => this.setState({password})}
          />
          <Button 
            elevation={false}
            title="Sign In"
            onPress={this.authenticate}
            buttonStyle={{ backgroundColor: colors.altGreen, paddingVertical: 4, elevation: 0}} 
            disabled={!this.state.email || !this.state.password}
            textStyle={{fontFamily: fonts.robotoCondensed}}
            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
          />
        </View>
        </ScrollView>
    );
  }
}

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
)(SignIn);
