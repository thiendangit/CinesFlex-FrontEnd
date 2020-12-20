export const DEV_MODE_API = '';
export const PROD_MODE_API = 'https://cine-flex.herokuapp.com/api/';
export const STAGING_MODE_API = '';
export const APP_MODE_URL = {
    dev: DEV_MODE_API,
    prod: PROD_MODE_API,
    staging: STAGING_MODE_API,
};
export type AppModeType = keyof typeof APP_MODE_URL;

const API_VERSION = '';

export const ApiConstants = {
    LOGIN: `login`,
    REGISTER : `register`,
};
