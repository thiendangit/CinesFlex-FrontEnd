import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {ButtonProps, ImageSourcePropType, StyleSheet, TouchableOpacity} from "react-native";
import {enhance, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {images} from "@assets/image";
import {stylesView} from "@library/components/Button/Button.presets";

interface subTabItemProps {
    text: string,
    image: ImageSourcePropType
    onPressBuy: (item: any) => void,
    style : ButtonProps
}


export const ButtonBuy = ({text, image, onPressBuy, style}: subTabItemProps) => {

    const buttonStyle = React.useMemo(
        () => enhance([styles.buttonStyleDefault, style]),
        [style],
    );

    return (
        <Button
            onPress={onPressBuy}
            style={buttonStyle}>
            <Img style={{
                height: scale(20),
                width: scale(20),
            }}
                 tintColor={ColorsCustom.lightWhite}
                 source={handleImage(image)}/>
            <Text color={ColorsCustom.lightWhite} style={{
                fontSize: FontSizeDefault.FONT_24,
                marginLeft: scale(10)
            }}>
                {text}
            </Text>
        </Button>
    )
};

const styles = StyleSheet.create({
    buttonStyleDefault: {
        flexDirection: 'row',
        height: scale(deviceWidth / 6),
        width: deviceWidth / 3,
        backgroundColor: ColorsCustom.blue,
        borderRadius: 0,
        borderTopLeftRadius: deviceWidth / 2 / 6
    }
});

export const _ButtonBuy = memo(ButtonBuy, isEqual);

