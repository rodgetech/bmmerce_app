import {
    connect
} from 'react-redux';
import Listings from './Listings';
import {
    usersOperations
} from '../../modules/users';


const mapStateToProps = (state, ownState) => {
    const {
        listings,
        gettingListings,
        totalPages,
        empty
    } = state.users.user;
    return {
        listings,
        gettingListings,
        totalPages,
        empty,
        userId: ownState.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    const getUserListings = (id, page) => {
        dispatch(usersOperations.getUserListings(id, page));
    };
    return {
        getUserListings
    };
};

const ListingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Listings);

export default ListingsContainer;