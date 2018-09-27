import React from 'react';
import {
    createSwitchNavigator
} from 'react-navigation';

import {
    AuthLoading
} from '../screens';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
}, {
    initialRouteName: 'AuthLoading',
});