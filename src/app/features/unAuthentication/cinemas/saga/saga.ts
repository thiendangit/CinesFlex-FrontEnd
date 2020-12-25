import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsCinemas} from '../redux/reducer';
import {onCheckType} from '@common'

export function* getDataCinemas(action: Action) {
    if (actionsCinemas.getDataCinemas.match(action)) {
        const {onSucceeded, url} = action.payload;
        const response = yield ServiceSaga.Get(url);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* getListCinemas(action: Action) {
    if (actionsCinemas.getListCinemas.match(action)) {
        const {onSucceeded, url, body} = action.payload;
        const response = yield ServiceSaga.Post(url, body);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* getListShowTimeByCinemas(action: Action) {
    if (actionsCinemas.getListShowTimeByCinemas.match(action)) {
        const {onSucceeded, url, body} = action.payload;
        const response = yield ServiceSaga.Post(url, body);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* getListSeatByScreen(action: Action) {
    if (actionsCinemas.getListSeatByScreen.match(action)) {
        const {onSucceeded, url, body} = action.payload;
        const response = yield ServiceSaga.Post(url, body);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* getListProducts(action: Action) {
    if (actionsCinemas.getListProducts.match(action)) {
        const {onSucceeded, url} = action.payload;
        const response = yield ServiceSaga.Get(url);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
