import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {Platform, StyleSheet} from "react-native";
import {scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {lineItemProps} from "@features/authentication/userProfile/design";
import {FontSizeDefault} from "@theme/fontSize";
import {icons} from "@assets/icon";
import {HitSlopDefault} from "@theme/hitSlop";

interface lineItemState {
    item: lineItemProps,
    index: string,
    onPressItem: (item: lineItemProps) => void
}

export const lineItem = ({item, index, onPressItem}: lineItemState) => {
    const colorContainerIcon = item?.colorContainerIcon;
    const iconColor = item?.iconColor;
    const textColor = item?.textColor;
    return (
        <Block>
            <Block style={styles.lineHeader}/>
            <Block style={styles.container}>
                <Block direction={'row'} alignItems={'center'}>
                    <Block
                        style={[styles.iconContainer, colorContainerIcon ? {backgroundColor: colorContainerIcon} : null]}>
                        <Img source={item?.image}
                             tintColor={iconColor ? iconColor : ColorsCustom.lightGrey}
                             style={styles.icon}
                             resizeMode={'contain'}/>
                    </Block>
                    <Block marginLeft={scale(10)}>
                        <Text style={[styles.textStyle, textColor ? {color: textColor} : null]}>
                            {item.text}
                        </Text>
                    </Block>
                </Block>
                <Button onPress={() => onPressItem(item)} activeOpacity={1} hitSlop={HitSlopDefault.hitSlop_10}>
                    <Img source={icons.back} tintColor={ColorsCustom.lightGrey} style={styles.iconGoDetails}
                         resizeMode={'contain'}/>
                </Button>
            </Block>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: scale(70),
        width: deviceWidth / 1.2,
        alignSelf: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    lineHeader: {
        height: scale(1),
        backgroundColor: ColorsCustom.lightGrey,
        opacity: 0.5,
        width: deviceWidth / 1.2,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imageContainer: {
        bottom: verticalScale(2),
        height: scale(28),
        width: scale(28),
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    icon: {
        height: scale(20),
        width: scale(20)
    },
    iconGoDetails: {
        height: scale(15),
        width: scale(15),
        transform: [
            {
                rotate: Platform.OS === "ios" ? '3.1' : "180deg"
            }
        ]
    },
    iconContainer: {
        height: scale(40),
        width: scale(40),
        backgroundColor: ColorsCustom.product.ViewBorder,
        borderRadius: scale(40 / 2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: FontSizeDefault.FONT_18,
        color: ColorsCustom.blue,
        fontWeight: '600'
    }
});

export const _lineItem = memo(lineItem, isEqual);

