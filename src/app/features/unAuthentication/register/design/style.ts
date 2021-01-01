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
        signInLabel: {
            fontWeight: 'bold',
            fontSize: FontSizeDefault.FONT_25,
            marginLeft: scale(55),
            // top: verticalScale(32)
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
        },
        imageContainer: {
            height: verticalScale(220),
            alignItems: 'center',
            // marginLeft: scale(5),
            // marginTop: scale(50),
            justifyContent: 'center',
            width: deviceWidth,
            // borderRadius: deviceWidth / 2.5 / 2,
            backgroundColor: 'white',
            alignSelf: 'center',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            //android
            elevation: 5,
        }
    });
