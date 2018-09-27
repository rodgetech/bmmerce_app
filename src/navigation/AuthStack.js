import { createStackNavigator } from 'react-navigation';

import { 
    Auth,
    SignIn,
    Register
} from '../screens';

import { colors } from '../styles';


export default createStackNavigator(
    {
        Auth: {
            screen: Auth,
        },
        SignIn: {
            screen: SignIn,
        },
        Register: {
            screen: Register,
        },
    },
    {
        navigationOptions: {
            headerTransparent: true,
            headerTitleStyle: {
                color: '#FFF', 
            },
            headerTintColor: colors.dark
        }
    }
);


