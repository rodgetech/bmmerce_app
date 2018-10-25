import { createStackNavigator } from 'react-navigation';

import { 
    TryPosting,
    TryCamera
} from '../screens';

import { colors } from '../styles';


const MainStack = createStackNavigator(
    {
        TryPosting: {
            screen: TryPosting,
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
  
  export default createStackNavigator(
    {
      TryPosting: {
        screen: MainStack,
      },
      TryCamera: {
        screen: TryCamera,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );