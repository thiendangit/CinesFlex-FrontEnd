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
const onEdit = createAction(Action.EDIT, (url: string, body: any, onSucceeded: (response: any) => void) => ({
    payload: {
        url,
        body,
        onSucceeded
    }
}));

export const actionsEdit = {...loginSlice.actions, onEdit};
export const editReducer = loginSlice.reducer;
