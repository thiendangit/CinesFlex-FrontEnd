import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsRegister} from '../redux/reducer';
import {onCheckType} from '@common'

export function* onRegister(action: Action) {
    if (actionsRegister.onRegister.match(action)) {
        const {body, onSucceeded, url} = action.payload;
        // yield put(actions.onLoginStart());
        console.log({body,url});
        const response = yield ServiceSaga.Post(url, body);
        console.log('data',response);
        // yield put(actions.onLoginEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}

export function* onGetCityDistrict(action: Action) {
    if (actionsRegister.onGetCityDistrict.match(action)) {
        const {body, onSucceeded, url} = action.payload;
        // yield put(actions.onLoginStart());
        const response = yield ServiceSaga.Post(url, body);
        // yield put(actions.onLoginEnd());
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
