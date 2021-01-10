import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet} from "react-native";
import {handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {URL_IMAGE} from "@networking";
import {icons} from "@assets/icon";
import {coinPureProps} from "@features/authentication/coin_purse/design";

interface MyGiftListItemProps {
    item: coinPureProps,
    index: string,
    onPressCopyItem: (item: coinPureProps) => void,
}

let CONTAINER_HEIGHT = deviceWidth / 5;
let CONTAINER_WIDTH = deviceWidth / 1.3;


export const myGiftListItem = ({item, index, onPressCopyItem}: MyGiftListItemProps) => {
    return (
        <Block style={[styles.container, index == '0' ? {
            marginTop: scale(15)
        } : null]}>
            <Img style={{
                flex: 1,
                borderRadius: scale(5)
            }}
                 containerStyle={styles.imageContainer}
                 source={handleImage({
                     uri: `${URL_IMAGE}${item?.images[0]?.url}` ?? ''})}/>
            <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                <Text fontSize={"FONT_18"}
                      fontWeight={'500'}
                      numberOfLines={2}
                      marginTop={scale(2)}
                      color={ColorsCustom.blue}
                >{item?.title}</Text>
                <Block direction={'row'} marginTop={scale(2)}>

                    <Text marginLeft={scale(5)}
                          key={index.toString()}
                          color={ColorsCustom.grey}
                          fontWeight={'400'}
                    >
                        sales of : {item?.discount}%
                    </Text>
                </Block>
                <Block direction={'row'} marginTop={scale(2)}>
                    <Text marginLeft={scale(5)}
                          key={index.toString()}
                          color={ColorsCustom.grey}
                          fontWeight={'400'}
                    >
                        code :
                    </Text>
                    <Text marginLeft={scale(5)}
                          key={index.toString()}
                          color={ColorsCustom.green}
                          fontWeight={'600'}
                    >
                        {item?.reference}
                    </Text>
                </Block>
            </Block>
            <Block style={styles.rightViewContainer_1}>
                <Button onPress={() => onPressCopyItem(item)} activeOpacity={1}>
                    <Img source={icons.copy} tintColor={ColorsCustom.blue1} style={styles.iconTrash}/>
                </Button>
            </Block>
        </Block>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: CONTAINER_HEIGHT,
        width: CONTAINER_WIDTH,
        borderRadius: scale(10),
        marginHorizontal: scale(10),
        marginTop: scale(25),
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: scale(5),
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
        height: CONTAINER_HEIGHT,
        width: CONTAINER_HEIGHT / 1.1,
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    rightViewContainer: {
        marginLeft: scale(20),
    },
    rightViewContainer_1: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameCinemas: {
        color: ColorsCustom.blue,
        fontSize: FontSizeDefault.FONT_17,
        fontWeight: '600'
    },
    detailsCinemas: {
        color: ColorsCustom.blackTextPrimary,
        fontSize: FontSizeDefault.FONT_13,
    },
    iconTrash: {
        height: scale(30),
        width: scale(30)
    }
});

export const MyGiftListItem = memo(myGiftListItem, isEqual);

