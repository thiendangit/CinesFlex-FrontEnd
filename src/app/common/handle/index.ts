import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {images} from "@assets/image";
import {Constants} from "../constants";

export const EventEmitter = DeviceEventEmitter;

export const enhance = (arrStyle: Array<any>) => {
    return StyleSheet.flatten(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
    return Object.keys(T).includes(key);
};

export const toast = (msg: string, duration = 4000) =>
    EventEmitter.emit(Constants.EmitCode.Toast, msg, duration);

export const handleImage = (source: any) => {
    if (source?.uri) {
        return source
    } else if (source) {
        return source
    } else return images['default']
};
