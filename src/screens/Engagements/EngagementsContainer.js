import {
    connect
} from 'react-redux';
import Engagements from './Engagements';
import {
    engagementsOperations
} from '../../modules/engagements';

const mapStateToProps = (state) => {
    const {
        engagements,
        gettingEngagements,
        empty
    } = state.engagements.engagements;
    return {
        engagements,
        gettingEngagements,
        empty
    };
};

const mapDispatchToProps = (dispatch) => {
    const getEngagements = () => {
        dispatch(engagementsOperations.getEngagements());
    };
    return {
        getEngagements
    };
};

const EngagementsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Engagements);

export default EngagementsContainer;