import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {deviceHeight, deviceWidth} from "@utils";
import {moderateScale, scale, verticalScale} from "@common";
import fonts from "react-native-paper/lib/typescript/src/styles/fonts";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = StyleSheet.create({
    text: {
        color: ColorsCustom.grey,
        width : deviceWidth/1.3,
        textAlign : 'center'
    },
    container: {
        flex: 1,
        alignItems : 'center',
        backgroundColor : 'white'
    },
    imageContainer: {
        marginTop: moderateScale(105),
        width: scale(100),
        height: scale(100),
    },

    imageSupplier_Buyer: {
        width: scale(deviceWidth * 0.13),
        height: scale(deviceWidth * 0.13),
        // backgroundColor: 'red'
    },

    buttonContainer: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : deviceWidth * 0.8,
        marginTop : verticalScale(100)
    },
    buttonSupplier_Buyer : {
        backgroundColor : 'white',
        borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center',
        width : scale(deviceWidth * 0.3),
        height : scale(deviceWidth * 0.3),
        borderRadius : scale(deviceWidth * 0.3)/10
    },
    nameSupplierBuyer : {
        marginTop : moderateScale(40),
        fontSize : FontSizeDefault.FONT_22,
        fontWeight : 'bold'
    },
    buttonLogin: {
        backgroundColor: ColorsCustom.light_red,
        width: deviceWidth - scale(50),
        height: scale(48),
        position : 'absolute',
        bottom : verticalScale(40),
        alignSelf: 'center'
    },
    textButton: {
        color: ColorsCustom.lightWhite,
        fontSize: FontSizeDefault.FONT_16
    },
    code : {
        color: ColorsCustom.grey,
        width : deviceWidth/1.3,
        textAlign : 'center',
        fontSize: FontSizeDefault.FONT_18
    }
});
