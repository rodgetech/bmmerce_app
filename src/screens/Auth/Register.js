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
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
  },
});

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
        name: '',
        email: '',
        password: '',
        playerId: ''
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    const playerId = navigation.getParam('playerId', '');
    console.log("PLAYER", playerId);
    this.setState({playerId: playerId});
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
      <View style={styles.container}>
        <ActivityLoader
          loading={this.props.registering} />
        <Text
          style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(25, 2.5), color: colors.dark, textAlign: 'center', paddingBottom: 40}}
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
            disabled={!this.state.email || !this.state.email || !this.state.password}
            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
          />
        </View>
      </View>
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
