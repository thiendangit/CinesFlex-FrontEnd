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
            justifyContent: "space-between"
        },
        listContainer: {
            flex: 1,
            backgroundColor: 'white',
            // alignSelf: 'center',
            height: deviceHeight / 2 + scale(50 * 2),
        },
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        headerTitle: {
            width: deviceWidth / 1.95,
            fontSize: FontSizeDefault.FONT_22,
            fontWeight: "bold",
            color: ColorsCustom.blue,
            marginLeft: scale(10),
            marginTop: scale(10)
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
        buttonChangeLayout: {
            backgroundColor: ColorsCustom.lightGrey,
            position: 'absolute',
            right: scale(10),
            bottom: scale(10),
            height: scale(50),
            width: scale(50),
            borderRadius: scale(50 / 2)
        },
        imageChangeLayout: {
            height: 30,
            width: 30
        }
    });
