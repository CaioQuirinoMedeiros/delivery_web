export const TOKEN_KEY = '@delivery-Token';
export const USER_ID = '@delivery-ID';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getId = () => localStorage.getItem(USER_ID);
export const login = token => localStorage.setItem(TOKEN_KEY, token);

export const logout = () => localStorage.removeItem(TOKEN_KEY);
