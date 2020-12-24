import React from "react";
import {images, ImageTypes} from '@assets/image'
import {styles} from './style'
import {Block, Button, Form, Img, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {StyleProp} from "react-native";
import {ColorsCustom} from "@theme/color";
import {NavigationService, navigationRef} from "@navigation/navigationService";
import {APP_SCREEN} from "@navigation/screenTypes";
import {Constants, dispatch, verticalScale} from "@common";
import {onSetAppProfile} from "@app_redux/reducer";
import {useSelector} from "react-redux";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

export const registerDoneScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();
    const userType = useSelector(
        (state: any) => state.app?.profile.user_type
    );
    let text = props.route.params?.text ?? '';

    const onPressButtonHome = () => {
        NavigationService.pop(2)
    };

    return (
        <Block style={styles.container}>
            <Img style={[styles.imageContainer]}
                 source={images.checkDone}
                 tintColor={userType === Constants.ROLE.SUPPLIER ? ColorsCustom.lime_green : ColorsCustom.light_red}
                 resizeMode={"contain"}/>
            <Text style={styles.nameSupplierBuyer}>
                {t('common:success')}
            </Text>
            <Text style={[styles.text, {marginTop: verticalScale(10)}]}>
                {t('common:congratulation')}!
            </Text>
            <Text style={[styles.text, {marginTop: verticalScale(5)}]}>
                {text}
            </Text>
            <Button
                onPress={onPressButtonHome}
                style={[styles.buttonLogin, {backgroundColor: userType === Constants.ROLE.SUPPLIER ? ColorsCustom.lime_green : ColorsCustom.light_red}]}>
                <Text style={styles.textButton}>
                    {t('common:Login')}
                </Text>
            </Button>
        </Block>
    )
};
