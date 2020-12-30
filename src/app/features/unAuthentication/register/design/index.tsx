import React, {useEffect, memo, useRef, useState, RefAttributes, ForwardedRef} from 'react';
import Splash from 'react-native-splash-screen';
import {Text, Block, IconBack, ModalAppMode, Img, ModalAppModeRef} from '@components';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import isEqual from 'react-fast-compare';
import {NavigationService} from "@navigation/navigationService";
import {styles} from "@features/unAuthentication/register/design/style";
import {ColorsCustom} from "@theme/color";
import {images} from "@assets/image";
import {useTranslation} from "react-i18next";
import {Constants, dispatch, toast, verticalScale} from "@common";
import {useSelector} from "react-redux";
import {FormRegister, FormValueLoginPage} from "@features/unAuthentication/register/components";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {deviceHeight} from "@utils";
import {Alert} from "react-native";
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";
import {AppState} from "@app_redux/type";
import {ApiConstants} from "@networking";
import {actionsRegister} from "@features/unAuthentication/register/redux/reducer";

type RegisterProps = StackScreenProps<RootStackParamList, APP_SCREEN.REGISTER>;

export const RegisterScreen = ({}: RegisterProps) => {
    useEffect(() => {
        Splash.hide();
    }, []);

    const userType = useSelector(
        (state: any) => state.app?.profile.user_type
    );
    const URL_DOMAIN = useSelector(
        (state: { app: AppState }) => state?.app?.appUrl
    );
    const _modalMode = useRef<ModalAppModeRef>();
    const _onGoBack = () => {
        NavigationService.goBack()
    };
    const [t] = useTranslation();

    function registerApi(data: FormValueLoginPage) {
        dispatch(actionsLogin.onLoginStart());
        let body = JSON.stringify({
            email: data.email.toLowerCase(),
            password: data.password.toLowerCase(),
            password_confirmation: data.confirmPassword.toLowerCase(),
            phone: data.phone,
            name: data.name,
        });
        console.log({body});
        dispatch(actionsRegister.onRegister(`${URL_DOMAIN}${ApiConstants.REGISTER}`, body, (result) => {
            dispatch(actionsLogin.onLoginEnd());
            if (result?.data && result?.data?.success) {
                NavigationService.navigate(APP_SCREEN.REGISTER_DONE, {text: result?.data.message});
            } else {
                if (result?.data) {
                    toast(`${result?.data?.errors[0]}`, 2000);
                } else {
                    toast(`${result?.msg}`, 2000);
                }
            }
        }));
    }

    const _onSubmit = (data: FormValueLoginPage) => {
        registerApi(data)
    };

    const _onForgotPassword = () => {

    };

    return (
        <Block block style={{backgroundColor: ColorsCustom.lightWhite, height: deviceHeight}}>
            <KeyboardAwareScrollView bounces={false}>
                <ModalAppMode ref={_modalMode}/>
                <Img style={styles().imageContainer}
                     source={images.bg_header}
                     resizeMode={"stretch"}/>
                <Text style={styles().signInLabel}>
                    {t('common:signUp')}
                </Text>
                <FormRegister onSubmit={_onSubmit}
                              onForgotPassword={_onForgotPassword}
                              activeTintBorderColor={ColorsCustom.lime_green}/>
                <Block style={{height: verticalScale(30)}}/>
                <IconBack onPress={_onGoBack}/>
            </KeyboardAwareScrollView>
        </Block>
    );
};
export default memo(RegisterScreen, isEqual);
