import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {formatMinusToHours, formatMoney, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {URL_IMAGE} from "@networking";

interface OrderListItemProps {
    item: any,
    index: string,
    onPressItem: (item: any) => void
}

let CONTAINER_HEIGHT = deviceWidth / 5;
let CONTAINER_WIDTH = deviceWidth / 1.05;


export const orderListItem = ({item, index, onPressItem}: OrderListItemProps) => {
    return (
        <Button style={[styles.container, index == '0' ? {
            marginTop: scale(15)
        } : null]}>
            <Button onPress={() => onPressItem(item)} style={[styles.container_item]} activeOpacity={1}>
                <Img style={styles.filmImage}
                     containerStyle={styles.imageContainer}
                     source={handleImage({
                         uri: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg'
                     })}/>
                <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                    <Text fontSize={"FONT_20"} fontWeight={'600'} marginTop={scale(2)} color={ColorsCustom.blue}>Spider
                        Man Return Home</Text>
                    <Block direction={'row'} marginTop={scale(5)}>
                        {
                            item?.detail?.categories.map((item: any, index: number) => {
                                return (
                                    <Text marginLeft={scale(5)}
                                          color={ColorsCustom.grey}
                                          fontWeight={'400'}
                                    >
                                        {item?.title}
                                    </Text>
                                )
                            })
                        }
                        <Text paddingHorizontal={scale(5)}
                              color={ColorsCustom.grey}
                              fontWeight={'400'}>
                            |
                        </Text>
                        <Block>
                            <Text fontWeight={'600'} color={ColorsCustom.grey}>
                                {formatMinusToHours(item?.detail?.duration_min)}
                            </Text>
                        </Block>
                    </Block>
                    <Block direction={'row'} marginTop={scale(5)}>
                        {
                            [1, 2, 3, 4].map((item: any, index: number) => {
                                return (
                                    <Block style={styles.chairContainer}>
                                        <Text color={ColorsCustom.grey} fontWeight={'400'}>A1</Text>
                                    </Block>
                                )
                            })
                        }
                    </Block>
                </Block>
            </Button>
            <Block style={styles.ticketContainer}>
                <Text>
                    Code :
                    <Text fontWeight={'bold'}>
                        {' '}1231234
                    </Text>
                </Text>
                <Text>
                    10:11 AM
                </Text>
                <Text>
                    Otc 6 , 2020
                </Text>
            </Block>
            {[1, 2, 3].map(() => {
                return (
                    <Block style={styles.container_product_item}>
                        <Img style={{
                            flex: 1,
                            borderRadius: scale(5),
                        }}
                             containerStyle={styles.imageProduct}
                             source={handleImage({
                                 uri: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg'
                             })}/>
                        <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                            <Text fontSize={"FONT_15"}
                            >Corn sieu ngon</Text>
                            <Block direction={'row'} marginTop={scale(5)}>
                                <Text paddingHorizontal={scale(5)}
                                      color={ColorsCustom.grey}
                                      fontWeight={'400'}>
                                    x2
                                </Text>
                            </Block>
                        </Block>
                        <Block block direction={'row'} alignItems={'center'}>
                            <Text fontWeight={'600'} color={ColorsCustom.grey}>
                                Total :
                            </Text>
                            <Text fontWeight={'600'} color={ColorsCustom.grey}>
                                {formatMoney(100000)}
                            </Text>
                        </Block>
                    </Block>
                )
            })}
            <Block style={styles.bottomLine}/>
            <Block block direction={'row'} alignItems={'center'} marginTop={scale(5)}>
                <Text fontWeight={'600'} style={{fontSize: FontSizeDefault.FONT_20}} color={ColorsCustom.light_red}>
                    Total :
                </Text>
                <Text fontWeight={'600'} style={{fontSize: FontSizeDefault.FONT_20}} color={ColorsCustom.light_red}>
                    {' '}{formatMoney(100000)}
                </Text>
            </Block>
        </Button>
    )
};

const styles = StyleSheet.create({
    container: {
        minHeight: CONTAINER_HEIGHT,
        width: deviceWidth,
        marginHorizontal: scale(10),
        marginTop: scale(15),
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    container_item: {
        minHeight: CONTAINER_HEIGHT,
        width: CONTAINER_WIDTH,
        margin: scale(5),
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
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
    container_product_item: {
        width: deviceWidth,
        margin: scale(5),
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: scale(20)
    },
    imageProduct: {
        height: CONTAINER_HEIGHT / 2,
        width: CONTAINER_HEIGHT / 1.1 / 2,
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    rightViewContainer: {
        marginLeft: scale(20),
    },
    rightViewContainer_1: {
        marginLeft: scale(2),
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
    filmImage: {
        flex: 1,
        borderRadius: scale(5)
    },
    chairContainer: {
        height: scale(20),
        width: scale(30),
        backgroundColor: ColorsCustom.lightBlue,
        borderRadius: scale(3),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: scale(5)
    },
    ticketContainer: {
        backgroundColor: '#d4d4d4',
        height: scale(20),
        width: deviceWidth,
        marginVertical: scale(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20)
    },
    bottomLine: {
        height: scale(1),
        marginTop: verticalScale(5),
        width: deviceWidth,
        backgroundColor: ColorsCustom.lightGrey
    }
});

export const _orderListItem = memo(orderListItem, isEqual);

