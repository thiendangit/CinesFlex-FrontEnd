import {AppModeType, DEV_MODE_API, PROD_MODE_API, STAGING_MODE_API,} from '@networking';
import {AppState} from './type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';
import {ThemeType} from '@theme';
import {Constants} from "@common";

const initialAppState: AppState = {
    internetState: true,
    profile: {
        id: '',
        name: '',
        phone: '',
        email: '',
        email_verified_at: '',
        type: 1,
        status: 1,
        created_at: '',
        updated_at: ''
    },
    token: null,
    /**
     * default true to load app
     */
    loading: false,
    showDialog: false,
    theme: 'default',
    appMode: 'dev',
    appUrl: DEV_MODE_API,
    appTab: {
        mainTabs: [
            {
                name: "",
                url: "",
                icon: ""
            }
        ],
        subTabs: [
            {
                name: "",
                url: "",
                icon: ""
            },
        ]
    }
};
const appModeToURL = (mode: AppModeType): string => {
    switch (mode) {
        case 'dev':
            return DEV_MODE_API;
        case 'prod':
            return PROD_MODE_API;
        case 'staging':
            return STAGING_MODE_API;
        default:
            return DEV_MODE_API;
    }
};

const appSlice = createSlice({
    name: SLICE_NAME.APP, initialState: initialAppState, reducers: {
        onSetInternet: (state, {payload}: PayloadAction<boolean>) => {
            state.internetState = payload
        },
        onSetToken: (state, {payload}: PayloadAction<string>) => {
            state.token = payload
        },
        onSetAppProfile: (state, {payload}: PayloadAction<any>) => {
            state.profile = payload
        },
        onSetAppTheme: (state, {payload}: PayloadAction<ThemeType>) => {
            state.theme = payload
        },
        onLoadApp: (state) => {
            state.loading = true
        },
        onLoadAppEnd: (state) => {
            state.loading = false
        },
        onStartProcess: (state) => {
            state.showDialog = true;
        },
        onEndProcess: (state) => {
            state.showDialog = false;
        },
        onSetAppMode: (state, {payload}: PayloadAction<AppModeType>) => {
            state.appUrl = appModeToURL(payload);
            state.appMode = payload;
        },
        onLogout: (state) => {
            state.token = null;
            state.profile = {...initialAppState.profile};
            state.appTab = initialAppState.appTab
        },
        onSetAppTab: (state, {payload}: PayloadAction<any>) => {
            state.appTab = payload
        },
        onLoadTheme: (state) => {
        },
    }
});

export const appReducer = appSlice.reducer;
export const {
    onLogout,
    onStartProcess, onEndProcess,
    onLoadApp, onLoadAppEnd,
    onSetAppMode, onSetAppProfile,
    onSetAppTheme, onSetInternet,
    onSetToken, onSetAppTab,
    onLoadTheme
} = appSlice.actions;
