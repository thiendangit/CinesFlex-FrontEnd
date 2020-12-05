import {StyleSheet} from 'react-native';
import {images} from "@assets/image";
export const enhance = (arrStyle: Array<any>) => {
  return StyleSheet.flatten(arrStyle);
};

export const checkKeyInObject = (T: any, key: string) => {
  return Object.keys(T).includes(key);
};

export const handleImage = (source : any) => {
  if(source?.uri){
    return source
  }else if(source){
    return source
  }else return images['default']
};
