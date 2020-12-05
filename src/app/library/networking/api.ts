export const DEV_MODE_API = 'http://127.0.0.1:8000';
export const PROD_MODE_API = 'http://192.168.0.118/oda/public/';
export const STAGING_MODE_API = 'https://oda.vn/';
export const APP_MODE_URL = {
    dev: DEV_MODE_API,
    prod: PROD_MODE_API,
    staging: STAGING_MODE_API,
};
export type AppModeType = keyof typeof APP_MODE_URL;

const API_VERSION = '/api/v2';

export const ApiConstants = {
    LOGIN: `${API_VERSION}/login`,
    BUYER: '/buyer',
    SUPPLIER: '/supplier',
    PUSH_DEVICE_ID: `${API_VERSION}/devices/add`,
    CLEAR_DEVICE_ID: `${API_VERSION}/devices/clear-push`,
    GET_MENU_BAR : `/api/get-menu-bar`,
    REGISTER : `${API_VERSION}/register`,
    GET_DISTRICT_CITY : `${API_VERSION}/get-districts`,
};


export const RedirectConstants = {
    LOGIN_SUPPLIER: `/supplier/login`,
    LOGIN_BUYER: `/buyer/login`,
};
