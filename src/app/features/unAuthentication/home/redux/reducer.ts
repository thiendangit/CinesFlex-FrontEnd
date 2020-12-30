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

const getDataHomePage = createAction(Action.GET_DATA_HOMEPAGE, (url: string, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        onSucceeded
    }
}));

const getListOrderProduct = createAction(Action.GET_ORDER_LIST, (url: string, onSucceeded: (response: any) => void) => {
    return ({
        payload: {
            url,
            onSucceeded
        }
    });
});

export const actionsHome = {...homeSlice.actions, getDataHomePage, getListOrderProduct};
export const homeReducer = homeSlice.reducer;
