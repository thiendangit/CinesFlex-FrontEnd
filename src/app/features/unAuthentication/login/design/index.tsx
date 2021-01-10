import React, {memo, useEffect, useRef, useState} from 'react';
import isEqual from 'react-fast-compare';
import {Block, Button, Img, ModalAppMode, ModalAppModeRef, Screen, Text} from '@components';
import {onSetAppProfile, onSetAppTab, onSetToken} from '@store/app_redux/reducer';
import {FormLogin, FormValueLogin} from './components';
import {dispatch, scale, toast} from '@common';
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
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import {deviceWidth} from "@utils";

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
    const [isSignInInProgress, setIsSignInProgress] = useState(false);
    let roleParam = useSelector(
        (state: any) => state.app?.profile.user_type
    );

    useEffect(() => {
        GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
            webClientId: '536170052681-ha7rdksk5bhvhhgoc49mdiokprmab2ac.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            // hostedDomain: '', // specifies a hosted domain restriction
            // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            // forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            // accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '536170052681-195r97v5df5iivcdves27m667ml10oi5.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
    }, []);

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

    const _onForgotPassword = async () => {
        alert('forgot password')
    };

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //call api
            let body = JSON.stringify({
                email: "",
                password: ""
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
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
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
                    <GoogleSigninButton
                        style={{width: deviceWidth / 2, height: scale(40), marginTop: scale(10), alignSelf: 'center'}}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={signInWithGoogle}
                        disabled={isSignInInProgress}/>
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
