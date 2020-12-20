import { takeLatest } from 'redux-saga/effects';
import * as Saga from './saga';
import { onLoadTheme , onLoadApp} from '@app_redux/reducer';
export function* appSaga() {
  yield takeLatest(onLoadTheme.type, Saga.onLoadAppModeAndTheme);
}

