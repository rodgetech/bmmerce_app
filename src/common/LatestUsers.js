import React from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
    connect
} from 'react-redux';
import FastImage from 'react-native-fast-image';
import { fonts, colors } from '../styles';
import { moderateScale } from '../utils/scaling';

import {
    usersOperations
} from '../modules/users';


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    imageContainer: {
        backgroundColor: "#F7F7F7",
        height: 65, 
        width: 65,
        marginHorizontal: 16,
        borderRadius: 65/2
      },
});

class LatestUsers extends React.PureComponent {
    componentDidMount () {
        this.props.getLatestUsers();
    }

    renderLoadingImages = () => {
        let placeholder = [];
        for (let i = 0; i < 4; i++) {
            placeholder.push (
                <View 
                    style={styles.imageContainer}
                    key={i}
                >
                </View>
            )
        }
        return placeholder;
      }

    render() {
        return (
            <View style={{backgroundColor: '#FFF', paddingTop: 6, paddingBottom: 9, borderColor: '#E3E3E3', borderBottomWidth: 1}}>
                <View style={{marginHorizontal: 8, marginBottom: 10, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={{fontFamily: fonts.robotoCondensed, color: colors.dark, fontSize: moderateScale(17, 1.5)}}>
                            Latest Users
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={{justifyContent: 'flex-end'}}
                        onPress={() => this.props.navigate('Users')}
                    >
                        <Text style={{fontFamily: fonts.robotoCondensed, color: colors.green, fontSize: moderateScale(17, 1.5)}}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    {this.props.gettingUsers ? (
                        this.renderLoadingImages()
                    ) : (
                        this.props.users.map((user, index) => 
                            <TouchableOpacity
                                key={user.id}
                                activeOpacity={0.8}
                                onPress={() => this.props.navigate('User', {user: user})}
                            >
                                <FastImage
                                    key={user.id}
                                    style={styles.imageContainer}
                                    source={{
                                        uri: user.avatar,
                                        priority: FastImage.priority.normal
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </TouchableOpacity>
                        )
                    )}
                </View>
            </View>
        );
    };
}

const mapStateToProps = (state) => {
    const {
        users,
        gettingUsers,
    } = state.users.latestUsers;
    return {
        users,
        gettingUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    const getLatestUsers = () => {
        dispatch(usersOperations.getLatestUsers());
    };
    return {
        getLatestUsers
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LatestUsers);

  