import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsHome} from '../redux/reducer';
import {onCheckType} from '@common'
import {onLoadApp, onLoadAppEnd} from '@app_redux/reducer'

export function* getDataHomePage(action: Action) {
    if (actionsHome.getDataHomePage.match(action)) {
        yield put(onLoadApp());
        const {onSucceeded, url} = action.payload;
        yield put(onLoadAppEnd());
        const response = yield ServiceSaga.Get(url);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* getListOrderProduct(action: Action) {
    if (actionsHome.getListOrderProduct.match(action)) {
        yield put(onLoadApp());
        const {onSucceeded, url} = action.payload;
        yield put(onLoadAppEnd());
        let body = {};
        const response = yield ServiceSaga.Post(url, body);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
