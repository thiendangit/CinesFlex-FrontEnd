import React, {forwardRef, memo} from "react";
import {Block, Button, ButtonPlusMinus, Img, ListView, ModalBox, ModalBoxRef, Text} from "@components";
import {StyleSheet} from "react-native";
import {handleImage, scale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {moreItem as _moreItem} from "@features/authentication/bookTicket/design/components";
import {ProductItem} from "@config/type";

interface ModalWithListProductProps {
    onPressPlus: (item: ProductItem) => any,
    onPressMinus: (item: ProductItem) => any,
    dataSource: ProductItem[]
}

interface ItemProps {
    item: ProductItem,
    index: string
}

const ModalWithListProduct = forwardRef<any, ModalWithListProductProps>(
    ({onPressMinus, onPressPlus, dataSource, ...rest},
     ref) => {

        const onPressPlusProduct = (item: ProductItem) => {
            onPressPlus(item)
        };

        const onPressMinusProduct = (item: ProductItem) => {
            onPressMinus(item)
        };

        const _renderMoreItem = ({item, index}: ItemProps) => {
            return <_moreItem index={index} item={item} onPressMinus={() => onPressMinusProduct(item)}
                              onPressPlus={() => onPressPlusProduct(item)}/>
        };

        const handlePriceCorn = (data: ProductItem[]) => {
            let total = 0;
            data
                .filter((item) => parseInt(String(item.quality ?? '0')) > 0)
                .map((item) => {
                    total = total + parseInt(String(parseInt(String(item.quality ?? '0')) * parseInt(item.price)))
                });
        };

        return (
            <ModalBox ref={ref} key={0}>
                <Block style={styles.modalChooseItem}>
                    <Block block style={{
                        borderBottomLeftRadius: scale(60),
                        borderBottomRightRadius: scale(60),
                        borderTopLeftRadius: scale(20),
                        borderTopRightRadius: scale(20),
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}>
                        <ListView
                            data={dataSource}
                            renderItem={({item, index}: any) => _renderMoreItem({item, index})}
                            keyExtractor={((item) => item.id.toString())}
                            extraData={dataSource}
                            style={{
                                borderBottomLeftRadius: scale(60),
                                borderBottomRightRadius: scale(60),
                                borderTopLeftRadius: scale(20),
                                borderTopRightRadius: scale(20),
                                backgroundColor: 'white'
                            }}
                            ListFooterComponent={() => {
                                return (
                                    <Block height={scale(20)}/>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{marginTop: scale(10)}}/>
                    </Block>
                    <Block height={scale(60)} style={{backgroundColor: ColorsCustom.green}} borderRadius={60}>
                        <Block block alignItems={'center'} justifyContent={'center'}>
                            <Text style={{
                                fontSize: FontSizeDefault.FONT_18,
                                fontWeight: 'bold'
                            }}>
                                Tổng cộng :
                                <Text style={{
                                    fontSize: FontSizeDefault.FONT_18,
                                    fontWeight: 'bold',
                                    color: ColorsCustom.lightWhite
                                }}>
                                    {handlePriceCorn(dataSource)}
                                </Text>
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </ModalBox>
        )
    });

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
    modalChooseItem: {
        height: deviceHeight / 1.3,
        backgroundColor: ColorsCustom.green,
        borderRadius: scale(30)
    }
});

export const _modalWithListProduct = memo(ModalWithListProduct, isEqual);

