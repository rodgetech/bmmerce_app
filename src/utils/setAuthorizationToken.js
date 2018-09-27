import axios from 'axios';
import {
    AsyncStorage
} from 'react-native';

export default async function setAuthorizationToken(key) {
    const token = await AsyncStorage.getItem(key);
    if (token) {
        axios.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}