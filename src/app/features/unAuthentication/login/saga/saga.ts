import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsLogin} from '../redux/reducer';
import {onCheckType} from '@common'

export function* onLogin(action: Action) {
    if (actionsLogin.onLogin.match(action)) {
        const {body, onSucceeded, url} = action.payload;
        yield put(actionsLogin.onLoginStart());
        const response = yield  ServiceSaga.Post(url, body);
        yield put(actionsLogin.onLoginEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
