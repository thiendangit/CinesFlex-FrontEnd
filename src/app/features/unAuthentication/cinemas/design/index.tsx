import React from "react";
import {images, ImageTypes} from '@assets/image'
import {styles} from './style'
import {Block, Button, IconBack, Img, Screen, Text, Wallpaper} from "@components";
import {useTranslation} from 'react-i18next';
import {StyleProp} from "react-native";
import {ColorsCustom} from "@theme/color";
import {NavigationService, navigationRef} from "@navigation/navigationService";
import {APP_SCREEN} from "@navigation/screenTypes";
import {Constants, dispatch, verticalScale} from "@common";
import {onSetAppProfile} from "@app_redux/reducer";

export const CinemasScreen = () => {
    const [t] = useTranslation();

    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const buttonSupplierBuyer = (text: string, source: ImageTypes, borderColor: StyleProp<any>, onPress: (text: string) => void) => {
        return (
            <Button style={[styles.buttonSupplier_Buyer, {borderColor}]} onPress={() => onPress(text)}>
                <Img style={styles.imageSupplier_Buyer}
                     source={source}
                     resizeMode={"contain"}/>
                <Text style={[styles.nameSupplierBuyer, {color: borderColor}]}>
                    {text && t(`user:${text}`) || ''}
                </Text>
            </Button>
        )
    };

    const onPressButtonSupplierBuyer = (text: string) => {
        // dispatch(onSetAppProfile({user_type: Constants.ROLE.BUYER}));
        NavigationService.navigate(APP_SCREEN.CINEMAS_DETAILS, {cinemas_id: ''})
    };

    return (
        <Block style={styles.container}>
            <Wallpaper backgroundImage={images.bg_cinemas}/>
            <Screen style={{}}>
                <Text style={styles.text}>
                    REGION LIST
                </Text>
                <Block style={styles.buttonContainer}>
                    {buttonSupplierBuyer("HÀ NỘI", images.temple, ColorsCustom.lime_green, onPressButtonSupplierBuyer)}
                    {buttonSupplierBuyer("TPHCM", images.building, ColorsCustom.light_red, onPressButtonSupplierBuyer)}
                </Block>
            </Screen>
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
