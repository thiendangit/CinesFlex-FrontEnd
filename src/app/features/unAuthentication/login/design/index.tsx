import React, {memo, useRef} from 'react';
import isEqual from 'react-fast-compare';
import {Block, Button, IconBack, Img, ModalAppMode, ModalAppModeRef, Screen, Text} from '@components';
import {onSetAppProfile, onSetAppTab, onSetToken} from '@store/app_redux/reducer';
import {FormLogin, FormValueLogin} from './components';
import {dispatch, toast} from '@common';
import {APP_SCREEN, RootStackParamList} from '@navigation/screenTypes';
import {useTranslation} from "react-i18next";
import {ColorsCustom} from "@theme/color";
import {images} from "@assets/image";
import {styles} from "@features/unAuthentication/login/design/style";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
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
            password
        });
        dispatch(actionsLogin.onLoginStart());
        dispatch(actionsLogin.onLogin(`${URL_DOMAIN}${ApiConstants.LOGIN}`, body, async (result) => {
            console.log({result});
            if (result?.data?.success) {
                toast('Login Success');
                dispatch(onSetToken(result?.data?.data?.token));
                dispatch(onSetAppProfile({...result.data?.data?.user}));
                NavigationService.reset(APP_SCREEN.USER_PROFILE)
            } else {
                dispatch(actionsLogin.onLoginEnd());
                if (result?.data) {
                    toast(`${result?.data?.message}`, 2000);
                } else {
                    toast(`${result?.msg}`, 2000);
                }
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
                               activeTintBorderColor={ColorsCustom.lime_green}/>
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
