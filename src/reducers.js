import {
    combineReducers
} from 'redux';

import listingssReducer from './modules/listings/reducers';
import authsReducer from './modules/auth/reducers';
import messagesReducer from './modules/messages/reducers';
import engagementsReducer from './modules/engagements/reducers';
import imagesReducer from './modules/images/reducers';
import usersReducer from './modules/users/reducers';

const appReducer = combineReducers({
    listings: listingssReducer,
    auth: authsReducer,
    messages: messagesReducer,
    engagements: engagementsReducer,
    images: imagesReducer,
    users: usersReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;