import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {deviceHeight, deviceWidth} from "@utils";
import {moderateScale, scale, verticalScale} from "@common";
import fonts from "react-native-paper/lib/typescript/src/styles/fonts";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = StyleSheet.create({
    text: {
        color: ColorsCustom.blackTextPrimary,
        fontWeight: 'bold',
        fontSize: FontSizeDefault.FONT_30,
        marginTop: verticalScale(30),
        marginLeft: scale(20)
    },
    container: {
        flex: 1,
        backgroundColor: ColorsCustom.lightWhite
    },
    imageContainer: {
        marginTop: moderateScale(100),
        width: scale(deviceWidth * 0.7),
        height: scale(deviceHeight * 0.2),
    },

    imageSupplier_Buyer: {
        width: scale(35),
        height: scale(35),
        marginRight: scale(10)
        // backgroundColor: 'red'
    },

    buttonContainer: {
        width: deviceWidth,
        flex: 1,
        paddingHorizontal: scale(10),
        marginTop: scale(30),
        alignItems: 'center',
    },
    buttonSupplier_Buyer: {
        backgroundColor: 'white',
        // marginTop: scale(30),
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        width: scale(deviceWidth / 1.5),
        height: scale(50),
        borderRadius: scale(deviceWidth * 0.3) / 10
    },
    nameSupplierBuyer: {
        // marginTop: moderateScale(10),
        fontSize: FontSizeDefault.FONT_20,
        fontWeight: '600',
    }
});
