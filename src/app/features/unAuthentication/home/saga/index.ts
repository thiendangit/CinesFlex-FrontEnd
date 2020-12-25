import {takeLatest,} from 'redux-saga/effects';
import {actionsHome} from '../redux/reducer'
import * as Saga from './saga';

export function* HomeSaga() {
    yield takeLatest(actionsHome.getDataHomePage.type, Saga.getDataHomePage);
}

