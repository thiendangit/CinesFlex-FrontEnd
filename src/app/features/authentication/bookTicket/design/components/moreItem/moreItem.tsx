import React, {memo} from "react";
import {Block, Button, ButtonPlusMinus, Img, Text} from "@components";
import {StyleSheet} from "react-native";
import {handleImage, scale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {ProductItem} from "@config/type";
import {formatMoney} from "@common";

interface MoreItemProps {
    item: ProductItem,
    index: string,
    onPressMinus: () => any
    onPressPlus: () => any
}

export const MoreItem = (props: MoreItemProps) => {


    const onPressPlus = () => {
        props.onPressPlus()
    };

    const onPressMinus = () => {
        props.onPressMinus()
    };

    return (
        <Block block>
            <Button style={[styles.container]} activeOpacity={1}>
                <Img style={styles.imageProduct}
                     source={handleImage({uri: props.item?.image ?? "https://vuabongbong.com/images/201808/goods_img/bap-rang-le_1460.jpg"})}/>
                <Block style={{}} flex={1}>
                    <Block flex={0.2} direction={'row'} style={{}}>
                        <Block flex={1} style={{marginLeft: scale(10)}} alignItems={'center'}>
                            <Text style={styles.productName} numberOfLines={2}>
                                {props.item?.name}
                            </Text>
                            <Text style={styles.productDetails} numberOfLines={3}>
                                {props.item?.description}
                            </Text>
                        </Block>
                        <Block flex={0.7} alignItems={'center'}>
                            <Text style={styles.productPrice}>
                                {formatMoney(props.item?.price)}
                            </Text>
                        </Block>
                    </Block>
                    <ButtonPlusMinus style={{alignSelf: 'flex-end'}} quality={props.item?.quality ?? 2}
                                     onPressPlus={onPressPlus}
                                     onPressMinus={onPressMinus}/>
                </Block>
            </Button>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: deviceWidth / 3,
        width: deviceWidth / 1.2,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        marginTop: scale(20),
        backgroundColor: ColorsCustom.lightWhite,
        alignItems: 'flex-start',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,

        elevation: 5,
    },
    imageProduct: {
        height: deviceWidth / 3 - scale(20),
        width: deviceWidth / 3 - scale(20),
        borderRadius: scale(20)
    },
    dayText: {
        marginTop: scale(5),
        fontSize: FontSizeDefault.FONT_24,
        fontWeight: 'bold'
    },
    dayOfWeed: {
        color: ColorsCustom.grey,
        marginBottom: scale(5)
    },
    productName: {
        fontSize: FontSizeDefault.FONT_15,
        fontWeight: '500'
    },
    productDetails: {
        color: ColorsCustom.lightGrey,
        marginTop: scale(5)
    },
    productPrice: {
        fontSize: FontSizeDefault.FONT_14,
        fontWeight: '800'
    }
});

export const moreItem = memo(MoreItem, isEqual);

