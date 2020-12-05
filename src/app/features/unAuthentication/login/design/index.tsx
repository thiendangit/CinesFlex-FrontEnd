import React, {memo, useRef} from 'react';
import isEqual from 'react-fast-compare';
import {Block, Button, IconBack, Img, ModalAppMode, ModalAppModeRef, Screen, Text} from '@components';
import {onSetAppProfile, onSetAppTab, onSetToken} from '@store/app_redux/reducer';
import {FormLogin, FormValueLogin} from './components';
import {Constants, dispatch} from '@common';
import {APP_SCREEN, RootStackParamList} from '@navigation/screenTypes';
import {useTranslation} from "react-i18next";
import {ColorsCustom} from "@theme/color";
import {images} from "@assets/image";
import {styles} from "@features/unAuthentication/login/design/style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {getUrlByTypeUser} from "@library/utils/getURLByTypeUser/getURLByTypeUser";
import {ApiConstants, DEV_MODE_API} from "@networking";
import {AppTab} from "@config/type";
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";
import {NavigationService} from "@navigation/navigationService";
import {useSelector} from "react-redux";
import {AppState} from "@app_redux/type";

export interface Props {
    route: {
        params: {
            role: any
        }
    },
}

export const LoginScreen: React.FC<Props> = (props): React.ReactElement => {
    const _modalMode = useRef<ModalAppModeRef>();
    const [t] = useTranslation();
    let roleParam = useSelector(
        (state: any) => state.app?.profile.user_type
    );
    const URL_DOMAIN = useSelector(
        (state: { app: AppState }) => state?.app?.appUrl
    );

    const _onSubmit = async (data: FormValueLogin) => {
        // dispatch(actions.onLoginStart());
        let email = data.email.toLowerCase();
        let password = data.password.toLowerCase();
        let body = JSON.stringify({
            email,
            password,
            type: roleParam === Constants.ROLE.SUPPLIER && Constants.ROLE.SUPPLIER || Constants.ROLE.BUYER
        });
        dispatch(actionsLogin.onLoginStart());
        dispatch(actionsLogin.onLogin(`${URL_DOMAIN}${ApiConstants.LOGIN}`, body, async (result) => {
            if (result.data.success) {
                dispatch(onSetToken('s'));
                dispatch(onSetAppProfile(result.data?.auth));
                const userType = result.data.auth.user_type;
                let typeURL = getUrlByTypeUser(userType);
                await fetch(`${URL_DOMAIN}/after-login?email=${email}&password=${password}&type=
                            ${userType === Constants.ROLE.SUPPLIER ? userType : Constants.ROLE.BUYER}`, {
                    method: 'GET',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                }).then(async r => {
                    let _;
                    dispatch(actionsLogin.onAfterLogin(`${URL_DOMAIN}/${typeURL}${ApiConstants.GET_MENU_BAR}`, _, (result) => {
                        dispatch(actionsLogin.onLoginEnd());
                        if (result.data.success) {
                            let tab: AppTab = result.data.data;
                            dispatch(onSetAppTab(tab))
                        }
                    }));
                });
            } else {
                alert(result.data.message)
            }
        }));
    };

    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const _onForgotPassword = () => {
        alert('go to forgot screen !!!')
    };


    const onPressSignUp = () => {
        NavigationService.navigate(APP_SCREEN.REGISTER);
    };

    return (
        <Block block>
            <ModalAppMode ref={_modalMode}/>
            <Img style={styles().imageContainer}
                 source={images.bg_header}
                 resizeMode={"stretch"}/>
            <Text style={styles().signInLabel}>
                {t('common:signIn')}
            </Text>
            <KeyboardAwareScrollView bounces={false} style={{flex: 1}}>
                <Screen backgroundColor={'transparent'} style={{flex: 1, justifyContent: 'flex-start'}} draw={true}>
                    <FormLogin onSubmit={_onSubmit}
                               onForgotPassword={_onForgotPassword}
                               activeTintBorderColor={roleParam === Constants.ROLE.SUPPLIER ? ColorsCustom.lime_green : ColorsCustom.light_red}/>
                </Screen>
            </KeyboardAwareScrollView>
            <Block style={styles().footerView}>
                <Text style={styles().textGrey}>
                    {t('user:dont_have_an_account')}
                </Text>
                <Button onPress={onPressSignUp}>
                    <Text style={styles().signUpButton}>
                        {t('common:signUp')}
                    </Text>
                </Button>
            </Block>
        </Block>
    );
};
export default memo(LoginScreen, isEqual);
