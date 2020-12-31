import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {images} from "@assets/image";
import {Constants} from "../constants";
import moment from "moment";

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

//return false if film is showed
export const handleCheckTimeWithCurrentTime = (date: string): boolean => {
    let beginningTime = moment(date, 'HH:mm a');
    let currentTime = moment()
        .utcOffset('+07:00')
        .format('HH:mm a');
    let endTime = moment(currentTime, 'HH:mm a');
    return beginningTime.isBefore(endTime)
};

export const formatDateToDDMM = (date: string) => {
    return moment(date).format('DD/MM')
};

export const formatDateToDDMMYYYY = (date: string) => {
    return moment(date).format('DD/MM/YYYY')
};

export const formatMinusToHours = (minus: number) => {
    let hours = Math.floor(minus / 60);
    let minutes = minus % 60;
    return hours + "h" + minutes + "m";
};
