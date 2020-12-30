import {ServiceSaga} from '@networking';
import {Action} from 'redux';
import {put, call} from 'redux-saga/effects';
import {actionsEdit} from '../redux/reducer';
import {onCheckType} from '@common'
import {onLoadApp, onLoadAppEnd} from '@app_redux/reducer'

export function* onEdit(action: Action) {
    if (actionsEdit.onEdit.match(action)) {
        const {body, onSucceeded, url} = action.payload;
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
