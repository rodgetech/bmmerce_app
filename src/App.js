import React from 'react';
import { YellowBox, View, Text } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { Icon } from 'react-native-elements';
import FlashMessage from "react-native-flash-message";
import { ConnectivityRenderer } from 'react-native-offline';
import Navigation from './navigation';
import navigationService from './utils/navigationService';
import { fonts, colors } from './styles';
import { moderateScale } from './utils/scaling';

// Temp fix for incorrect warnings
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class App extends React.Component {

  componentDidMount() {
    OneSignal.init("6e1f4645-71e3-469e-838a-16d2a3fdd1b1");
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
    OneSignal.configure();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          <ConnectivityRenderer>
            {isConnected => !isConnected ? 
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 18}}>
                <Icon
                  name='ios-sad'
                  type='ionicon'
                  color='#000'
                  size={55}
                />
                <Text style={{fontSize: moderateScale(20, 1.7), marginTop: 10, textAlign: 'center', fontFamily: fonts.robotoCondensed, color: colors.dark}}>
                  You are not connected to the internet
                </Text>
              </View>
              :
              <Navigation 
                ref={navigatorRef => {
                  navigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            }
        </ConnectivityRenderer>
        <FlashMessage position="top" />
      </View>
    );
  }
}
