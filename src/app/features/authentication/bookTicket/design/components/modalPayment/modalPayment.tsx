import React, {forwardRef, memo, useRef, useState} from "react";
import {Block, Button, CardAnimation, IconBack, Img, ModalBox, Text} from "@components";
import {ScrollView, StyleSheet} from "react-native";
import {Constants, formatMoney, scale, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {deviceHeight, deviceWidth} from "@utils";
import isEqual from "react-fast-compare";
import {ProductItem} from "@config/type";
import {FontSizeDefault} from "@theme/fontSize";
import {images, ImageTypes} from "@assets/image";
import LinearGradient from "react-native-linear-gradient";
import {cards, CardType} from "@library/components/CardAnimation/Card";

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
let option_Payment: OptionPayment[] = [
    {
        id: 1,
        name: Constants.PAYMENT_ON_CASH,
        image: images.cash,
        is_Selected: false
    }, {
        id: 2,
        name: Constants.PAYMENT_ONLINE,
        image: images.visa,
        is_Selected: false
    }
];

const ModalPayment = forwardRef<any, ModalWithListProductProps>(
    ({totalPrice, onPressPayment, ...rest},
     ref) => {

        const scrollRef = useRef<any>();
        const [dataCards, setDataCards] = useState(cards);
        const [option_PaymentState, setOption_PaymentState] = useState<OptionPayment[]>(option_Payment);
        const [isActivePayment, setIsActivePayment] = useState<boolean>(false);

        const onPressCompletePayment = () => {
            onPressPayment()
        };

        const _onGoBack = () => {
            scrollRef.current.scrollTo({x: 0, animated: true});
        };

        //handle onPress Payment
        const handleOnPressPaymentMethod = (option: OptionPayment, index: number) => {
            if (!option.is_Selected) {
                let obj: OptionPayment[] = Object.assign([], option_PaymentState);
                obj.map((item: OptionPayment) => {
                    item.is_Selected = false
                });
                obj[index].is_Selected = true;
                setOption_PaymentState(obj);
                if (option.name === Constants.PAYMENT_ONLINE) {
                    scrollRef.current.scrollTo({x: deviceWidth * index, animated: true})
                }
            } else {
                if (option.name === Constants.PAYMENT_ONLINE) {
                    scrollRef.current.scrollTo({x: deviceWidth * index, animated: true})
                }
            }
            setIsActivePayment(false);
            handleActiveButtonPayment()
        };

        // onPress visa card
        const onPressCard = (option: CardType, index: number) => {
            let obj: CardType[] = Object.assign([], dataCards);
            obj.map((item: CardType) => {
                item.isSelected = false
            });
            obj[index].isSelected = !dataCards[index].isSelected;
            setDataCards(obj);
            handleActiveButtonPayment()
        };

        // handle active payment when invalid
        // condition :
        // 1. is PAYMENT_ON_CASH
        // 2. when user choose invalid visa

        const handleActiveButtonPayment = (): boolean => {
            option_PaymentState.map((item) => {
                if (item.name === Constants.PAYMENT_ON_CASH && item.is_Selected) {
                    setIsActivePayment(true)
                }
            });
            dataCards.map((item) => {
                if (item.isSelected) {
                    setIsActivePayment(true)
                }
            });
            return false
        };

        return (
            <ModalBox ref={ref} key={0}>
                <Block style={styles.modalChooseItem}>
                    <Block flex={1} margin={scale(10)}>
                        <ScrollView horizontal style={{flex: 1}} showsHorizontalScrollIndicator={false} ref={scrollRef}
                                    scrollEnabled={false}
                                    pagingEnabled={true}>
                            <Block block width={MODAL_WIDTH - scale(18)}>
                                <Block block justifyContent={'space-between'} alignItems={'center'}
                                       style={{marginHorizontal: scale(20)}} direction={'row'}>
                                    {
                                        option_PaymentState.map((item, index) => {
                                            return (
                                                <Button activeOpacity={1}
                                                        onPress={() => handleOnPressPaymentMethod(item, index)}
                                                        key={item.id.toString()}
                                                        style={[styles.cardContainer, {backgroundColor: item.is_Selected ? ColorsCustom.lightGrey : 'white',}]}>
                                                    <Img style={styles.imagePaymentMethod} resizeMode={'contain'}
                                                         source={item.image}/>
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
                                <Block block justifyContent={'center'} style={{marginLeft: scale(30)}}>
                                    {/*card*/}
                                    <CardAnimation cards={dataCards} onPressCard={onPressCard}/>
                                    {/*Linear gradient*/}
                                    <LinearGradient
                                        colors={['rgba(203,203,203,0)', 'white']}
                                        style={styles.gradientStyle}
                                    />
                                </Block>
                                <IconBack onPress={_onGoBack}
                                          containerStyle={{top: verticalScale(30 + (MODAL_WIDTH / 2) / 2), left: 0}}/>
                            </Block>
                        </ScrollView>
                        {/*total price*/}
                        <Block flex={0.5}>
                            <Block block margin={scale(20)} marginTop={verticalScale(10)}>
                                <Text fontSize={"FONT_24"} fontWeight={'bold'}>
                                    Total Price
                                </Text>
                                <Text fontSize={"FONT_28"} fontWeight={'bold'} color={ColorsCustom.blue}
                                      textAlign={'center'} marginTop={verticalScale(20)}>
                                    {formatMoney(totalPrice, '')}
                                    <Text color={ColorsCustom.light_red}>
                                        VNĐ
                                    </Text>
                                </Text>
                            </Block>
                        </Block>
                        {/*payment button*/}
                        <Block>
                            <Button
                                onPress={isActivePayment ? onPressCompletePayment : () => {
                                    alert('Please choose payment method!')
                                }}
                                style={[styles.buttonPayment, {backgroundColor: isActivePayment ? ColorsCustom.darkYellow : ColorsCustom.lightGrey}]}>
                                <Text style={styles.paymentText}>
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
    },
    cardContainer: {
        height: MODAL_WIDTH / 2.2,
        width: MODAL_WIDTH / 3,
        borderRadius: scale(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    gradientStyle: {
        height: deviceHeight * 0.05,
        width: deviceWidth,
        position: 'absolute',
        bottom: 0,
    },
    buttonPayment: {
        alignSelf: 'center',
        height: verticalScale(50),
        width: MODAL_WIDTH,
        borderRadius: scale(30),
        top: verticalScale(10)
    },
    paymentText: {
        fontSize: FontSizeDefault.FONT_18,
        fontWeight: '600',
        color: ColorsCustom.lightWhite
    },
    imagePaymentMethod: {
        width: MODAL_WIDTH / 3,
        height: MODAL_WIDTH / 2.2 / 2,
    }
});

export const _modalPayment = memo(ModalPayment, isEqual);

