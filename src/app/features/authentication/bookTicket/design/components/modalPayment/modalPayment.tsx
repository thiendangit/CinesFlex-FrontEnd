import React, {forwardRef, memo, useRef, useState} from "react";
import {Block, Button, IconBack, Img, ListView, ModalBox, Text} from "@components";
import {ScrollView, StyleSheet} from "react-native";
import {formatMoney, handleImage, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {ProductItem} from "@config/type";
import {FontSizeDefault} from "@theme/fontSize";
import {images, ImageTypes} from "@assets/image";

interface ModalWithListProductProps {
    totalPrice: number,
    onPressPayment: () => void
}

interface ItemProps {
    item: ProductItem,
    index: string
}

interface OptionPayment {
    id: number,
    name: string,
    image: ImageTypes,
    is_Selected: boolean
}

const MODAL_WIDTH = deviceWidth / 1.1;

const ModalPayment = forwardRef<any, ModalWithListProductProps>(
    ({totalPrice, onPressPayment, ...rest},
     ref) => {

        const scrollRef = useRef<any>();

        const onPressCompletePayment = () => {
            onPressPayment()
        };

        const _onGoBack = () => {
            scrollRef.current.scrollTo({x: 0, animated: true})
        };

        const handleOnPressPaymentMethod = (option: OptionPayment, index: number) => {
            if (!option.is_Selected) {
                let obj: OptionPayment[] = Object.assign([], option_PaymentState);
                obj.map((item: OptionPayment) => {
                    item.is_Selected = false
                });
                obj[index].is_Selected = true;
                setOption_PaymentState(obj);
                if (option.name === "Payment online") {
                    scrollRef.current.scrollTo({x: deviceWidth * index, animated: true})
                }
            } else {
                if (option.name === "Payment online") {
                    scrollRef.current.scrollTo({x: deviceWidth * index, animated: true})
                }
            }
        };

        const option_Payment: OptionPayment[] = [
            {
                id: 1,
                name: 'Payment on Cinemas',
                image: images.cash,
                is_Selected: false
            }, {
                id: 2,
                name: 'Payment online',
                image: images.visa,
                is_Selected: false
            }
        ];

        const [option_PaymentState, setOption_PaymentState] = useState(option_Payment);

        return (
            <ModalBox ref={ref} key={0}>
                <Block style={styles.modalChooseItem}>
                    <Block flex={1} margin={scale(10)}>
                        <ScrollView horizontal style={{flex: 1}} showsHorizontalScrollIndicator={false}
                                    ref={scrollRef}
                                    scrollEnabled={false}
                                    pagingEnabled={true}>
                            <Block block width={MODAL_WIDTH - scale(18)}>
                                <Block block justifyContent={'space-between'}
                                       alignItems={'center'}
                                       style={{marginHorizontal: scale(20)}}
                                       direction={'row'}>
                                    {
                                        option_PaymentState.map((item, index) => {
                                            return (
                                                <Button
                                                    activeOpacity={1}
                                                    onPress={() => handleOnPressPaymentMethod(item, index)}
                                                    key={item.id.toString()} style={{
                                                    height: MODAL_WIDTH / 2.2,
                                                    width: MODAL_WIDTH / 3,
                                                    backgroundColor: item.is_Selected ? ColorsCustom.lightGrey : 'white',
                                                    borderRadius: scale(10),
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 2,
                                                    },
                                                    shadowOpacity: 0.25,
                                                    shadowRadius: 3.84,

                                                    elevation: 5,
                                                }}>
                                                    <Img style={{
                                                        width: MODAL_WIDTH / 3,
                                                        height: MODAL_WIDTH / 2.2 / 2,
                                                    }}
                                                         resizeMode={'contain'}
                                                         source={item.image}
                                                    />
                                                    <Text textAlign={'center'} marginTop={scale(10)}>
                                                        {item.name}
                                                    </Text>
                                                </Button>
                                            )
                                        })
                                    }
                                </Block>
                            </Block>
                            <Block block width={MODAL_WIDTH - scale(18)}>
                                <Block flex={1} alignItems={'center'}
                                       style={{width: deviceWidth}}
                                       direction={'row'}>
                                    {/*card*/}

                                </Block>
                                <IconBack onPress={_onGoBack} containerStyle={{top: verticalScale(10)}}/>
                            </Block>
                        </ScrollView>
                        <Block flex={0.5}>
                            <Block block margin={scale(20)} marginTop={5}>
                                <Text fontSize={"FONT_24"} fontWeight={'bold'}>
                                    Total Price
                                </Text>
                                <Text fontSize={"FONT_28"}
                                      fontWeight={'bold'}
                                      color={ColorsCustom.blue}
                                      textAlign={'center'}
                                      marginTop={verticalScale(20)}>
                                    {formatMoney(totalPrice, '')}
                                    <Text color={ColorsCustom.light_red}>
                                        VNĐ
                                    </Text>
                                </Text>
                            </Block>
                        </Block>
                        <Block>
                            <Button
                                onPress={onPressCompletePayment}
                                style={{
                                    alignSelf: 'center',
                                    height: verticalScale(50),
                                    width: MODAL_WIDTH,
                                    backgroundColor: ColorsCustom.darkYellow,
                                    borderRadius: scale(30),
                                    top: verticalScale(10)
                                }}>
                                <Text style={{
                                    fontSize: FontSizeDefault.FONT_18,
                                    fontWeight: '600',
                                    color: ColorsCustom.lightWhite
                                }}>
                                    Payment
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </ModalBox>
        )
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: scale(20),
        marginVertical: scale(5),
        marginHorizontal: scale(10),
        marginTop: scale(20),
        backgroundColor: ColorsCustom.red,
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
        height: deviceHeight / 1.4,
        width: MODAL_WIDTH,
        backgroundColor: ColorsCustom.lightWhite,
        borderRadius: scale(30)
    }
});

export const _modalPayment = memo(ModalPayment, isEqual);

