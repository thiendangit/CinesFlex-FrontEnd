import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {deviceHeight, deviceWidth} from "@utils";
import {moderateScale, scale, verticalScale} from "@common";
import fonts from "react-native-paper/lib/typescript/src/styles/fonts";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = StyleSheet.create({
    text: {
        color: ColorsCustom.lime_green,
        fontWeight: 'bold',
        fontSize: FontSizeDefault.FONT_30,
        textAlign: 'center'
    },
    textReward: {
        color: ColorsCustom.darkOrange,
        fontWeight: 'bold',
        marginTop: scale(15),
        fontSize: FontSizeDefault.FONT_20,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 1
    },
    coinPurseContainer: {
        backgroundColor: ColorsCustom.lightWhite,
        borderRadius: scale(5),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonMyGift: {
        position: 'absolute',
        height: scale(40),
        right: scale(5),
        top: 5,
        width: scale(40)
    }
});
