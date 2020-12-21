import {ToastState} from './type';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {SLICE_NAME} from '@config/type';

const initialToastState: ToastState = {
    msg: '',
    isToast: false
};

const toastSlice = createSlice({
    name: SLICE_NAME.TOAST, initialState: initialToastState, reducers: {
        //action
        addToast: (state, {payload}: PayloadAction<string>) => {
            state.msg = payload;
            state.isToast = true
        },
        removeToast: (state) => {
            state.msg = '';
            state.isToast = false
        },
    }
});

export const toastReducer = toastSlice.reducer;
export const {
    //actions export
    addToast,
    removeToast
} = toastSlice.actions;
