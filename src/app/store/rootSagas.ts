import {all} from 'redux-saga/effects';
import {appSaga} from '@store/app_saga';
import {LoginSaga} from '@features/unAuthentication/login/saga';
import {RegisterSaga} from "@features/unAuthentication/register/saga";
import {HomeSaga} from "@features/unAuthentication/home/saga";
import {CinemasSaga} from "@features/unAuthentication/cinemas/saga";
import {EditSaga} from "@features/authentication/editProfile/saga";

export const rootSaga = function* rootSaga() {
    yield all([appSaga(), LoginSaga(), RegisterSaga(), HomeSaga(), CinemasSaga(), EditSaga()]);
};
