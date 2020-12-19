import * as Action from './actionType';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';

export interface HomeState {
    isHorizontal: boolean;
}

const initialState: HomeState = {
    isHorizontal: false,
};

const homeSlice = createSlice({
    name: SLICE_NAME.HOME,
    initialState: initialState,
    reducers: {
        onSetLayoutHorizontal: (state, {payload}: PayloadAction<any>) => {
            state.isHorizontal = payload
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

export const actionsHome = {...homeSlice.actions, onLogin};
export const homeReducer = homeSlice.reducer;
