import {
    connect
} from 'react-redux';
import AccountListings from './AccountListings';
import {
    listingsOperations
} from '../../modules/listings';

const mapStateToProps = (state) => {
    const {
        gettingUserListings,
        userListings
    } = state.listings.user;
    return {
        gettingUserListings,
        userListings
    };
};

const mapDispatchToProps = (dispatch) => {
    const getUserListings = () => {
        dispatch(listingsOperations.getUserListings());
    };
    return {
        getUserListings
    };
};

const AccountListingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountListings);

export default AccountListingsContainer;