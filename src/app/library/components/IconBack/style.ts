import {StyleSheet} from 'react-native';
import {scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {isIphoneX} from "@library/checkIphoneX/isIphoneX";

export const styles = (statusBarHeight?: number) => StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        top: statusBarHeight && statusBarHeight || scale(10),
        left: verticalScale(15),
        backgroundColor: ColorsCustom.product.ViewBorder,
        height: scale(25),
        width: scale(25),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(5)
    },
    icon: {
        width: scale(18),
        height: scale(18),
        tintColor: ColorsCustom.lightWhite
    }
});
