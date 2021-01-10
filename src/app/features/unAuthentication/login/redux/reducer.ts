import * as Action from './actionType';
import {createAction, createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';

export interface LoginState {
    loading: boolean;
    count: number;
}

const initialState: LoginState = {
    loading: false,
    count: 0
};

const loginSlice = createSlice({
    name: SLICE_NAME.LOGIN,
    initialState: initialState,
    reducers: {
        reset: () => {
            return {...initialState}
        },
        onLoginStart: (state) => {
            state.loading = true
        },
        onLoginEnd: (state) => {
            state.loading = false
        },
    }
});
const onLogin = createAction(Action.LOGIN, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));
const onAfterLogin = createAction(Action.AFTER_LOGIN, (url: string, params: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        params,
        onSucceeded
    }
}));
const sendEmailInfo = createAction(Action.SEND_MAIL_INFO, (url: string, params: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        params,
        onSucceeded
    }
}));
export const actionsLogin = {...loginSlice.actions, onLogin, onAfterLogin,sendEmailInfo};
export const loginReducer = loginSlice.reducer;
