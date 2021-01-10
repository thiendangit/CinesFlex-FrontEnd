import React, {forwardRef, memo} from "react";
import {Block, Button, ListView, ModalBox, Text} from "@components";
import {StyleSheet} from "react-native";
import {scale, toast, useSelector} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {FontSizeDefault} from "@theme/fontSize";
import {ProductItem} from "@config/type";
import {RootState} from "@store/allReducers";
import {MyGiftListItem} from "@features/authentication/coin_purse/design/components/myGiftListItem/myGiftListItem";
import Clipboard from "@react-native-community/clipboard";
import {coinPureProps} from "@features/authentication/coin_purse/design";
import MyToast from "@library/components/MyToast";

interface ModalWithListProductProps {
    ref: any
}

let CONTAINER_HEIGHT = deviceWidth / 6;
let CONTAINER_WIDTH = deviceWidth / 1.2;

const ModalMyPromotionProduct = forwardRef<any, ModalWithListProductProps>(
    ({...rest},
     ref) => {

        let {myGiftList} = useSelector(
            (state: RootState) => state.cinemas
        );

        const onPressCopyItem = (item: coinPureProps) => {
            if (item?.reference) {
                Clipboard.setString(item?.reference);
                toast('Copy code success!')
            }
        };

        const _renderMyPromotionItem = ({item, index}: any) => {
            console.log({item});
            return (
                <MyGiftListItem index={index} item={item} key={index.toString()} onPressCopyItem={onPressCopyItem}/>
            )
        };

        return (
            <ModalBox ref={ref} key={0}>
                <Block style={styles.modalChooseItem}>
                    <ListView
                        data={myGiftList}
                        renderItem={({item, index}: any) => _renderMyPromotionItem({item, index})}
                        keyExtractor={((item,index) => item.id + index?.toString())}
                        extraData={myGiftList}
                        style={{}}
                        ListFooterComponent={() => {
                            return (
                                <Block height={scale(20)}/>
                            )
                        }}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{marginTop: scale(10), alignSelf: 'center'}}/>
                </Block>
                <MyToast/>
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
    container_item: {
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
    modalChooseItem: {
        height: deviceHeight / 1.3,
        width: deviceWidth / 1.1,
        backgroundColor: ColorsCustom.lightWhite,
        borderRadius: scale(30)
    },
    listViewContainer: {
        borderBottomLeftRadius: scale(60),
        borderBottomRightRadius: scale(60),
        borderTopLeftRadius: scale(20),
        borderTopRightRadius: scale(20),
        alignItems: 'center',
        backgroundColor: 'white'
    },
    totalText: {
        fontSize: FontSizeDefault.FONT_18,
        fontWeight: 'bold'
    },
    priceTotal: {
        fontSize: FontSizeDefault.FONT_18,
        fontWeight: 'bold',
        color: ColorsCustom.lightWhite,
        marginLeft: scale(5)
    }
});

export const _modalMyPromotion = memo(ModalMyPromotionProduct, isEqual);

