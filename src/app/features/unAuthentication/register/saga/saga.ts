import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsRegister} from '../redux/reducer';
import {onCheckType} from '@common'
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";

export function* onRegister(action: Action) {
    if (actionsRegister.onRegister.match(action)) {
        const {body, onSucceeded, url} = action.payload;
        yield put(actionsLogin.onLoginStart());
        const response = yield ServiceSaga.Post(url, body);
        yield put(actionsLogin.onLoginEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
