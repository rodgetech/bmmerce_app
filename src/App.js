import React from 'react';
import { YellowBox } from 'react-native';
import OneSignal from 'react-native-onesignal';
import Navigation from './navigation';
import navigationService from './utils/navigationService';

// Temp fix for incorrect warnings
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

export default class App extends React.Component {

  componentWillMount() {
    OneSignal.init("6e1f4645-71e3-469e-838a-16d2a3fdd1b1");
    OneSignal.enableVibrate(true);
    OneSignal.enableSound(true);
  }

  render() {
    return (
      <Navigation 
        ref={navigatorRef => {
          navigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
