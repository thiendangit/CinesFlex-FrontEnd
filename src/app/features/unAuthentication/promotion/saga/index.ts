import {takeLatest,} from 'redux-saga/effects';
import {actionsPromotion} from '../redux/reducer'
import * as Saga from './saga';

export function* PromotionSaga() {
    yield takeLatest(actionsPromotion.getListPromotion.type, Saga.getListPromotion);
}

