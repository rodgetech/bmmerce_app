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
        this.props.getUsers(1, 4);
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
                            Latest users
                        </Text>
                    </View>
                    <TouchableOpacity style={{justifyContent: 'flex-end'}}>
                        <Text style={{fontFamily: fonts.robotoCondensed, color: colors.green, fontSize: moderateScale(17, 1.5)}}>
                            See all
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    {this.props.gettingUsers ? (
                        this.renderLoadingImages()
                    ) : (
                        this.props.users.map((user, index) => 
                            <FastImage
                                key={index}
                                style={styles.imageContainer}
                                source={{
                                    uri: user.avatar,
                                    priority: FastImage.priority.normal
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
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
    } = state.users;
    return {
        users,
        gettingUsers,
    };
};

const mapDispatchToProps = (dispatch) => {
    const getUsers = (page, per) => {
        dispatch(usersOperations.getUsers(page, per));
    };
    return {
        getUsers
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LatestUsers);

  