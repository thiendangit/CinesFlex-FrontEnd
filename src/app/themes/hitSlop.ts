import {HitSlop} from '@config/type';
import {moderateScale} from "@common";
export const HitSlopDefault: HitSlop = {
    hitSlop_5 : {top: moderateScale(5), bottom: moderateScale(5), left: moderateScale(5), right: moderateScale(5)},
    hitSlop_10 : {top: moderateScale(10), bottom: moderateScale(10), left: moderateScale(10), right: moderateScale(10)},
    hitSlop_15 : {top: moderateScale(10), bottom: moderateScale(10), left: moderateScale(10), right: moderateScale(10)},
    hitSlop_20 : {top: moderateScale(10), bottom: moderateScale(10), left: moderateScale(10), right: moderateScale(10)},
};
