import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  ScrollView
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import OneSignal from 'react-native-onesignal';
import { connect } from 'react-redux';
import ActivityLoader from '../../components/ActivityLoader';
import { authOperations } from '../../modules/auth';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    paddingVertical: 40
  },
});

class Register extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
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

  register = () => {
    this.props.register({
        name: this.state.name,
        email: this.state.email, 
        password: this.state.password,
        player_id: this.state.playerId
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
          loading={this.props.registering} />
        <Text
          style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(25, 2.5), color: colors.dark, paddingHorizontal: 16, paddingBottom: 40}}
        >
          Sign up
        </Text>
        <View style={{paddingHorizontal: 16}}>
            <Input
              placeholderTextColor='#CCC'
              underlineColorAndroid='transparent'
              placeholder="Full Name"
              containerStyle={{marginBottom: 20, width: '100%'}}
              inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(18, 2.5), paddingVertical: 0}}
              inputContainerStyle={{borderColor: '#CCC', borderBottomWidth: 1, borderRadius: 0, paddingVertical: 6}}
              leftIcon={
                <Icon
                  name='user'
                  color='#CCC'
                  type='feather'
                />
              }
              value={this.state.name} 
              onChangeText={(name) => this.setState({name})}
            />
          <Input 
            placeholderTextColor='#CCC'
            autoCapitalize="none" 
            autoCorrect={false}
            keyboardType='email-address'
            underlineColorAndroid='transparent'
            placeholder="Email"
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
            placeholderTextColor='#CCC'
            secureTextEntry={true}
            underlineColorAndroid='transparent'
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
            title="Create Account"
            onPress={this.register}
            buttonStyle={{ backgroundColor: colors.altGreen, paddingVertical: 4, elevation: 0}} 
            disabled={this.state.loading || !this.state.email || !this.state.email || !this.state.password}
            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  const { registering, registerErrors } = state.auth;
  return { registering, registerErrors };
};

const mapDispatchToProps = (dispatch) => {
  const register = (newUser) => {
      dispatch(authOperations.register(newUser));
  };
  return { register };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
