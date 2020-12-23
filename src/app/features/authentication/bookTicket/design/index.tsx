import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {
    Block,
    Button,
    Header, Icon,
    IconBack,
    Img,
    ListView,
    ModalBox,
    ModalBoxRef,
    Screen,
    Text
} from "@components"
import {ScrollView} from "react-native";
import {formatMoney, scale, useSelector, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {ChairItemChoose, ProductItem} from "@config/type";
import {AppState} from "@app_redux/type";
import {_modalWithListProduct, dayItem as _dayItem, _modalPayment} from '../design/components'
import {timeItem as _timeItem} from '../design/components'
import {moreItem as _moreItem} from '../design/components'
import {NavigationService} from "@navigation/navigationService";
import {images} from "@assets/image";
import {deviceWidth} from "@utils";
import {chairs, dataBevSample, dataCornSample} from "@features/authentication/bookTicket/design/dataSample/data";
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";
import {_ticketItem} from "@features/authentication/bookTicket/design/components/ticketItem/timeItem";
import {_buttonChooseMore} from "@features/authentication/bookTicket/design/components/buttonChooseMore/buttonChooseMore";
import {FontSizeDefault} from "@theme/fontSize";
import {Input} from "@features/unAuthentication/login/design/components/Input";
import {styles} from "@features/authentication/bookTicket/design/style";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const BookTicketScreen = ({navigation, route}: MoreProps) => {

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    const [dataChair, setDataChair] = useState<any>(chairs);
    const modalCorn = useRef<ModalBoxRef>();
    const modalBeverages = useRef<ModalBoxRef>();
    const modalPayment = useRef<ModalBoxRef>();
    const [dataCorn, setDataCorn] = useState(dataCornSample);
    const [dataBeverage, setDataBeverage] = useState(dataBevSample);

    // useEffect(()=>{
    //     if(!token){
    //         NavigationService.navigate(APP_SCREEN.LOGIN)
    //     }
    // },[token]);

    useEffect(() => {
        let dataCopy: ChairItemChoose[] = Object.assign([], dataChair);
        for (let i in dataCopy) {
            dataCopy[i].is_selected = false
        }

        let dataCornCopy: ProductItem[] = Object.assign([], dataCorn);
        for (let j in dataCornCopy) {
            dataCornCopy[j].quality = 0
        }

        let dataBeverageCopy: ProductItem[] = Object.assign([], dataBeverage);
        for (let k in dataBeverageCopy) {
            dataBeverageCopy[k].quality = 0
        }

        setDataChair(dataCopy);
        setDataCorn(dataCornCopy);
        setDataBeverage(dataBeverageCopy)
    }, []);

    const _onGoBack = () => {
        NavigationService.goBack()
    };


    const onPressApplyCode = () => {
        alert('Apply Code!!')
    };

    const onPressBuy = () => {
        if (handlePriceTicket(dataChair, dataCorn, dataBeverage) > 0) {
            modalPayment.current?.show();
        } else {
            alert('Please choose your order')
        }
    };

    const onPressPayment = () => {
        alert('call api payment')
        // NavigationService.navigate(APP_SCREEN.BOOK_TICKET_RESULT, {text: "Book ticket success! Please take your phone with book code for take a ticket"})
    };

    const onPressTicket = () => {

    };

    const onPressButtonBeverages = () => {
        modalBeverages.current?.show()
    };

    const onPressButtonCorn = () => {
        modalCorn.current?.show()
    };

    const handleQualityProduct = (dataSources: ProductItem[]): number => {
        let quality = 0;
        dataSources
            .filter((item) => parseInt(String(item.quality ?? '0')) > 0)
            .map((item) => {
                quality = quality + parseInt(String(item.quality ?? '0'))
            });
        return quality;
    };

    /*return quality of the ticket*/
    const handleQualityTicket = (dataSources: ChairItemChoose[]): number => {
        let quality = 0;
        dataSources
            .filter((item) => (item.is_selected ?? false))
            .map((item) => {
                quality = quality + 1
            });
        return quality;
    };

    /*return total price have to pay*/
    const handlePriceTicket = (dataSources: ChairItemChoose[], dataCorns: ProductItem[], dataBeverage: ProductItem[]): number => {
        let totalPrice = 0;
        //total price of ticket
        dataSources
            .filter((item) => (item.is_selected ?? false))
            .map((item) => {
                totalPrice = totalPrice + 50000
            });
        //total price of corn
        dataCorns
            .filter((item) => parseInt(String(item.quality ?? '0')) > 0)
            .map((item) => {
                totalPrice = totalPrice + parseInt(String(parseInt(String(item.quality ?? '0')) * parseInt(item.price)))
            });
        //total price of beverage
        dataBeverage
            .filter((item) => parseInt(String(item.quality ?? '0')) > 0)
            .map((item) => {
                totalPrice = totalPrice + parseInt(String(parseInt(String(item.quality ?? '0')) * parseInt(item.price)))
            });
        // return
        return totalPrice;
    };

    const plusMinusProduct = (dataSources: ProductItem[], itemForPlus: ProductItem, isPlus = true): ProductItem[] => {
        let dataCornCopy: ProductItem[] = Object.assign([], dataSources);
        dataCornCopy.map((obj, index) => {
            if (obj.id === itemForPlus.id && (!isPlus ? (itemForPlus.quality ?? 0) > 0 : (itemForPlus.quality ?? 0) >= 0)) {
                dataCornCopy[index].quality = isPlus ? (dataSources[index].quality ?? 0) + 1 : (dataSources[index].quality ?? 0) - 1
            }
        });
        return dataCornCopy
    };

    const onPressPlusCornItem = (item: ProductItem) => {
        let result: ProductItem[] = plusMinusProduct(dataCorn, item);
        setDataCorn(result);
    };

    const onPressMinusCornItem = (item: ProductItem) => {
        let result: ProductItem[] = plusMinusProduct(dataCorn, item, false);
        setDataCorn(result);
    };

    const onPressPlusBeveragesItem = (item: ProductItem) => {
        let result: ProductItem[] = plusMinusProduct(dataBeverage, item);
        setDataBeverage(result);
    };

    const onPressMinusBeveragesItem = (item: ProductItem) => {
        let result: ProductItem[] = plusMinusProduct(dataBeverage, item, false);
        setDataBeverage(result);
    };

    const _renderChairItem = (dataChair: ChairItemChoose[]) => {
        let dataTemp: any = [];

        let filterByLine: ChairItemChoose[];
        let data: ChairItemChoose[] = dataChair;
        let numberOfLine = data.length / 6;
        for (let i = 1; i <= numberOfLine; i++) {
            filterByLine = data.filter(function (item) {
                return item.parent == data[i === 1 ? 1 : i * numberOfLine + i - 1].parent;
            });
            dataTemp.push(
                <Block direction={'row'}>
                    {filterByLine.map(item => {
                        return (
                            <Button onPress={() => {
                                if (!item.is_available) {
                                    let dataCopy: ChairItemChoose[] = Object.assign([], dataChair);
                                    for (let i in dataCopy) {
                                        if (dataCopy[i].name === item.name) {
                                            dataCopy[i].is_selected = !dataCopy[i].is_selected
                                        }
                                    }
                                    setDataChair(dataCopy)
                                } else {
                                    alert('this chair is reserved')
                                }
                            }}
                                    style={[styles().chairContainer, {
                                        backgroundColor: item.is_available ? ColorsCustom.product.TextLight : item.is_selected ? ColorsCustom.darkOrange : 'white',
                                    }]}>
                                <Text>
                                    {item.name}
                                </Text>
                            </Button>
                        )
                    })}
                </Block>
            )
        }
        return (
            <Block>
                {dataTemp}
            </Block>
        )
    };

    const onPressDay = () => {

    };

    const onPressTime = () => {

    };

    return (
        <Block style={styles().container}>
            <Screen scroll bounces={false}>
                <Block alignItems={'center'}>
                    <Text style={styles().nameFilm} numberOfLines={2}>
                        John Wick 3 : The Secrets
                    </Text>
                    <Text style={styles().sectionSelection}>
                        session selection
                    </Text>
                </Block>
                <Block>
                    <ScrollView horizontal style={{marginTop: scale(15)}}
                                contentContainerStyle={{marginLeft: scale(15)}}
                                showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <_dayItem index={index.toString()} item={item} onPressItem={onPressDay}/>
                            )
                        })}
                    </ScrollView>
                </Block>
                <Block justifyContent={'center'}>
                    <ScrollView horizontal style={{marginTop: scale(5)}}
                                contentContainerStyle={{marginLeft: scale(15)}}
                                showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3, 4, 5].map((item, index) => {
                            return (
                                <_timeItem index={index.toString()} item={item} onPressItem={onPressTime}/>
                            )
                        })}
                    </ScrollView>
                </Block>
                <Block alignItems={'center'}>
                    <Img source={images.line}
                         style={{width: deviceWidth / 1.1, height: 40, marginTop: verticalScale(15)}}/>
                </Block>
                <Block alignItems={'center'}>
                    {_renderChairItem(dataChair)}
                </Block>
                <Block direction={'row'} justifyContent={'center'} marginTop={scale(20)}>
                    <_buttonChooseMore onPressItem={onPressButtonCorn} image={images.corn}
                                       key={1}
                                       numberItem={handleQualityProduct(dataCorn)}/>
                    <_buttonChooseMore onPressItem={onPressButtonBeverages} image={images.beverage}
                                       key={2}
                                       numberItem={handleQualityProduct(dataBeverage)}/>
                </Block>
                <Block justifyContent={'center'} alignItems={'center'} marginTop={scale(15)} direction={'row'}>
                    <Input label={'Promotion Code'} name={'text'}
                           typeInput={'outline'}
                           activeTintBorderColor={ColorsCustom.blue}
                           containerStyle={{width: deviceWidth - scale(50), height: scale(scale(30))}}/>
                    <Icon icon={'send'} style={{height: scale(15), width: scale(15)}}
                          onPress={onPressApplyCode}
                          containerStyle={{marginLeft: scale(10)}}/>
                </Block>
                <Block direction={'row'} marginLeft={scale(10)} alignItems={'center'}
                       justifyContent={'space-between'} marginTop={scale(20)}>
                    <Block>
                        <_ticketItem numberTicket={handleQualityTicket(dataChair)} onPressItem={onPressTicket}/>
                    </Block>
                    <_ButtonBuy totalPrice={handlePriceTicket(dataChair, dataCorn, dataBeverage)}
                                text={'BUY'}
                                image={images.cart}
                                onPressBuy={onPressBuy}/>
                </Block>
                <_modalWithListProduct ref={modalCorn} onPressPlus={onPressPlusCornItem}
                                       onPressMinus={onPressMinusCornItem}
                                       dataSource={dataCorn}/>
                <_modalWithListProduct ref={modalBeverages} onPressPlus={onPressPlusBeveragesItem}
                                       onPressMinus={onPressMinusBeveragesItem}
                                       dataSource={dataBeverage}/>
                <_modalPayment ref={modalPayment} totalPrice={handlePriceTicket(dataChair, dataCorn, dataBeverage)}
                               onPressPayment={onPressPayment}/>
            </Screen>
            <IconBack onPress={_onGoBack}/>
        </Block>
    );
};

export default memo(BookTicketScreen, isEqual);
