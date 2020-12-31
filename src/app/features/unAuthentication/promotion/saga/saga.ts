import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsPromotion} from '../redux/reducer';
import {onCheckType} from '@common'
import {onLoadApp, onLoadAppEnd} from '@app_redux/reducer'

export function* getListPromotion(action: Action) {
    if (actionsPromotion.getListPromotion.match(action)) {
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
