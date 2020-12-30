import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {handleCheckTimeWithCurrentTime, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {CinemasProps} from "@features/unAuthentication/cinemasDetails/design";
import {FilmProps} from "@features/unAuthentication/home/design";

interface subTabItemProps {
    item: CinemasProps,
    index: string,
    onPressItem: (item: any) => void,
    film?: FilmProps | null
}

let CONTAINER_HEIGHT = deviceWidth / 2.5;
let CONTAINER_WIDTH = deviceWidth / 1.1;
let DOT_SIZE = scale(20);


export const cinemasListItem = ({item, index, onPressItem, film}: subTabItemProps) => {
    return (
        <Button key={index.toString()} onPress={() => onPressItem(item)} activeOpacity={1}
                style={[styles.container, index == '0' ? {
                    marginTop: scale(30)
                } : null]}>
            <Img style={{
                flex: 1,
                borderRadius: scale(5)
            }}
                 containerStyle={styles.imageContainer}
                 source={handleImage({
                     uri: item.image ?? 'https://quangcaongoaitroi.com/wp-content/u' +
                         'ploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg'
                 })}/>
            <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                <Text style={styles.nameCinemas} numberOfLines={2}>
                    {item?.name}
                </Text>
                <Text numberOfLines={5} ellipsizeMode="middle" style={styles.detailsCinemas}>
                    {item?.description}
                    {' '}
                    <Text
                        style={[styles.detailsCinemas, {color: ColorsCustom.blue}]}
                        onPress={() => alert('read more')}>
                        see more
                    </Text>
                </Text>
                {
                    film ? <Block direction={'row'} flexWrap={'wrap'}>
                        {
                            item?.show_times.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        activeOpacity={1}
                                        style={[styles.showTime, {backgroundColor: handleCheckTimeWithCurrentTime(item.show_time) ? ColorsCustom.lightGrey : ColorsCustom.lightWhite}]}>
                                        <Text style={{fontSize: FontSizeDefault.FONT_12}}
                                              fontWeight={'600'}
                                              color={handleCheckTimeWithCurrentTime(item.show_time) ? ColorsCustom.lightWhite : ColorsCustom.lightGrey}>
                                            {item.show_time}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </Block> : null
                }
            </Block>
            <Block style={[styles.dotStyle, {
                left: scale(-5),
                borderTopRightRadius: scale(DOT_SIZE / 2),
                borderBottomRightRadius: scale(DOT_SIZE / 2),
            }]}/>
            <Block style={[styles.dotStyle, {
                right: scale(-5),
                borderTopLeftRadius: scale(DOT_SIZE / 2),
                borderBottomLeftRadius: scale(DOT_SIZE / 2),
            }]}/>
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
        backgroundColor: ColorsCustom.darkOrange,
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
        width: CONTAINER_WIDTH / 3,
        position: 'absolute',
        left: scale(15),
        top: -scale(15),
    },
    menuName: {
        marginTop: verticalScale(5),
        color: ColorsCustom.grey
    },
    rightViewContainer: {
        marginLeft: CONTAINER_WIDTH / 3 + scale(20),
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
    showTime: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: scale(14),
        margin: scale(3),
        width: scale(50),
        borderRadius: scale(25 / 2),
        borderColor: ColorsCustom.lightGrey
    },
    dotStyle: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: CONTAINER_HEIGHT / 3 - scale(DOT_SIZE / 2),
        height: scale(DOT_SIZE) / 1.3,
        width: scale(DOT_SIZE) / 2,
    }
});

export const _cinemasListItem = memo(cinemasListItem, isEqual);

