import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsHome} from '../redux/reducer';
import {onCheckType} from '@common'

export function* getDataHomePage(action: Action) {
    if (actionsHome.getDataHomePage.match(action)) {
        const {onSucceeded, url} = action.payload;
        const response = yield ServiceSaga.Get(url);
        if (response) {
            if (onCheckType(onSucceeded, 'function')) {
                yield call(onSucceeded, response);
            }
        }
    }
}
