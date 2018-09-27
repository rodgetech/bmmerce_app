import React from "react";
import {
  Text,
} from "react-native";
import { connect } from "react-redux";
import engagementOperations from '../modules/engagements/operations';
import {colors, fonts} from '../styles';

class EngagementsTabIcon extends React.Component {
    
    componentDidMount() {
        this.props.getUnreadCount();
    }

    render() {
        return (
            this.props.unreadCount > 0 ? 
                <Text 
                    allowFontScaling={false}
                    style={{
                        color: '#FFF',
                        position:'absolute',
                        top:1,
                        right:-12,
                        margin: -1,
                        minWidth:16,
                        height:16,
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.altGreen, 
                        textAlign: "center",  
                        fontSize: 12,
                        fontFamily: fonts.robotoCondensed
                    }}
                >
                    {this.props.unreadCount}
                </Text>
            : null
        )
    }
}

const mapStateToProps = (state) => {
    const { unreadCount } = state.engagements.messages;
    return { unreadCount };
};

const mapDispatchToProps = (dispatch) => {
    const getUnreadCount = () => {
        dispatch(engagementOperations.getUnreadCount());
    };
    return { getUnreadCount };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EngagementsTabIcon);