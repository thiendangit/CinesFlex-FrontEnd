import {takeLatest,} from 'redux-saga/effects';
import {actionsLogin} from '../redux/reducer'
import * as Saga from './saga';

export function* LoginSaga() {
    yield takeLatest(actionsLogin.onLogin.type, Saga.onLogin);
    yield takeLatest(actionsLogin.sendEmailInfo.type, Saga.sendEmailInfo);
}

