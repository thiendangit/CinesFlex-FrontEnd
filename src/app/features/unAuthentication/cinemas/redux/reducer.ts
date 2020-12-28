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

const getDataCinemas = createAction(Action.GET_DATA_CINEMAS_PAGE, (url: string, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        onSucceeded
    }
}));

const getListProducts = createAction(Action.GET_LIST_PRODUCTS, (url: string, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        onSucceeded
    }
}));

const getListCinemas = createAction(Action.GET_LIST_CINEMAS, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));

const getListShowTimeByCinemas = createAction(Action.GET_LIST_SHOWTIME_BY_CINEMAS, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));

const getListSeatByScreen = createAction(Action.GET_LIST_SEAT_BY_SCREEN, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));

const bookTicket = createAction(Action.BOOK_TICKET, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));

export const actionsCinemas = {
    ...homeSlice.actions,
    getDataCinemas,
    getListCinemas,
    getListShowTimeByCinemas,
    getListSeatByScreen,
    getListProducts,
    bookTicket
};
export const cinemasReducer = homeSlice.reducer;
