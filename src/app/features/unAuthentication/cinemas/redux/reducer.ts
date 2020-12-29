import * as Action from './actionType';
import {createAction, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';
import {FilmProps} from "@features/unAuthentication/home/design";

export interface HomeState {
    isHorizontal: boolean;
    favoriteList: FilmProps[]
}

const initialState: HomeState = {
    isHorizontal: false,
    favoriteList: []
};

const cinemasSlice = createSlice({
    name: SLICE_NAME.HOME,
    initialState: initialState,
    reducers: {
        onSetLayoutHorizontal: (state, {payload}: PayloadAction<any>) => {
            state.isHorizontal = payload
        },
        onAddFilmToFavoriteList: (state, {payload}: PayloadAction<FilmProps>) => {
            console.log({payload});
            let favoriteCopy = Object.assign([], state.favoriteList);
            console.log({favoriteCopy});
            if (favoriteCopy.length > 0) {
                favoriteCopy.map((item: FilmProps, index: number) => {
                    if (item.id === payload.id) {
                        alert('detele');
                       // favoriteCopy.splice()
                        return
                    }
                })

            } else {
                state.favoriteList.push(payload)
            }
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
    ...cinemasSlice.actions,
    getDataCinemas,
    getListCinemas,
    getListShowTimeByCinemas,
    getListSeatByScreen,
    getListProducts,
    bookTicket
};
export const cinemasReducer = cinemasSlice.reducer;
