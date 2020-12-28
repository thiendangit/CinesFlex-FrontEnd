import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {Animated, StyleSheet, View} from "react-native";
import {formatDateToDDMM, handleImage, scale, verticalScale} from "@common";
import {tabItem} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import FastImage from "react-native-fast-image";
import {FilmProps} from "@features/unAuthentication/home/design";
import {URL_IMAGE} from "@networking";

interface ListFilmItemProps {
    item: FilmProps,
    index: string,
    onPressItem: (item: FilmProps, isComing: boolean | undefined) => void,
    translateX: any,
    isComing?: boolean
}

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const ListFilmHorizontal = ({item, index, onPressItem, translateX, isComing}: ListFilmItemProps) => {
    let indexNumber = parseInt(index);
    let style = [styles(indexNumber).buttonStyle];
    return (
        <Block style={styles().container}>
            <Block style={styles().buttonContainer}>
                <Button onPress={() => onPressItem(item, isComing)} activeOpacity={1} style={style}>
                    <AnimatedFastImage
                        style={{
                            height: deviceHeight / 1.8 - scale(20),
                            width: deviceWidth * 0.9 - scale(20),
                            borderRadius: scale(20),
                            transform: [{translateX}]
                        }}
                        resizeMode={'stretch'}
                        source={handleImage({uri: `${URL_IMAGE}${item?.detail?.images[0]?.url}` ?? ''})}
                    />
                </Button>
                <Block style={[styles().SubContainer, isComing ? {width: scale(70)} : null]}>
                    <Button style={styles().buttonSub}>
                        <Text style={styles().textRate}>
                            {isComing ? formatDateToDDMM(item?.date_begin) : item?.detail?.rating}
                        </Text>
                    </Button>
                </Block>
            </Block>
        </Block>
    )
};

const styles = (indexNumber?: number) => StyleSheet.create({
    container: {
        height: deviceHeight / 2,
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 5.84,

        elevation: 5,
    },
    buttonContainer: {
        height: deviceHeight / 1.8,
        width: deviceWidth * 0.9,
        borderRadius: scale(30),
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        overflow: 'hidden',
        height: deviceHeight / 1.8 - scale(20),
        width: deviceWidth * 0.9 - scale(20),
        borderRadius: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: scale(SpacingDefault.mediumPlush),
    },
    containerItemSole: {
        top: verticalScale(40),
    },
    imageContainer: {
        bottom: verticalScale(2),
        height: scale(28),
        width: scale(28),
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    textRate: {
        color: ColorsCustom.lightWhite,
        fontSize: FontSizeDefault.FONT_18,
        fontWeight: 'bold'
    },
    SubContainer: {
        position: 'absolute',
        height: scale(50),
        minWidth: scale(50),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(50 / 2),
        bottom: scale(-15),
        right: scale(25),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonSub: {
        height: scale(40),
        minWidth: scale(40),
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(40 / 2),
    }
});

export const _renderListFilmHorizontal = memo(ListFilmHorizontal, isEqual);

