import {StyleSheet} from 'react-native';
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";
import {scale} from "@common";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    login: {
        padding: 8,
    },
    forgot: {
        // marginTop,
    },
    labelStyle: {
        fontSize: 12,
    },
    logoStyle: {
        height: deviceHeight / 3,
        width: deviceWidth,
        alignSelf: 'center',
        marginBottom: scale(10),
        marginTop: scale(30)
    },
    buttonLogout: {
        top: scale(10),
        justifyContent: 'center',
        position: 'absolute',
        right: scale(10),
    },
    password: {
        marginTop: scale(10),
        marginHorizontal: scale(20)
    },
    AvatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    IconLogout: {
        height: scale(30),
        width: scale(30),
    },
    IconMail: {
        marginRight: scale(5),
        height: scale(15),
        width: scale(15),
    },
    IconEditContainer: {
        height: scale(40),
        width: scale(40),
        position: 'absolute',
        bottom: scale(20),
        right: scale(20),
    },
    IconEdit: {
        height: scale(30), width: scale(30),
        tintColor: ColorsCustom.lightGrey
    },
    imageContainer: {
        height: deviceWidth / 2.5,
        alignItems: 'center',
        marginLeft: scale(5),
        marginTop: scale(20),
        justifyContent: 'center',
        width: deviceWidth / 2.5,
        borderRadius: deviceWidth / 2.5 / 2,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        //android
        elevation: 5,
    }
});

export default styles;
