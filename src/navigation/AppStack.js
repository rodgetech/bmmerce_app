import React from  'react';
import { 
    createBottomTabNavigator, 
    createStackNavigator, 
    Header 
} from 'react-navigation';
import { Platform, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from '../components/TabBar';
import { colors, fonts } from '../styles';
import { moderateScale } from '../utils/scaling';

import { 
    Home, 
    Post,
    ListingView,
    Engagements,
    Message,
    Engagement,
    Account,
    Camera,
    AccountListings,
    EditListing,
    Search,
    Filter
} from '../screens';

import EngagementsTabIcon from './EngagementsTabIcon';

const HomeTabStack =  createStackNavigator(
    {
        Home: {
            screen: Home,
        },
    },
    {
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                backgroundColor: '#FFF',
                borderColor: '#e9eced',
                borderBottomWidth: 1
            },
        }
    }
)

const EngagementsTabStack =  createStackNavigator(
    {
        Engagements: {
            screen: Engagements,
        },
    },
    {
        navigationOptions: {
            title: "Engagements",
            headerStyle: {
                elevation: 0,
                backgroundColor: '#FFF',
                borderColor: '#e9eced',
                borderBottomWidth: 1
            },
            headerTitleStyle: {
                color: colors.dark,
                fontFamily: fonts.robotoCondensed,
                fontWeight: 'normal',
                fontSize: moderateScale(17, 2.5)
            },
            headerTintColor: '#FFF',
        }
    },
    
    
)

const MenuTabStack =  createStackNavigator(
    {
        Menu: {
            screen: Account,
        },
    },
    {
        navigationOptions: {
            headerStyle: {
                elevation: 0,
                backgroundColor: '#FFF',
                borderColor: '#e9eced',
                borderBottomWidth: 1
            },
            headerTintColor: '#FFF',
        }
    }
)

const TabNavigation =   createBottomTabNavigator(
    {
        Home : {
            screen: HomeTabStack,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => <Icon name="ios-home" size={23} color={tintColor} />,
            }),
        },
        PostTab : {
            screen: Post,
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({ tintColor }) => (
                    <View>
                      <Icon name="md-camera" size={23} color={tintColor} />
                    </View>
                ),
                tabBarOnPress: ({navigation}) => {
                    navigation.navigate('Post')
                },
                tabBarLabel: 'Post'
            }),
        },
        Engagements : {
            screen: EngagementsTabStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <View >
                      <Icon name="md-text" size={23} color={tintColor} />
                      <EngagementsTabIcon />
                    </View>
                  )
            },
        },
        Menu : {
            screen: MenuTabStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="ios-menu" size={23} color={tintColor} />
            },
        },
    },
    (Platform.OS === 'android')
    ? {
        tabBarComponent: props => <TabBar {...props} />,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: colors.green,
            inactiveTintColor: '#757575',
            activeBackgroundColor: '#FFF',
            inactiveBackgroundColor: '#FFF',
            showIcon: true,
            showLabel: true,
            labelStyle: {
                fontFamily: fonts.robotoCondensed,
                fontSize: moderateScale(12, 2.5),
                marginTop:-6, 
                marginBottom: 6,
            },
            iconStyle: {
                padding: 0
            },
            style: {
                borderTopWidth: 1,
                borderTopColor: '#f7f7f7',
                elevation: 0,
                backgroundColor: '#FFF',
            },
            indicatorStyle: {
                backgroundColor: 'transparent',
            },
        },
    }
    : {
        // don't change tabBarComponent here - it works on iOS after all.
        animationEnabled: false,
        tabBarOptions: {
            activeTintColor: '#FFF',
            inactiveTintColor: '#757575',
            activeBackgroundColor: colors.altGreen,
            showIcon: true,
            showLabel: false,
            style: {
                borderTopColor: "#F7F7F7",
                backgroundColor: "#27ae60",
                borderWidth: 0,
                elevation: 4
            },
            indicatorStyle: {
                backgroundColor: 'transparent',
            },
        },
    }
);


const AppStack =  createStackNavigator(
    {
        Home: {
            screen: TabNavigation,
            navigationOptions: {
                header: null
            }
        },
        ListingView: {
            screen: ListingView,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerTransparent: true,
                headerTitleStyle: {
                    color: '#FFF', 
                },
                headerStyle: {
                    elevation: 0
                },
                headerTintColor: "#FFF"
            },
            
        },
        Post: {
            screen: Post,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerTransparent: true,
                headerTitleStyle: {
                    color: '#FFF', 
                },
                headerStyle: {
                    elevation: 0
                },
                headerTintColor: "#FFF"
            },
        },
        Camera: {
            screen: Camera,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerTransparent: true,
                headerTitleStyle: {
                    color: '#FFF', 
                },
                headerStyle: {
                    elevation: 0
                },
                headerTintColor: "#FFF"
            },
            
        },
        Message: {
            screen: Message,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerTitleStyle: {
                    color: '#000', 
                },
                headerTintColor: "#000"
            },
            
        },
        Engagement: {
            screen: Engagement,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerStyle: {
                    elevation: 0,
                    backgroundColor: '#FFF',
                    borderColor: '#e9eced',
                    borderBottomWidth: 1
                },
                headerTitleStyle: {
                    color: colors.dark, 
                    fontWeight: 'normal'
                },
                headerTintColor: colors.dark,
            },
        },
        AccountListings: {
            screen: AccountListings,
            navigationOptions: {
                title: "Your Listings",
                header: (props) => <Header {...props} />,
                headerStyle: {
                    elevation: 0,
                    backgroundColor: '#FFF',
                    borderColor: '#e9eced',
                    borderBottomWidth: 1
                },
                headerTitleStyle: {
                    color: colors.dark, 
                    fontFamily: fonts.robotoCondensed,
                    fontWeight: 'normal',
                    fontSize: moderateScale(17, 2.5)
                },
                headerTintColor: colors.dark,
            },
        },
        Search: {
            screen: Search,
            navigationOptions: {
                headerTintColor: colors.dark,
            }
        },
        EditListing: {
            screen: EditListing,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                headerTransparent: true,
                headerTitleStyle: {
                    color: '#FFF', 
                },
                headerStyle: {
                    elevation: 0
                },
                headerTintColor: "#FFF",
            },
        },
        Filter: {
            screen: Filter,
            navigationOptions: {
                header: (props) => <Header {...props} />,
                title: "Change Location",
                headerStyle: {
                    elevation: 0,
                    backgroundColor: '#FFF',
                    borderColor: '#e9eced',
                    borderBottomWidth: 1
                },
                headerTitleStyle: {
                    color: colors.dark, 
                    fontFamily: fonts.robotoCondensed,
                    fontWeight: 'normal',
                    fontSize: moderateScale(17, 2.5)
                },
                headerTintColor: colors.dark,
            },
        },
    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            headerStyle: {
                elevation: 4
            },
            headerTitleStyle: {
                color: colors.altDark, 
            },
            headerTintColor: colors.altDark,
            
        }
    }
);

export default AppStack;