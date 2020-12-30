import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {moderateScale, scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = (theme?: AppTheme) =>
    StyleSheet.create({
        textInputContainer: {
            width: deviceWidth - scale(50),
            height: verticalScale(50),
            alignSelf: 'center'
        },
        textError: {
            marginTop : scale(5),
            marginLeft: scale(25),
            color : ColorsCustom.light_red
        },
        imageContainer: {
            width: scale(20),
            height: scale(20),
        },
        textForgotPassword: {
            color: ColorsCustom.lightGrey
        },
        buttonForgotPassword: {
            marginTop: verticalScale(10),
            marginRight: scale(25),
            alignSelf: 'flex-end'
        },
        buttonLogin: {
            backgroundColor: ColorsCustom.light_red,
            width: deviceWidth - scale(50),
            height: scale(48),
            marginTop: verticalScale(27),
            alignSelf: 'center'
        },
        buttonSignUp: {
            backgroundColor: ColorsCustom.light_red,
            width: deviceWidth - scale(50),
            height: scale(48),
            marginTop: verticalScale(27),
            alignSelf: 'center'
        },
        textButton: {
            color: ColorsCustom.lightWhite,
            fontSize: FontSizeDefault.FONT_16
        }
    });
