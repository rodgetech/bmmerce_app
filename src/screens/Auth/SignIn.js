import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import ActivityLoader from '../../components/ActivityLoader';

import { authOperations } from '../../modules/auth';
import { fonts, colors } from '../../styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  authenticate = () => {
    console.log(this.state.email, this.state.password);
    this.props.authenticate({
      email: this.state.email, 
      password: this.state.password
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <ActivityLoader
          loading={this.props.authenticating} />
        <Text 
          allowFontScaling={false}
          style={{fontFamily: fonts.robotoCondensed, fontSize: 30, color: colors.dark, textAlign: 'center', paddingBottom: 40}}
        >
          Sign in
        </Text>
        <View style={{paddingHorizontal: 16}}>
          <Input 
            autoCapitalize="none" 
            autoCorrect={false}
            keyboardType='email-address'
            underlineColorAndroid='transparent'
            placeholder="Email"
            placeholderTextColor='#CCC'
            containerStyle={{marginBottom: 20, width: '100%'}}
            inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: 18, paddingVertical: 0}}
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
            inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: 18, paddingVertical: 0}}
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
            buttonStyle={{ backgroundColor: colors.altGreen, paddingVertical: 6, elevation: 0}} 
            disabled={!this.state.email || !this.state.password}
            textStyle={{fontFamily: fonts.robotoCondensed}}
            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: 18, fontWeight: 'normal'}}
          />
        </View>
      </View>
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
