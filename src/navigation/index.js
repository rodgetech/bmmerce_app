import React from 'react';
import {
    createSwitchNavigator
} from 'react-navigation';

import {
    AuthLoading
} from '../screens';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AddressStack from './AddressStack';

export default createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: AppStack,
    Address: AddressStack,
    Auth: AuthStack,
}, {
    initialRouteName: 'AuthLoading',
});