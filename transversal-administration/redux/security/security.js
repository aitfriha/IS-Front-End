import axios from 'axios';
import decode from 'jwt-decode';

const TOKEN_PREFIX = 'Bearer ';
const TOKEN_KEY = 'token';

const getTokenFromLocalStorage = () => TOKEN_PREFIX + localStorage.getItem(TOKEN_KEY);

const setJWTInAxiosHeaderAndLocalStorage = token => {
    if (token) {
        // store the token in the localStorage
        localStorage.setItem(TOKEN_KEY, token);
        // put the token in axios authorization header
        axios.defaults.headers.common.Authorization = TOKEN_PREFIX + token;
    } else {
        // remove the token from localSorage
        localStorage.removeItem(TOKEN_KEY);
        // remove the token from axios authorization header
        delete axios.defaults.headers.common.Authorization;
    }
};

const isTokenValid = () => {
    const token = getTokenFromLocalStorage();
    try {
        // put the token in axios authorization header to resolve problem when refresh the page
        axios.defaults.headers.common.Authorization = TOKEN_PREFIX + token;

        // decode the token to get the exp date
        const decoded = decode(token);
        return decoded.exp > Date.now() / 1000;
    } catch (err) {
        return 'not_found';
    }
};

export { isTokenValid, setJWTInAxiosHeaderAndLocalStorage };
