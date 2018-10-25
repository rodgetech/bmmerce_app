import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import Modal from "react-native-modal";
import { Button, Input, Icon } from 'react-native-elements';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';
import SearchAddress from './SearchAddress';

const PostModal = props => {
    return (
        <View>
            <Modal 
                isVisible={props.showModal}
                style={styles.bottomModal}
                swipeDirection='down'
                onBackButtonPress={props.hideModal}
                onBackdropPress={props.hideModal}
                onSwipe={props.hideModal}
            >
                <View style={styles.modalContent}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps='always'
                    >
                    <Input 
                        underlineColorAndroid='transparent'
                        placeholder="Title"
                        containerStyle={{marginBottom: 20, width: '100%'}}
                        inputStyle={{fontFamily: fonts.robotoCondensed, paddingHorizontal: 0, color: colors.dark, fontSize: moderateScale(18, 2.5), height: '100%', borderWidth: 0}}
                        inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                        onChangeText={(title) => props.handleInput('title', title)}
                        value={props.values.title}
                    />
                    <Input 
                        placeholder="Price"
                        underlineColorAndroid='transparent'
                        containerStyle={{marginBottom: 20, width: '100%'}}
                        inputStyle={{fontFamily: fonts.robotoCondensed, color: colors.dark, paddingHorizontal: 0, fontSize: moderateScale(18, 2.5), height: '100%'}}
                        inputContainerStyle={{borderColor: "#CCC", borderBottomWidth: 1}}
                        onChangeText={(price) => props.handleInput('price', price)}
                        value={props.values.price}
                        keyboardType="numeric"
                    /> 
                    <SearchAddress 
                        onPress = {(address, latitude, longitude) => 
                            props.handleSetAddress(address, latitude, longitude)
                        }
                    />
                    <Button 
                        title="Post & Continue"
                        titleStyle={{fontFamily: fonts.robotoCondensed, fontSize: moderateScale(18, 2.5), fontWeight: 'normal'}}
                        onPress={props.createListing}
                        buttonStyle={{marginTop: 16, backgroundColor: colors.green, paddingVertical: 4, elevation: 0}} 
                        disabled={props.values.images.length == 0 || !props.values.title || !props.values.price || !props.values.address}
                    />
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    modalContent: {
        backgroundColor: '#FFF',
        paddingHorizontal: 22,
        paddingVertical: 30,
        // justifyContent: "center",
        // alignItems: "center",
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
});

export default PostModal;