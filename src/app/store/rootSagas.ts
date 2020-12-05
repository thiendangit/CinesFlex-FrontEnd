import {all} from 'redux-saga/effects';
import {appSaga} from '@store/app_saga';
import {LoginSaga} from '@features/unAuthentication/login/saga';
import {RegisterSaga} from "@features/unAuthentication/register/saga";

export const rootSaga = function* rootSaga() {
  yield all([appSaga(), LoginSaga(), RegisterSaga()]);
};
