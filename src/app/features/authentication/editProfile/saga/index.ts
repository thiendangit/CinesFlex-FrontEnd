import {takeLatest,} from 'redux-saga/effects';
import {actionsEdit} from '../redux/reducer'
import * as Saga from './saga';

export function* EditSaga() {
    yield takeLatest(actionsEdit.onEdit.type, Saga.onEdit);
}
