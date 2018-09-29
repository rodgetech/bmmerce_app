import { createStackNavigator } from 'react-navigation';

import { 
    SetAddress,
} from '../screens';

import { colors } from '../styles';


export default createStackNavigator(
    {
        SetAddress: {
            screen: SetAddress,
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


