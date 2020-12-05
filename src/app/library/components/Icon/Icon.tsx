import * as React from 'react';
import {Image, ImageStyle, TouchableOpacity} from 'react-native';
import {IconProps} from './Icon.props';
import {icons} from '@assets/icon';
import {enhance} from '@common';
import equals from 'react-fast-compare';
import {HitSlopDefault} from "@theme/hitSlop";
const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

const IconComponent = (props: IconProps) => {
  const {style: styleOverride = {}, icon, containerStyle, onPress} = props;
  const style: ImageStyle = React.useMemo(
    () => enhance([ROOT, styleOverride]),
    [styleOverride],
  );



  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} hitSlop={HitSlopDefault.hitSlop_10}>
      <Image style={style} source={icons[icon ?? 'back']} />
    </TouchableOpacity>
  );
};
export const Icon = React.memo(IconComponent, equals);
