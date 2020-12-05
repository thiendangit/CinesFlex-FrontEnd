import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './navigationService';
import {RootNavigation} from './RootNavigator';
import {useSelector, AppDispatch, dispatch} from '@common';
import {ProgressDialog} from '@components';
import {dialogHolder, hideLoading, showLoading} from '@utils';
import {onLoadApp, onLoadTheme} from '@store/app_redux/reducer';
import {AppMode} from '@library/components/AppMode/AppMode';
import {MyAppTheme} from '@theme';
import {ColorsCustom} from "@theme/color";
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";

export const AppContainer = () => {
    const {token, appMode, loading, showDialog, theme} = useSelector(x => x.app);
    useEffect(() => {
        dispatch(onLoadTheme());
        dispatch(actionsLogin.onLoginEnd());
    }, []);
    useEffect(() => {
        if (showDialog) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [showDialog]);
    return (
        <NavigationContainer ref={navigationRef} theme={MyAppTheme[theme]}>
            <>
                <>
                    <RootNavigation token={token} theme={MyAppTheme[theme] && ColorsCustom}/>
                    <ProgressDialog ref={dialogHolder}/>
                    {appMode !== 'prod' && <AppMode {...{appMode}} />}
                </>
                <AppDispatch/>
            </>
        </NavigationContainer>
    );
};
