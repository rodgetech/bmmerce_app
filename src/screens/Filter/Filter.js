import React from 'react';
import { 
  StyleSheet, 
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { colors, fonts } from '../../styles';
import { geocode } from '../../utils/geocode';
import ActivityLoader from '../../components/ActivityLoader';
import { moderateScale } from '../../utils/scaling';

export default class Filter extends React.Component {

    state = {
        loading: false
    }

    selectLocation = async (location) => {
        const { navigation } = this.props;
        const changeLocation = navigation.getParam('changeLocation', null);
        if (location === "Nationwide") {
            changeLocation(location);
        } else {
            this.setState({loading: true})
            const geocodeResults = await geocode(location);
            const bounds = geocodeResults.data.results[0].geometry.bounds;
            changeLocation(location, bounds);
        }
        this.setState({
            loading: false
        }, () => navigation.navigate('Home'));
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityLoader
                    loading={this.state.loading} />
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Nationwide")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Nationwide</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Cayo District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Cayo District</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Belize District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Belize District</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Stann Creek District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Stann Creek District</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Orange Walk District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Orange Walk District</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: colors.gray, alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Corozal District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Corozal District</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}
                    onPress={() => this.selectLocation("Toledo District")}
                >
                    <Text style={{color: colors.altDark, fontSize: moderateScale(16, 1.7), fontFamily: fonts.robotoCondensed}}>Toledo District</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFF",
  },
});
