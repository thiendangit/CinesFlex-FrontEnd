import {takeLatest,} from 'redux-saga/effects';
import {actionsCinemas} from '../redux/reducer'
import * as Saga from './saga';

export function* CinemasSaga() {
    yield takeLatest(actionsCinemas.getDataCinemas.type, Saga.getDataCinemas);
    yield takeLatest(actionsCinemas.getListCinemas.type, Saga.getListCinemas);
    yield takeLatest(actionsCinemas.getListShowTimeByCinemas.type, Saga.getListShowTimeByCinemas);
    yield takeLatest(actionsCinemas.getListSeatByScreen.type, Saga.getListSeatByScreen);
    yield takeLatest(actionsCinemas.getListProducts.type, Saga.getListProducts);
    yield takeLatest(actionsCinemas.bookTicket.type, Saga.bookTicket);
    yield takeLatest(actionsCinemas.applyPromotionCode.type, Saga.applyPromotionCode);
}

