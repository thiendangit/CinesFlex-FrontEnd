import React, {useEffect, memo, useRef, useState, RefAttributes, ForwardedRef} from 'react';
import Splash from 'react-native-splash-screen';
import {Text, Block, IconBack, ModalAppMode, Img, ModalAppModeRef, Screen} from '@components';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import isEqual from 'react-fast-compare';
import {NavigationService} from "@navigation/navigationService";
import {styles} from "@features/unAuthentication/register/design/style";
import {ColorsCustom} from "@theme/color";
import {images} from "@assets/image";
import {useTranslation} from "react-i18next";
import {Constants, dispatch, scale, toast, verticalScale} from "@common";
import {useSelector} from "react-redux";
import {FormRegister, FormValueLoginPage} from "@features/unAuthentication/register/components";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {deviceHeight, deviceWidth} from "@utils";
import {actionsLogin} from "@features/unAuthentication/login/redux/reducer";
import {AppState} from "@app_redux/type";
import {ApiConstants} from "@networking";
import {actionsRegister} from "@features/unAuthentication/register/redux/reducer";
import {FormEdit, FormValueEditPage} from "@features/authentication/editProfile/components";
import {Avatar} from "react-native-paper";
import {actionsEdit} from "@features/authentication/editProfile/redux/reducer";
import {onSetAppProfile} from "@app_redux/reducer";

type EditProps = StackScreenProps<RootStackParamList, APP_SCREEN.REGISTER>;

export const EditProfileScreen = ({}: EditProps) => {
    useEffect(() => {
        Splash.hide();
    }, []);
    const URL_DOMAIN = useSelector(
        (state: { app: AppState }) => state?.app?.appUrl
    );
    const _modalMode = useRef<ModalAppModeRef>();
    const _onGoBack = () => {
        NavigationService.goBack()
    };
    const [t] = useTranslation();

    function editApi(data: FormValueEditPage) {
        console.log({data});
        // dispatch(actionsLogin.onLoginStart());
        let body = JSON.stringify({
            email: data.email.toLowerCase(),
            phone: data.phone,
            name: data.name.toLowerCase(),
        });
        dispatch(actionsEdit.onEdit(`${URL_DOMAIN}users/update-profile`, body, (result) => {
            dispatch(actionsLogin.onLoginEnd());
            if (result?.data && result?.data?.success) {
                toast('Edit profile success');
                dispatch(onSetAppProfile({...result.data?.data}));
                setTimeout(() => {
                    NavigationService.goBack();
                }, 1000)
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
        editApi(data)
    };

    const _onForgotPassword = () => {

    };

    return (
        <Block block style={{backgroundColor: ColorsCustom.lightWhite}}>
            <Screen>
                <KeyboardAwareScrollView bounces={false}>
                    <ModalAppMode ref={_modalMode}/>
                    <Text style={styles().signInLabel}>
                        {t('common:editProfile')}
                    </Text>
                    <Block style={styles().imageContainer}>
                        <Avatar.Image style={{}} size={(deviceWidth / 2.5 - scale(10))}
                                      source={{
                                          uri: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-9/108200276_2405548933075795_7974088370686247055_n.jpg?_nc_cat=106&' +
                                              'ccb=2&_nc_sid=09cbfe&_nc_ohc=KGBn4x0m754AX-TyvZ7&_nc_ht=scontent.fsgn5-6' +
                                              '.fna&oh=66be5a0af52fbcfac2f8a820cc499881&oe=600E6167'
                                      }}>
                        </Avatar.Image>
                    </Block>
                    <FormEdit onSubmit={_onSubmit}
                              onForgotPassword={_onForgotPassword}
                              activeTintBorderColor={ColorsCustom.lime_green}/>
                    <Block style={{height: verticalScale(30)}}/>
                    <IconBack onPress={_onGoBack}/>
                </KeyboardAwareScrollView>
            </Screen>
        </Block>
    );
};
export default memo(EditProfileScreen, isEqual);
