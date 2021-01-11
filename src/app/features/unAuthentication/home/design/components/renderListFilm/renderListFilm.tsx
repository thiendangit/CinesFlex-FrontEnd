import React, {memo} from "react";
import {Button, Img, Text} from "@components";
import {StyleSheet, View} from "react-native";
import {formatDateToDDMM, handleImage, scale, verticalScale} from "@common";
import {images} from "@assets/image";
import {AppTab, tabItem} from "@config/type";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {SvgUri} from "react-native-svg";
import {FontSizeDefault} from "@theme/fontSize";
import {FilmProps} from "@features/unAuthentication/home/design";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {URL_IMAGE} from "@networking";

interface subTabItemProps {
    item: FilmProps,
    index: string,
    onPressItem: (item: FilmProps, isComing: boolean | undefined) => void,
    isComing: boolean
}

export const renderListFilm = ({item, index, onPressItem, isComing}: subTabItemProps) => {
    let indexNumber = parseInt(index);
    let style = [styles(indexNumber).container];

    return (
        <Button onPress={() => onPressItem(item, isComing)} activeOpacity={1} style={style}>
            <Img style={{
                height: deviceHeight / 1.6,
                width: deviceWidth / 2.2,
                borderRadius: scale(20),
            }}
                 containerStyle={{
                     height: deviceHeight / 1.6,
                     width: deviceWidth / 2.2
                 }}
                 resizeMode={'cover'}
                 source={handleImage({uri: `${URL_IMAGE}${item?.detail?.images[0]?.url}` ?? ''})}
            />
            <Text style={styles().textRate}>
                {isComing ? formatDateToDDMM(item?.detail.date_begin) : item?.detail?.rating}
            </Text>
        </Button>
    )
};

const styles = (indexNumber?: number) => StyleSheet.create({
    container: {
        height: deviceHeight / 1.6,
        width: deviceWidth / 2.2,
        borderRadius: scale(20),
        marginHorizontal: deviceWidth * 0.023,
        marginTop: indexNumber! > 1 ? deviceWidth * 0.03 : 0,
        top: (indexNumber! % 2 !== 0) ? verticalScale(40) : 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: scale(SpacingDefault.mediumPlush),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
        position: 'absolute',
        top: scale(10),
        right: scale(10),
        fontWeight: 'bold'
    }
});

export const _renderListFilm = memo(renderListFilm, isEqual);

