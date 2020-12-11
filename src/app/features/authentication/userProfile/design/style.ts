import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {scale, verticalScale} from "@common";
import {SpacingDefault} from "@theme/spacing";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";

export const styles = (theme?: AppTheme) =>
    StyleSheet.create({
        listWrapStyle: {
            paddingHorizontal: scale(SpacingDefault.medium),
            paddingVertical: scale(10),
            justifyContent: "space-between",
        },
        listContainer: {
            flex: 1,
            alignSelf: 'center',
            width: deviceWidth
        },
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        headerTitle: {
            marginLeft: scale(15),
            marginTop: scale(10),
            height: verticalScale(26),
            fontSize: FontSizeDefault.FONT_22,
            fontWeight: 'bold',
            width: deviceWidth / 2,
            color: ColorsCustom.blue
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
        nameFilm: {
            fontSize: FontSizeDefault.FONT_21,
            width: deviceWidth / 1.2,
            color: ColorsCustom.blue,
            textAlign: 'center',
            fontWeight: 'bold'
        },
        sectionSelection: {
            color: ColorsCustom.lightGrey
        },
        chairContainer: {
            margin: scale(10),
            height: deviceWidth / 11,
            width: deviceWidth / 11,
            borderRadius: scale(10),
            alignItems: 'center',
            backgroundColor: ColorsCustom.product.ViewBorder,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        modalChooseItem: {
            height: deviceHeight / 1.3,
            backgroundColor: ColorsCustom.green,
            borderRadius: scale(30)
        }
    });
