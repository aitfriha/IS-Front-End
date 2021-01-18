import { SIGN_IN, SIGN_OUT } from './constants';

export const signIn = (authBody) => ({
    type: SIGN_IN,
    authBody
});

export const signOut = (history) => ({
    type: SIGN_OUT,
    history
});
