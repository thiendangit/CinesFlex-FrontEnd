import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {ImageProps, StyleSheet} from "react-native";
import {scale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface ticketItemProps {
    image: ImageProps,
    onPressItem: () => void,
    numberItem: number
}

export const ButtonChooseMore = ({image, onPressItem, numberItem}: ticketItemProps) => {
    return (
        <Button style={styles.container} onPress={onPressItem}>
            <Block style={styles.buttonContainer}>
                <Text style={styles.imagesContainer}>
                    {numberItem === 0 ? "O" : numberItem}
                </Text>
            </Block>
            <Img source={image} style={styles.imageStyle}/>
        </Button>
    )
};

const styles = StyleSheet.create({
    container: {
        height: deviceWidth / 4,
        width: deviceWidth / 4,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        alignItems: 'center',
        backgroundColor: ColorsCustom.product.ViewBorder,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dayText: {
        fontSize: FontSizeDefault.FONT_14,
        fontWeight: 'bold'
    },
    dayOfWeed: {
        color: ColorsCustom.grey,
    },
    imagesContainer: {
        color: ColorsCustom.lightWhite,
        fontSize: FontSizeDefault.FONT_20
    },
    buttonContainer: {
        position: 'absolute',
        right: scale(-10),
        top: scale(-15 / 2),
        backgroundColor: ColorsCustom.darkOrange,
        height: scale(25),
        width: scale(25),
        borderRadius: scale(30 / 2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        height: deviceWidth / 6,
        width: deviceWidth / 6
    }
});

export const _buttonChooseMore = memo(ButtonChooseMore, isEqual);

