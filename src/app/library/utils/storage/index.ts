import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from "react-native";

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string) {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return typeof almostThere === 'string' ? JSON.parse(almostThere) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export async function  saveDataWithKey(key : string, data : any) {
  let type = typeof data;
  if (type == "number" || type == "boolean") {
    data = "" + data;
  }

  let string;
  if (typeof data == "object") {
    string = JSON.stringify(data);
  } else {
    string = data;
  }

  console.log('saveDataWithKey ' + string);
  await AsyncStorage.setItem(key, string);
}

export async function getDataWithKey(key : string) {
  let json = await AsyncStorage.getItem(key);
  let data;
  let errorParsing = false;
  if (await isValidString(json)) {
    try {
      if (json != null) {
        data = JSON.parse(json);
      }
      // console.log('getDataWithKey data' + JSON.stringify(data));
    } catch (ex) {
      errorParsing = true;
    }

  }
  if (errorParsing) {
    data = json;
  }

  // if (data != null && _class != null) {
  //     data = _class.instanceFromJSONObject(data, _class);
  // }
  return data;
}

export function isValidString(text: string|any) {
  if (isNull(text)) {
    return false;
  }
  if (typeof text != 'string') {
    return false;
  }
  if (text.toLowerCase() == "null") {
    return false;
  }
  return text.length != 0;
}

export const isNull = (object : any) => {
  return object == null || typeof object == undefined;
};

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}
