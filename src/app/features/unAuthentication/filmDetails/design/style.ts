import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {scale, verticalScale} from "@common";
import {SpacingDefault} from "@theme/spacing";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";

export const styles = (theme?: AppTheme) =>
    StyleSheet.create({
        listWrapStyle: {
            paddingHorizontal: scale(SpacingDefault.medium),
            paddingVertical: scale(10),
            justifyContent: "space-between"
        },
        listContainer: {
            flex: 1,
            backgroundColor: 'white',
            alignSelf: 'center',
            width: deviceWidth
        },
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        headerTitle: {
            fontSize: FontSizeDefault.FONT_22,
            fontWeight: "500",
            color: ColorsCustom.lightWhite
        },
        header: {
            justifyContent: 'center'
        },
        textLogout: {
            marginLeft: verticalScale(5),
            fontWeight: '600',
            fontSize: FontSizeDefault.FONT_16
        },
        buttonLogout: {
            alignSelf: 'center',
            width: deviceWidth - scale(40),
            marginHorizontal: scale(10),
            backgroundColor: 'white',
            flexDirection: 'row',
            paddingVertical: scale(SpacingDefault.medium),
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        imageContainer: {
            bottom: verticalScale(2),
            height: scale(28),
            width: scale(28),
        },
        leftBarContainer: {
            top: scale(66),
            position: 'absolute',
            backgroundColor: ColorsCustom.lime_green,
            height: scale(22),
            width: scale(68),
            borderRadius: scale(22 / 2),
        },
        leftBarButtonContainer: {
            marginTop: scale(60),
            transform: ([{rotate: '90deg'}]),
            width: scale(70),
        },
        leftBarTitle: {
            fontSize: FontSizeDefault.FONT_14,
            fontWeight: '600',
        },
        heartIconStyle: {
            position: 'absolute',
            bottom: scale(20),
            right: scale(30),
            height: scale(30),
            width: scale(30)
        },
        rateStyle: {
            position: 'absolute',
            top: scale(30),
            right: scale(30),
            color: ColorsCustom.lightWhite,
            fontSize: FontSizeDefault.FONT_24,
            fontWeight: 'bold'
        },
        typeFilm: {
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: scale(25),
            marginLeft: scale(10),
            minWidth: scale(60),
            borderRadius: scale(25 / 2),
            borderColor: ColorsCustom.grey
        },
        ageLimited: {
            color: ColorsCustom.light_red,
            textAlign: 'center',
        }
    });
