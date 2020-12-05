import {StyleSheet} from 'react-native';
import {scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {isIphoneX} from "@library/checkIphoneX/isIphoneX";
export const styles = (statusBarHeight?: number) => StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        top : statusBarHeight && statusBarHeight + scale(isIphoneX() ? 2 : 5) || 0,
        left: verticalScale(15),
    },
    icon: {
        height: scale(15),
        width: scale(15),
        tintColor: ColorsCustom.lightWhite
    }
});
