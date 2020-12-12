import * as React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Block, Button, Img, Text, TextField} from '@components';
import {stylesView, stylesText} from './ButtonPlusMinus.presets';
import {ButtonPlusMinusProps} from './ButtonPlusMinus.props';
import {enhance, scale, verticalScale} from '@common';
import equals from 'react-fast-compare';
import {Input} from "@features/unAuthentication/login/design/components/Input";
import {deviceWidth} from "@utils";
import {ColorsCustom} from "@theme/color";
import {icons} from "@assets/icon";
import {FontSizeDefault} from "@theme/fontSize";


const BUTTON_HEIGHT = scale(30);
const BUTTON_WIDTH = scale(30);

const ButtonPlusMinusComponent = (props: ButtonPlusMinusProps) => {
    const {
        preset = 'primary',
        tx,
        text,
        style: styleOverride = {},
        textStyle: textStyleOverride = {},
        children,
        onPressMinus,
        onPressPlus,
        quality,
        ...rest
    } = props;

    const viewStyle = React.useMemo(
        () => enhance([stylesView[preset], styleOverride]),
        [styleOverride],
    );
    const textStyle = React.useMemo(
        () => enhance([stylesText[preset], textStyleOverride]),
        [styleOverride],
    );

    return (
        <Block style={viewStyle} {...rest}>
            <Block block direction={'row'}>
                <Button style={[styles.button, styles.minusButton]} onPress={onPressMinus}>
                    <Img source={icons.minus} tintColor={ColorsCustom.lightWhite} style={styles.icon}/>
                </Button>
                <Block paddingHorizontal={scale(20)}
                       width={BUTTON_WIDTH * 2}
                       height={BUTTON_WIDTH}
                       alignItems={'center'}
                       justifyContent={'center'}>
                    <Text style={styles.number}>
                        {quality}
                    </Text>
                </Block>
                <Button style={[styles.button, styles.plusButton]} onPress = {onPressPlus}>
                    <Img source={icons.plus} style={styles.icon}/>
                </Button>
            </Block>
        </Block>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        flex: 1,
        alignSelf: 'center',
    },
    button: {
        height: BUTTON_HEIGHT,
        width: BUTTON_WIDTH,
        backgroundColor: 'red',
        borderRadius: scale(BUTTON_HEIGHT / 2),
    },
    minusButton: {
        backgroundColor: ColorsCustom.product.ViewBorder,
    },
    plusButton: {
        backgroundColor: ColorsCustom.green,
    },
    icon: {
        height: scale(15),
        width: scale(15)
    },
    number: {
        fontSize: FontSizeDefault.FONT_18,
        fontWeight: '600'
    }
});

export const ButtonPlusMinus = React.memo(ButtonPlusMinusComponent, equals);
