import React, {memo} from "react";
import {Block, Button, ButtonPlusMinus, Img, Text} from "@components";
import {StyleSheet} from "react-native";
import {handleImage, scale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface subTabItemProps {
    item: any,
    index: string,
    onPressItem: () => any
}

export const MoreItem = ({item, index, onPressItem}: subTabItemProps) => {


    const onPressPlus = () => {

    };

    const onPressMinus = () => {

    };

    return (
        <Block block>
            <Button style={[styles.container]} onPress={onPressItem}>
                <Img style={styles.imageProduct}
                     source={handleImage({uri: 'https://i.ebayimg.com/images/g/1ZoAAOSwMYRahbEl/s-l400.jpg'})}/>
                <Block style={{}} flex={1}>
                    <Block flex={0.2} direction={'row'} style={{}}>
                        <Block flex={1} style={{marginLeft: scale(5)}} alignItems={'center'}>
                            <Text style={styles.productName} numberOfLines={2}>
                                Corn Bubble Tea
                            </Text>
                            <Text style={styles.productDetails}>
                                Corn mlem mlem
                            </Text>
                        </Block>
                        <Block flex={0.6} alignItems={'center'}>
                            <Text style={styles.productPrice}>
                                $35.00
                            </Text>
                        </Block>
                    </Block>
                    <ButtonPlusMinus style={{alignSelf: 'flex-end'}} onPressPlus={onPressPlus}
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
        fontSize: FontSizeDefault.FONT_16,
        fontWeight: '800'
    }
});

export const moreItem = memo(MoreItem, isEqual);

