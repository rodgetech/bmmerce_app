import React from 'react';
import { 
  StyleSheet, 
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-elements';
import { colors, fonts } from '../../styles'
import {
  currentPosition,
  reverseGeocode
} from '../../utils/geocode';
import { moderateScale } from '../../utils/scaling';

export default class TryPosting extends React.Component {

  render() {
    return (
      <View style={{flex:1, backgroundColor: "#FFF", justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 20, justifyContent: 'center'}}>
          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(30, 1.7), color: '#7B8285', paddingBottom: 6}}>
            Welcome,
          </Text>
          <Text style={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(30, 1.7), color: colors.dark}}>
            See how easy it is to sell something nearby.
          </Text>
          <Button 
            icon={{name: 'md-camera', type: 'ionicon', color: "#FFF"}}
            title="Get Started"
            titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
            onPress={() => this.props.navigation.navigate('TryCamera')}
            buttonStyle={{marginTop: 40, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}} 
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  selectedImages: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#rgba(123, 130, 133, 0.5)'
  },
  selectedImage: {
    flex: 1.2,
    margin: 18,
    height: 62,
    backgroundColor: "#f7f7f7",
    borderRadius: 3,
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 2
  }
});
