import {
    combineReducers
} from 'redux';

import listingssReducer from './modules/listings/reducers';
import authsReducer from './modules/auth/reducers';
import messagesReducer from './modules/messages/reducers';
import engagementsReducer from './modules/engagements/reducers';
import imagesReducer from './modules/images/reducers';

const rootReducer = combineReducers({
    listings: listingssReducer,
    auth: authsReducer,
    messages: messagesReducer,
    engagements: engagementsReducer,
    images: imagesReducer
});

export default rootReducer;