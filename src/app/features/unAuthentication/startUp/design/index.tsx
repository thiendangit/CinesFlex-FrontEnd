import React, {memo, useEffect} from "react";
import {StyleSheet} from "react-native";
import {deviceHeight, deviceWidth} from "@library/utils";
import {images} from '@assets/image'
import {NavigationService} from "@navigation/navigationService";
import {APP_SCREEN} from "@navigation/screenTypes";
import isEqual from "react-fast-compare";
import {verticalScale} from "@common";
import {Block, Img} from "@components";

export const StartUpScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            // return NavigationService.replace(APP_SCREEN.CHOOSE_USER);
        }, 3000)
    });
    return (
        <Block style={[styles.container]}>
            <Img style={styles.imageContainer}
                 source={images.AppIcon}
                 containerStyle={styles.container}
                 resizeMode={"contain"}/>
        </Block>
    )
};

export default memo(StartUpScreen, isEqual);


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        height: deviceHeight,
        width: deviceWidth,
        top: 0, left: 0
    },
    imageContainer: {
        height: verticalScale(304),
        width: '80%'
    }
});


