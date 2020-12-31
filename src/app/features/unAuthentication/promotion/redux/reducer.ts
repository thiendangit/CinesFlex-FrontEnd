import * as Action from './actionType';
import {createAction, createSlice} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';

export interface HomeState {
    isHorizontal: boolean;
}

const initialState: HomeState = {
    isHorizontal: false,
};

const promotionSlice = createSlice({
    name: SLICE_NAME.PROMOTION,
    initialState: initialState,
    reducers: {}
});

const getListPromotion = createAction(Action.GET_LIST_PROMOTION, (url: string, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        onSucceeded
    }
}));

export const actionsPromotion = {...promotionSlice.actions, getListPromotion};
export const promotionReducer = promotionSlice.reducer;
