import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsCinemas} from '../redux/reducer';
import {onCheckType} from '@common'
import {onLoadApp, onLoadAppEnd} from '@app_redux/reducer'

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
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, body);
        yield put(onLoadAppEnd());
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
        yield put(onLoadApp());
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
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, body);
        yield put(onLoadAppEnd());
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

export function* bookTicket(action: Action) {
    if (actionsCinemas.bookTicket.match(action)) {
        const {onSucceeded, url, body} = action.payload;
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, body);
        console.log({response});
        yield put(onLoadAppEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* applyPromotionCode(action: Action) {
    if (actionsCinemas.applyPromotionCode.match(action)) {
        const {onSucceeded, url, body} = action.payload;
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, body);
        yield put(onLoadAppEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* fetchMyCoin(action: Action) {
    if (actionsCinemas.fetchMyCoin.match(action)) {
        const {onSucceeded, url} = action.payload;
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, {});
        yield put(onLoadAppEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* fetchGift(action: Action) {
    if (actionsCinemas.fetchGift.match(action)) {
        const {onSucceeded, url} = action.payload;
        yield put(onLoadApp());
        const response = yield ServiceSaga.Get(url);
        yield put(onLoadAppEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* createReferenceGift(action: Action) {
    if (actionsCinemas.createReferenceGift.match(action)) {
        const {onSucceeded, body, url} = action.payload;
        yield put(onLoadApp());
        const response = yield ServiceSaga.Post(url, body);
        yield put(onLoadAppEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
