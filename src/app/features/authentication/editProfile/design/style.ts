import {StyleSheet} from 'react-native';
import {scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import {FontSizeDefault} from "@theme/fontSize";
import {AppTheme} from "@config/type";

export const styles = (theme?: AppTheme) =>
    StyleSheet.create({
        text: {
            color: theme?.colors.text,
        },
        imageContainer: {
            height: deviceWidth / 2.5,
            alignItems: 'center',
            marginLeft: scale(5),
            marginTop: scale(20),
            justifyContent: 'center',
            alignSelf: 'center',
            width: deviceWidth / 2.5,
            borderRadius: deviceWidth / 2.5 / 2,
            backgroundColor: 'white',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //android
            elevation: 5,
        },
        signInLabel: {
            fontWeight: 'bold',
            fontSize: FontSizeDefault.FONT_25,
            marginLeft: scale(55),
            marginTop: scale(37)
        },
        footerView: {
            flexDirection: 'row',
            position: 'absolute',
            bottom: verticalScale(20),
            alignSelf: 'center',
            alignItems: 'center'
        },
        textGrey: {
            color: ColorsCustom.lightGrey,
            fontSize: FontSizeDefault.FONT_14
        },
        signUpButton: {
            right: scale(5),
            fontSize: FontSizeDefault.FONT_16
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
