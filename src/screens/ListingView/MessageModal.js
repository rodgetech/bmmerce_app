import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { Button, Icon, Input } from 'react-native-elements';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import { fonts, colors } from '../../styles';
import { moderateScale } from '../../utils/scaling';

const MessageModal = props => {
    return (
        <View>
            <Modal 
                isVisible={props.showMessageModal}
                style={styles.bottomModal}
                onBackButtonPress={props.hideMessageModal}
                onBackdropPress={props.hideMessageModal}
            >
                <View>
                    <View style={styles.modalContent}>
                        {props.listing.listedBy &&
                            <View style={{borderBottomWidth: 1, borderColor: '#f7f7f7'}}>
                                <Text style={{fontSize: moderateScale(17, 1.8), fontFamily: fonts.robotoCondensed, color: colors.dark, paddingBottom: 8}} numberOfLines={1}>
                                    Message {props.listing.listedBy.account.name}
                                </Text>
                            </View>
                        }
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <AutoGrowingTextInput
                                style={styles.textInput}
                                placeholder='Type your message...'
                                placeholderTextColor='#CCC'
                                maxHeight={200}
                                minHeight={35}
                                enableScrollToCaret
                                ref={(r) => { this._textInput = r; }}
                                value={props.message}
                                onChange={(event) => props.onMessageChange(event.nativeEvent.text)}
                            />
                            {props.message.length > 0 &&
                                <Icon
                                    name='md-send'
                                    type='ionicon'
                                    color={colors.green}
                                    containerStyle={{justifyContent:'center', backgroundColor: '#FFF'}}
                                    onPress={props.onSendMessage}
                                    size={28}
                                />
                            }
                        </View> 
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        flex: 1,
        justifyContent: 'center',
        margin: 0
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 2,
        paddingVertical: 25,
        marginHorizontal: 20,
        justifyContent: "center",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderBottomColor: colors.green,
        borderBottomWidth: 2

    },
    textInput: {
        paddingRight: 8,
        fontSize: moderateScale(16, 1.6),
        fontFamily: fonts.robotoCondensed,
        color: '#000',
        flex: 1,
        backgroundColor: "#FFF",
      },
});

export default MessageModal;