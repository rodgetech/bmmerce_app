import React from 'react';
import { YellowBox, View, Text } from 'react-native';
import OneSignal from 'react-native-onesignal';
import FlashMessage from "react-native-flash-message";
import Navigation from './navigation';
import navigationService from './utils/navigationService';

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
        <Navigation 
          ref={navigatorRef => {
            navigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        <FlashMessage position="top" />
      </View>
    );
  }
}
