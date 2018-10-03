let backendHost;
const apiVersion = 'v1';

// if(__DEV__) {
//   backendHost = 'http://192.168.0.12:3000';
// } else {
//   backendHost = 'https://thumbfare-api.herokuapp.com';
// }

// backendHost = 'http://192.168.0.12:3000';

backendHost = 'http://178.128.79.228:8000';

export const API_ROOT = `${backendHost}/api/${apiVersion}`;