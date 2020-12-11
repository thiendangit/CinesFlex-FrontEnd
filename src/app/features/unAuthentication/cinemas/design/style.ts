import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {deviceHeight, deviceWidth} from "@utils";
import {moderateScale, scale, verticalScale} from "@common";
import fonts from "react-native-paper/lib/typescript/src/styles/fonts";
import {FontSizeDefault} from "@theme/fontSize";

export const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontWeight : 'bold',
        fontSize: FontSizeDefault.FONT_30,
        marginTop : verticalScale(30),
        marginLeft : scale(20)
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        marginTop: moderateScale(100),
        width: scale(deviceWidth * 0.7),
        height: scale(deviceHeight * 0.2),
    },

    imageSupplier_Buyer: {
        width: scale(deviceWidth * 0.13),
        height: scale(deviceWidth * 0.13),
        // backgroundColor: 'red'
    },

    buttonContainer: {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : deviceWidth,
        flex : 1,
        paddingHorizontal : scale(10),
        alignItems: 'center',
    },
    buttonSupplier_Buyer : {
        backgroundColor : 'white',
        borderWidth : 1,
        alignItems: 'center',
        justifyContent: 'center',
        width : scale(deviceWidth * 0.37),
        height : scale(deviceWidth * 0.37),
        borderRadius : scale(deviceWidth * 0.3)/10
    },
    nameSupplierBuyer : {
        marginTop : moderateScale(10),
        fontSize : FontSizeDefault.FONT_20,
        fontWeight: '600',
    }
});
