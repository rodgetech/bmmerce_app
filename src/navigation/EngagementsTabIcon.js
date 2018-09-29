import React from "react";
import {
  Text,
} from "react-native";
import { connect } from "react-redux";
import engagementOperations from '../modules/engagements/operations';
import {colors, fonts} from '../styles';
import { moderateScale } from '../utils/scaling';

class EngagementsTabIcon extends React.Component {
    
    componentDidMount() {
        this.props.getUnreadCount();
    }

    render() {
        return (
            this.props.unreadCount > 0 ? 
                <Text 
                    style={{
                        color: '#FFF',
                        position:'absolute',
                        top:2,
                        right:-11,
                        margin: -1,
                        minWidth:15,
                        height:15,
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.altGreen, 
                        textAlign: "center",  
                        fontSize: moderateScale(9, 2.5),
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