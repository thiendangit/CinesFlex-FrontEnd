import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {formatMinusToHours, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {FilmProps} from "@features/unAuthentication/home/design";
import {URL_IMAGE} from "@networking";
import {icons} from "@assets/icon";

interface CurrentSeeItemProps {
    item: FilmProps,
    index: string,
    onPressItem: (item: FilmProps) => void,
    onPressDelete: (item: FilmProps) => void,
}

let CONTAINER_HEIGHT = deviceWidth / 5;
let CONTAINER_WIDTH = deviceWidth / 1.1;


export const currentSeeListItem = ({item, index, onPressItem, onPressDelete}: CurrentSeeItemProps) => {
    return (
        <Button onPress={() => onPressItem(item)} style={[styles.container, index == '0' ? {
            marginTop: scale(15)
        } : null]}>
            <Img style={{
                flex: 1,
                borderRadius: scale(5)
            }}
                 containerStyle={styles.imageContainer}
                 source={handleImage({
                     uri: `${URL_IMAGE}${item?.detail?.images[0]?.url}`
                 })}/>
            <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                <Text fontSize={"FONT_20"}
                      fontWeight={'600'}
                      marginTop={scale(2)}
                      color={ColorsCustom.blue}
                >{item?.name}</Text>
                <Block direction={'row'} marginTop={scale(5)}>
                    {
                        item?.detail?.categories.map((item: any, index: number) => {
                            return (
                                <Text marginLeft={scale(5)}
                                      key={index.toString()}
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
            </Block>
            {/*<Block style={styles.rightViewContainer_1}>*/}
            {/*    <Button onPress={() => onPressDelete(item)} activeOpacity={1}>*/}
            {/*        <Img source={icons.trash} style={styles.iconTrash}/>*/}
            {/*    </Button>*/}
            {/*</Block>*/}
        </Button>
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
    iconTrash: {
        height: scale(30),
        width: scale(30)
    }
});

export const _currentSeeListItem = memo(currentSeeListItem, isEqual);

