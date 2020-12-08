import React, {memo} from "react";
import {Block, Button, Img, Text} from "@components";
import {StyleSheet, TouchableOpacity} from "react-native";
import {handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {SpacingDefault} from "@theme/spacing";
import {deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";

interface subTabItemProps {
    item: any,
    index: string,
    onPressItem: (item: any) => void
}

let CONTAINER_HEIGHT = deviceWidth / 2.5;
let CONTAINER_WIDTH = deviceWidth / 1.1;


export const cinemasListItem = ({item, index, onPressItem}: subTabItemProps) => {
    return (
        <Button onPress={() => onPressItem(item)} style={[styles.container, index == '0' ? {
            marginTop: scale(30)
        } : null]}>
            <Img style={{
                flex: 1,
                borderRadius: scale(5)
            }}
                 containerStyle={styles.imageContainer}
                 source={handleImage({
                     uri: 'https://quangcaongoaitroi.com/wp-content/u' +
                         'ploads/2020/02/quang-cao-tai-rap-chieu-phim-5.jpg'
                 })}/>
            <Block block alignSelf={"flex-start"} style={styles.rightViewContainer}>
                <Text style={styles.nameCinemas} numberOfLines={2}>
                    Cinemas Quang Trung
                </Text>
                <Text
                    numberOfLines={5}
                    ellipsizeMode="middle"
                    style={styles.detailsCinemas}
                >
                    Lịch chiếu phim & Mua vé CGV CT Plaza - CGV toàn quốc đầy đủ & tiện lợi nhất. Rạp CGV CT Plaza
                    nằm ở tầng 10 CT Plaza, nằm đối diện sân bay Tân Sơn Nhất, là 1 khu vực nhộn nhịp và cũng là địa
                    điểm rất được yêu thích của các bạn sinh viên với chất lượng dịch vụ ổn định và giá vé cạnh tranh.
                    {' '}
                    <Text
                        style={[styles.detailsCinemas, {color: ColorsCustom.blue}]}
                        onPress={() => alert('readMore')}>
                        see more
                    </Text>
                </Text>
                <Block direction={'row'} flexWrap={'wrap'}>
                    {
                        [1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{
                                        borderWidth: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: scale(14),
                                        backgroundColor: index === 0 ? ColorsCustom.lightGrey : ColorsCustom.lightWhite,
                                        margin: scale(3),
                                        width: scale(50),
                                        borderRadius: scale(25 / 2),
                                        borderColor: ColorsCustom.lightGrey
                                    }}>
                                    <Text style={{fontSize: FontSizeDefault.FONT_12}}
                                          fontWeight={'600'}
                                          color={index === 0 ? ColorsCustom.lightWhite : ColorsCustom.lightGrey}
                                    >
                                        10:30
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </Block>

            </Block>
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
    }
});

export const _cinemasListItem = memo(cinemasListItem, isEqual);

