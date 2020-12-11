import * as React from 'react';
import {Image, ImageStyle, TouchableOpacity, NativeModules, Platform} from 'react-native';
import {IconProps} from './Icon.props';
import {icons} from '@assets/icon';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {HitSlopDefault} from "@theme/hitSlop";
import {styles} from "@library/components/IconBack/style";
import {useEffect} from "react";
import {useState} from "react";
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const IconComponent = (props: IconProps) => {

  const [statusBarHeight , setStatusBarHeight] = useState<number>(20);
  const {StatusBarManager} = NativeModules;
  const {style: styleOverride = {}, icon, containerStyle, onPress} = props;
  const style: ImageStyle = React.useMemo(
    () => enhance([ROOT, styleOverride]),
    [styleOverride],
  );

  useEffect(() => {
    if(Platform.OS === 'ios'){
      StatusBarManager.getHeight((response: { height: any }) => setStatusBarHeight(response.height));
    }
  }, []);

  return (
    <TouchableOpacity
        style={[styles(statusBarHeight).iconContainer,(containerStyle && containerStyle)]}
        onPress={onPress}
        hitSlop={HitSlopDefault.hitSlop_10}>
      <Image style={style && style || styles().icon} source={icons[icon ?? 'back']} />
    </TouchableOpacity>
  );
};
export const  IconBack = React.memo(IconComponent, equals);
