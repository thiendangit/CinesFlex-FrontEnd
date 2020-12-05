import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {moderateScale, scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = (theme?: AppTheme) =>
    StyleSheet.create({
        text: {
            color: theme?.colors.text,
        },
        imageContainer: {
            width: deviceWidth,
            height: verticalScale(220),
        },
        signInLabel: {
            fontWeight: 'bold',
            fontSize: FontSizeDefault.FONT_25,
            marginLeft: scale(35),
            bottom: verticalScale(25)
        },
        footerView: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: verticalScale(20),
            alignSelf: 'center',
            alignItems : 'center'
        },
        textGrey : {
            color: ColorsCustom.lightGrey,
            fontSize : FontSizeDefault.FONT_14
        },
        signUpButton: {
            right : scale(5),
            fontSize : FontSizeDefault.FONT_16
        },
        iconContainer: {
            position: 'absolute',
            left: verticalScale(15),
        },
        icon: {
            height: scale(15),
            width: scale(15),
            tintColor: ColorsCustom.lightWhite
        }
    });
