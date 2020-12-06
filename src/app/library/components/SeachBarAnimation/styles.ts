import {StyleSheet} from 'react-native';
import {scale} from "@common";
import {deviceWidth} from "@utils";

const styles = StyleSheet.create({
    container: {
        // flex : 1,
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    container_Search: {
        // flex : 1,
        height: scale(50),
        position : 'absolute',
        width : deviceWidth,
        right : 0,
        // paddingHorizontal: 16
    },
    clear_icon_box: {
        width: 15,
        height: 15,
        borderRadius: 7,
        marginLeft: scale(20)
    },

    search_box: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(40),
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_box: {
        height: scale(40),
        backgroundColor : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: deviceWidth
    },
    input: {
        width: deviceWidth - scale(67),
        height: scale(40),
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
});

export default styles;
