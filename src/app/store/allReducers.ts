import {appReducer} from '@app_redux/reducer';
import {loginReducer} from '@features/unAuthentication/login/redux/reducer';
import {combineReducers} from '@reduxjs/toolkit';
import {registerReducer} from "@features/unAuthentication/register/redux/reducer";
import {homeReducer} from "@features/unAuthentication/home/redux/reducer";
import {toastReducer} from "@store/toast_redux/reducer";
import {cinemasReducer} from "@features/unAuthentication/cinemas/redux/reducer";
import {promotionReducer} from "@features/unAuthentication/promotion/redux/reducer";

export const allReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    home: homeReducer,
    toast: toastReducer,
    cinemas: cinemasReducer,
    promotion: promotionReducer,
});
export type RootState = ReturnType<typeof allReducer>;
