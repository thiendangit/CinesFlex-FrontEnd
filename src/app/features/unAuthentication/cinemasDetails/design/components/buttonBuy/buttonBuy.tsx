import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {ImageSourcePropType, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {enhance, formatMoney, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {images} from "@assets/image";
import {stylesView} from "@library/components/Button/Button.presets";

interface subTabItemProps {
    totalPrice?: number,
    text?: string,
    image?: ImageSourcePropType
    onPressBuy?: () => void,
    style?: StyleProp<ViewStyle>;
    disable?: boolean
}


export const ButtonBuy = ({
                              totalPrice, text,
                              image, onPressBuy,
                              style, disable
                          }: subTabItemProps) => {

    const buttonStyle = React.useMemo(
        () => enhance([styles.buttonStyleDefault, style]),
        [style],
    );

    const onPressBuyButton = () => {
        if (!totalPrice) {
            if (onPressBuy) {
                onPressBuy()
            }
        } else {
            if (totalPrice > 0) {
                if (onPressBuy) {
                    onPressBuy()
                }
            }
        }
    };

    return (
        <Button
            activeOpacity={1}
            onPress={!disable ? onPressBuyButton : () => {
            }}
            style={[buttonStyle, ((totalPrice != null) ? (totalPrice > 0) ? null : {backgroundColor: ColorsCustom.lightGrey} : disable ? {backgroundColor: ColorsCustom.lightGrey} : null)]}>
            <Img style={{
                marginHorizontal: scale(5),
                height: scale(20),
                width: scale(20),
            }}
                 tintColor={ColorsCustom.lightWhite}
                 source={handleImage(image)}/>
            <Text color={ColorsCustom.lightWhite} style={{
                fontSize: FontSizeDefault.FONT_22,
                marginLeft: scale(10)
            }}>
                {text} {totalPrice && formatMoney(totalPrice)}
            </Text>
        </Button>
    )
};

const styles = StyleSheet.create({
    buttonStyleDefault: {
        flexDirection: 'row',
        height: scale(deviceWidth / 6),
        minWidth: deviceWidth / 3,
        backgroundColor: ColorsCustom.blue,
        borderRadius: 0,
        borderTopLeftRadius: deviceWidth / 2 / 6
    }
});

export const _ButtonBuy = memo(ButtonBuy, isEqual);

