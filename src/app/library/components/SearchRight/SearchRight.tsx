import React, {memo} from 'react';
import {
    Image,
    ImageStyle, TouchableOpacity,
} from 'react-native';
import {SearchRightProps} from './SearchRight.props';
import equals from 'react-fast-compare';
import {Block} from "@library/components";
import {enhance, scale} from "@common";
import {HitSlopDefault} from "@theme/hitSlop";
import {icons} from "@assets/icon";
import {ColorsCustom} from "@theme/color";


const ROOT: ImageStyle = {
    resizeMode: 'contain',
};

const SearchRightComponent = ( props: SearchRightProps) => {
    const {style: styleOverride = {}, icon, containerStyle, onPress} = props;
    const style: ImageStyle = React.useMemo(
        () => enhance([ROOT, styleOverride]),
        [styleOverride],
    );

    return(
        <TouchableOpacity style={[{
            height : scale(40),
            width : scale(50),
            borderBottomLeftRadius : scale(50),
            borderTopLeftRadius : scale(50),
            backgroundColor : ColorsCustom.blue,
            alignItems : 'center',
            justifyContent : 'center'
        },containerStyle]} onPress={onPress} hitSlop={HitSlopDefault.hitSlop_10}>
            <Image style={style} source={icons[icon ?? 'search']} />
        </TouchableOpacity>
    )
};
export const SearchRight = memo(SearchRightComponent, equals);
