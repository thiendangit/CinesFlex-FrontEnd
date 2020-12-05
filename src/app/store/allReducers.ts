import { appReducer } from '@app_redux/reducer';
import { loginReducer } from '@features/unAuthentication/login/redux/reducer';
import { combineReducers } from '@reduxjs/toolkit';
import {registerReducer} from "@features/unAuthentication/register/redux/reducer";

export const allReducer = combineReducers({ app: appReducer, login: loginReducer , register : registerReducer});
export type RootState = ReturnType<typeof allReducer>;
