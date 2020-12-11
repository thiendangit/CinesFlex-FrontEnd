import {StyleSheet} from 'react-native';
import {FontSizeDefault} from '@theme/fontSize';
import {FontDefault} from '@theme/typography';
import {scale} from "@common";
import {ColorsCustom} from "@theme/color";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    wrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backDrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 998,
    },
    wrapOption: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    option: {
        backgroundColor: 'transparent',
        // marginVertical: 5,
    },
    wrapCancel: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    buttonCancel: {
        backgroundColor: 'transparent',
        paddingVertical: 15,
    },
    textCancel: {
        color: 'rgba(255,0,0,0.8)',
    },
    wrapTitle: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
    },
    title: {
        fontSize: FontSizeDefault.FONT_13,
        fontWeight: '700',
        alignSelf: 'center',
        fontFamily: FontDefault.primary,
        color: '#333333',
    },
    iconBackContainer: {
        right: scale(7),
        top: scale(5),
        position: 'absolute',
        backgroundColor: ColorsCustom.blackTextPrimary,
        borderRadius: scale(10)
    },
    iconBack: {
        height: scale(20),
        width: scale(20),
        tintColor: ColorsCustom.lightWhite
    }
});
