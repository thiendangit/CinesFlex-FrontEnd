import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from "@utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    fullStretch: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: "rgba(0,0,0,0.2)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
    },
});

export default styles;
