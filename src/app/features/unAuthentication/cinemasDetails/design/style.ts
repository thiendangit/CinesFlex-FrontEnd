import {StyleSheet} from 'react-native';
import {AppTheme} from '@config/type';
import {deviceHeight, deviceWidth} from "@utils";
import {moderateScale, scale, verticalScale} from "@common";
import fonts from "react-native-paper/lib/typescript/src/styles/fonts";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    listContainer: {
        flex: 1,
    },
    text: {
        color: ColorsCustom.blue,
        fontWeight: 'bold',
        fontSize: FontSizeDefault.FONT_30,
        marginLeft: scale(20)
    },
    flatListContainer: {
        marginTop: verticalScale(60), alignSelf: 'center',
        paddingBottom: verticalScale(80)

    }
});
