import { takeLatest, } from 'redux-saga/effects';
import { actionsRegister } from '../redux/reducer'
import * as Saga from './saga';
export function* RegisterSaga() {
  yield takeLatest(actionsRegister.onRegister.type, Saga.onRegister);
  yield takeLatest(actionsRegister.onGetCityDistrict.type, Saga.onGetCityDistrict);
}
