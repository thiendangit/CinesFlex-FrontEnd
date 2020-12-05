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
    name: SLICE_NAME.REGISTER,
    initialState: initialState,
    reducers: {
        reset: () => {
            return {...initialState}
        }
    }
});
const onRegister = createAction(Action.REGISTER, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));
const onGetCityDistrict = createAction(Action.GET_DISTRICT_CITY, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));
export const actionsRegister = {...loginSlice.actions, onRegister, onGetCityDistrict};
export const registerReducer = loginSlice.reducer;
