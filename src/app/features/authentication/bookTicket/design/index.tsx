import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {
    Block, Icon,
    IconBack,
    Img,
    ModalBoxRef,
    Screen,
    Text
} from "@components"
import {Alert, ScrollView, TouchableOpacity} from "react-native";
import {dispatch, formatMoney, handleCheckTimeWithCurrentTime, scale, toast, useSelector, verticalScale} from "@common";
import {ColorsCustom} from "@theme/color";
import {ChairItemChoose, ProductItem, ShowTimeProps} from "@config/type";
import {AppState} from "@app_redux/type";
import {_modalWithListProduct, dayItem as _dayItem, _modalPayment} from '../design/components'
import {timeItem as _timeItem} from '../design/components'
import {NavigationService} from "@navigation/navigationService";
import {images} from "@assets/image";
import {deviceWidth} from "@utils";
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";
import {_ticketItem} from "@features/authentication/bookTicket/design/components/ticketItem/timeItem";
import {_buttonChooseMore} from "@features/authentication/bookTicket/design/components/buttonChooseMore/buttonChooseMore";
import {Input} from "@features/unAuthentication/login/design/components/Input";
import {styles} from "@features/authentication/bookTicket/design/style";
import {FilmProps} from "@features/unAuthentication/home/design";
import {RegionProps} from "@features/unAuthentication/cinemas/design";
import {CinemasProps} from "@features/unAuthentication/cinemasDetails/design";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {RootState} from "@store/allReducers";
import {onLoadAppEnd} from "@app_redux/reducer"
import {icons} from "@assets/icon";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

interface BookTicketParamProps {
    route: {
        params: {
            film: FilmProps,
            region: RegionProps,
            cinemas: CinemasProps,
        }
    },
}

interface PromotionProps {
    "id": string,
    "promotion_id": string,
    "reference": string,
    "title": string,
    "value": number,
    "type": number,
    "status": number,
    "promotion": {
        "id": string,
        "title": string,
        "description": string,
        "date_begin": string,
        "date_end": string,
        "type": number,
        "status": number
    }
}

type BookTicketProps = StackScreenProps<RootStackParamList, APP_SCREEN.BOOK_TICKET> | BookTicketParamProps;

export const BookTicketScreen: React.FC<BookTicketProps> = (props) => {

    const film = props.route.params?.film ?? null;
    const region = props.route.params?.region ?? null;
    const cinemas = props.route.params?.cinemas ?? null;

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    const [dataChair, setDataChair] = useState<ChairItemChoose[] | []>([]);
    const [showTime, setShowTime] = useState<ShowTimeProps[] | any>([]);
    const [showTimeSub, setShowTimeSub] = useState<ShowTimeProps[] | any>([]);
    const [promotionInfo, setPromotionInfo] = useState<PromotionProps | null>(null);
    const [promotionText, setPromotionText] = useState<string>('');
    const modalCorn = useRef<ModalBoxRef>();
    const modalBeverages = useRef<ModalBoxRef>();
    const modalPayment = useRef<ModalBoxRef>();
    const [dataCorn, setDataCorn] = useState<ProductItem[] | []>([]);
    const [dataBeverage, setDataBeverage] = useState<ProductItem[] | []>([]);
    const [showTimeSelected, setShowTimeSelected] = useState<ShowTimeProps | null>(null);
    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );

    let OPTION_NOTES = [
        {
            id: 1,
            color: ColorsCustom.lightWhite,
            text: 'Is available'
        },
        {
            id: 2,
            color: ColorsCustom.lightGrey,
            text: 'Is reserved'
        },
        {
            id: 3,
            color: ColorsCustom.red,
            text: 'Is VIP',
            image: true
        },
        {
            id: 4,
            color: ColorsCustom.darkOrange,
            text: 'Your choose'
        }
    ];

    useEffect(() => {
        // push to login if user not logged in
        let flag = false;
        if (!token) {
            NavigationService.navigate(APP_SCREEN.LOGIN)
        }
        // fetch day list by cinemas id & movie id
        dispatch(actionsCinemas.getListShowTimeByCinemas(`${URL_DOMAIN}movie-screens/show-times-by-movie-n-cinema`, {
            "movie_id": film?.id ?? '',
            "cinema_id": cinemas?.id ?? ''
        }, (result) => {
            if (result && result?.data?.data) {
                let dataSource: ShowTimeProps[] = Object.assign([], result?.data?.data);
                dataSource.map((item: any, index: number) => {
                    if (index === 0) {
                        item.is_Selected = true;
                        dataSource[0]?.show_times?.map((item_sub: ShowTimeProps, index_sub: any) => {
                            if (!handleCheckTimeWithCurrentTime(dataSource[0]?.show_times[index_sub].show_time) && !flag) {
                                dataSource[0].show_times[index_sub].is_Selected = true;
                                setShowTimeSelected(dataSource[0]?.show_times[index_sub]);
                                flag = true;
                                dispatch(actionsCinemas.getListSeatByScreen(`${URL_DOMAIN}seats/get-list-by-screen`, {
                                    "screen_id": dataSource[0]?.show_times[index_sub].screen_id ?? '',
                                }, (result) => {
                                    if (result && result?.data?.data) {
                                        let dataSource = Object.assign([], result?.data?.data);
                                        dataSource.map((item: any, index: number) => {
                                            item.is_Selected = false
                                        });
                                        setDataChair(dataSource);
                                    }
                                }));
                            }
                        });
                    } else {
                        dataSource[index]?.show_times?.map((item: ShowTimeProps, index: number) => {
                            item.is_Selected = false
                        });
                    }
                });
                dispatch(onLoadAppEnd());
                setShowTime(dataSource);
                let seen = new Set();
                let showTimeReal: ShowTimeProps[] = dataSource[0].show_times;
                const filteredArr = showTimeReal.filter(el => {
                    const duplicate = seen.has(el.show_time);
                    seen.add(el.show_time);
                    return !duplicate;
                });
                setShowTimeSub(filteredArr);
            }
        }))
    }, [token]);

    useEffect(() => {
        let dataCorn: ProductItem[] = [];
        let dataBeverage: ProductItem[] = [];
        // fetch list corn & beverage
        dispatch(actionsCinemas.getListProducts(`${URL_DOMAIN}products`, (result) => {
            if (result && result?.data?.data) {
                let data: ProductItem[] = result?.data?.data;
                dataCorn = data.filter((item) => {
                    return item.type === 1
                });
                dataBeverage = data.filter((item) => {
                    return item.type === 2
                });

                let dataCornCopy: ProductItem[] = Object.assign([], dataCorn);
                for (let j in dataCornCopy) {
                    dataCornCopy[j].quality = 0
                }

                let dataBeverageCopy: ProductItem[] = Object.assign([], dataBeverage);
                for (let k in dataBeverageCopy) {
                    dataBeverageCopy[k].quality = 0
                }
                setDataCorn(dataCornCopy);
                setDataBeverage(dataBeverageCopy)
            }
        }));
    }, []);

    const _onGoBack = () => {
        NavigationService.goBack()
    };


    const onPressApplyPromotionCode = () => {
        if (promotionText === '') return;
        dispatch(actionsCinemas.applyPromotionCode(`${URL_DOMAIN}vouchers/apply`, {code: promotionText}, (result) => {
            console.log({result});
            if (result?.data?.data) {
                toast(result.data.message, 2000);
                setPromotionInfo(result.data.data);
            } else {
                toast(result?.data?.message, 2000)
            }
        }))
    };

    const onPressBuy = () => {
        if (handlePriceTicket(dataChair, dataCorn, dataBeverage) > 0) {
            modalPayment.current?.show();
        } else {
            alert('Please choose your order')
        }
    };

    const onPressPayment = () => {
        let seat_ids: string[] = [];
        // get list seat ids
        dataChair.filter((item) => {
            return item.is_selected
        }).map((item) => {
            seat_ids.push(item.id)
        });
        // get list products
        let products: { product_id: string, product_quantity: number }[] = [];
        // get list corn
        dataCorn.filter((item) => {
            return (item.quality ?? 0) > 0
        }).map((item_sub, index_sub) => {
            products.push({
                product_id: item_sub.id,
                product_quantity: item_sub.quality ?? 0
            })
        });
        // get list beverage
        dataBeverage.filter((item) => {
            return (item.quality ?? 0) > 0
        }).map((item_sub, index_sub) => {
            products.push({
                product_id: item_sub.id,
                product_quantity: item_sub.quality ?? 0
            })
        });
        // call api book ticket
        console.log(showTimeSelected!.id,
            seat_ids,
            products,
            promotionInfo?.id ?? '');
        dispatch(actionsCinemas.bookTicket(`${URL_DOMAIN}orders/booking-ticket`, {
            show_time: showTimeSelected ? showTimeSelected.id ?? '' : '',
            seat_ids,
            products: products ?? null,
            voucher_id: promotionInfo?.id ?? ''
        }, (result) => {
            console.log({result});
            if (result && result?.data?.data) {
                modalPayment.current?.hide();
                setTimeout(() => {
                    toast(result.data.message);
                    setTimeout(() => {
                        NavigationService.navigate(APP_SCREEN.BOOK_TICKET_RESULT, {
                            data: result?.data?.data,
                            text: "Book ticket success! Please take your phone with book code for take a ticket"
                        })
                    }, 200)
                }, 200)
            } else {
                if (result?.data?.message) {
                    Alert.alert(result?.data?.message)
                } else {
                    Alert.alert(result?.msg)
                }
            }
        }))
    };

    const onPressTicket = () => {

    };

    const onPressButtonBeverages = () => {
        modalBeverages.current?.show()
    };

    const onPressButtonCorn = () => {
        modalCorn.current?.show()
    };

    // return quality of product
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
                totalPrice = totalPrice + (showTimeSelected ? showTimeSelected.price ?? 0 : 0)
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
        if (promotionInfo) {
            totalPrice -= totalPrice * (promotionInfo.value / 100)
        }
        // return
        return totalPrice;
    };

    // handle on press minus or plus product extra
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
    // handle on press choose chair
    const onPressChair = (item: ChairItemChoose) => {
        {
            if (item.status !== 2) {
                let dataCopy: ChairItemChoose[] = Object.assign([], dataChair);
                for (let i in dataCopy) {
                    if (dataCopy[i].name === item.name) {
                        dataCopy[i].is_selected = !dataCopy[i].is_selected
                    }
                }
                setDataChair(dataCopy)
            } else {
                toast('this chair is reserved', 2000)
            }
        }
    };

    //render chair
    const _renderChairItem = (dataChair: ChairItemChoose[]) => {
        let dataTemp: any = [];
        let filterByLine: ChairItemChoose[];
        let data: ChairItemChoose[] = dataChair;
        let rowOfChair = 6;
        let numberOfLine = data.length / rowOfChair;
        for (let i = 1; i <= numberOfLine; i++) {
            filterByLine = data.filter(function (item) {
                return item?.seat_row == data[i === 1 ? 1 : i + numberOfLine * i - 1]?.seat_row;
            });
            dataTemp.push(
                <Block direction={'row'}>
                    {filterByLine.map(item => {
                        return (
                            <TouchableOpacity onPress={() => onPressChair(item)}
                                              style={[styles().chairContainer, {
                                                  backgroundColor: item.status === 2 ? ColorsCustom.product.TextLight : item.is_selected ? ColorsCustom.darkOrange : 'white',
                                              }]}>
                                <Text>
                                    {item.name}
                                </Text>
                                {item.type === 2 ? <TouchableOpacity
                                    onPress={() => onPressChair(item)}
                                    style={{
                                        position: 'absolute',
                                        right: -scale(15 / 3),
                                        bottom: -scale(15 / 3)
                                    }}>
                                    {/*// @ts-ignore*/}
                                    <Img style={{
                                        height: scale(15),
                                        width: scale(15)
                                    }}
                                         source={icons.vip}
                                         resizeMode={'contain'}>
                                    </Img>
                                </TouchableOpacity> : null}
                            </TouchableOpacity>
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

    const _renderNoteForChair = () => {
        return (
            <Block style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                width: deviceWidth - scale(20),
            }}>
                {
                    OPTION_NOTES.map((item, index) => {
                        return (
                            <Block alignItems={'center'}
                                   marginTop={scale(10)}
                                   justifyContent={'center'}
                                   alignSelf={'center'} block
                                   direction={'row'}>
                                {!item.image ? <Block height={scale(7)} width={scale(7)} style={{
                                        borderRadius: scale(5),
                                        backgroundColor: item.color,
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,

                                        elevation: 5,
                                    }}>
                                    </Block> :
                                    <Img style={{
                                        height: scale(10),
                                        width: scale(10)
                                    }}
                                         source={icons.vip}
                                         resizeMode={'contain'}/>}
                                <Text marginLeft={scale(10)} fontSize={"FONT_11"}>
                                    {item.text}
                                </Text>
                            </Block>
                        )
                    })
                }
            </Block>
        )
    };

    // handle OnPress Day
    const onPressDay = (item: any, index: string) => {
        let dataSource = Object.assign([], showTime);
        if (!item.is_Selected) {
            dataSource.map((item: any, index: number) => {
                return item.is_Selected = false
            });
            dataSource[index].is_Selected = true;
            setShowTime(dataSource);
            setDataChair([]);
            dataSource[index]?.show_times?.map((item_sub: ShowTimeProps, index_sub: number) => {
                if (item.is_Selected && !handleCheckTimeWithCurrentTime(item_sub?.show_time)) {
                    dispatch(actionsCinemas.getListSeatByScreen(`${URL_DOMAIN}seats/get-list-by-screen`, {
                        "screen_id": item_sub?.screen_id ?? '',
                    }, (result) => {
                        if (result && result?.data?.data) {
                            let dataSource_sub = Object.assign([], result?.data?.data);
                            dataSource_sub.map((item_sub_s: any, index_sub_s: number) => {
                                item_sub_s.is_Selected = false
                            });
                            setDataChair(dataSource_sub);
                        }
                    }))
                }
            });
            setShowTimeSelected(item);
            let seen = new Set();
            let showTimeReal: ShowTimeProps[] = dataSource[index]?.show_times;
            const filteredArr = showTimeReal.filter(el => {
                const duplicate = seen.has(el.show_time);
                seen.add(el.show_time);
                return !duplicate;
            });
            setShowTimeSub(filteredArr);
        }
    };

    // handle OnPress Time
    const onPressTime = (item: ShowTimeProps, index: string) => {
        if (handleCheckTimeWithCurrentTime(item?.show_time) && item.day === showTime[0].day) {
            toast('Film is showed at this time')
        } else {
            let dataSource = Object.assign([], showTimeSub);
            if (!item.is_Selected) {
                dataSource.map((item: any, index: number) => {
                    return item.is_Selected = false
                });
                dataSource[index].is_Selected = true;
                setShowTimeSub(dataSource);
                dispatch(actionsCinemas.getListSeatByScreen(`${URL_DOMAIN}seats/get-list-by-screen`, {
                    "screen_id": item?.screen_id ?? '',
                }, (result) => {
                    if (result && result?.data?.data) {
                        let dataSource = Object.assign([], result?.data?.data);
                        dataSource.map((item: any, index: number) => {
                            item.is_Selected = false
                        });
                        setDataChair(dataSource);
                        setShowTimeSelected(item)
                    }
                }))
            }
        }
    };

    return (
        <Block style={styles().container}>
            <Screen scroll bounces={false}>
                <Block alignItems={'center'}>
                    <Text style={styles().nameFilm} numberOfLines={2}>
                        {film?.name}
                    </Text>
                    <Text style={styles().sectionSelection}>
                        session selection
                    </Text>
                </Block>
                <Block>
                    <ScrollView horizontal style={{marginTop: scale(15)}}
                                contentContainerStyle={{marginLeft: scale(15), paddingRight: scale(25)}}
                                showsHorizontalScrollIndicator={false}>
                        {showTime.map((item: ShowTimeProps, index: number) => {
                            return (
                                <_dayItem index={index.toString()} item={item} onPressItem={onPressDay}/>
                            )
                        })}
                    </ScrollView>
                </Block>
                {/*render list show time sub*/}
                <Block justifyContent={'center'}>
                    <ScrollView horizontal style={{marginTop: scale(5)}}
                                contentContainerStyle={{marginLeft: scale(15), marginRight : scale(20)}}
                                showsHorizontalScrollIndicator={false}>
                        {showTimeSub && showTimeSub.map((item: ShowTimeProps, index: number) => {
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
                {/*render chair*/}
                <Block alignItems={'center'}>
                    {_renderChairItem(dataChair)}
                    {_renderNoteForChair()}
                </Block>
                {/*render button choose chair*/}
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
                           onTextChange={(name, value) => {
                               setPromotionText(value ?? '')
                           }}
                           activeTintBorderColor={ColorsCustom.blue}
                           containerStyle={{width: deviceWidth - scale(50), height: scale(40)}}/>
                    <Icon icon={'send'} style={{height: scale(15), width: scale(15)}}
                          onPress={onPressApplyPromotionCode}
                          containerStyle={{marginLeft: scale(10)}}/>
                </Block>
                {/*render % promotion*/}
                {
                    promotionInfo ? <Text style={{color: ColorsCustom.red, marginLeft: scale(15), marginTop: scale(5)}}>
                        You get a discount {promotionInfo?.value} %
                    </Text> : null
                }
                {
                    <Text style={{color: ColorsCustom.blue, marginLeft: scale(15), marginTop: scale(15)}}>
                        You can save 5% on coin wallet after payment
                        : {formatMoney(handlePriceTicket(dataChair, dataCorn, dataBeverage) * 0.00005, 'Coin')}
                    </Text>
                }
                <Block direction={'row'} marginLeft={scale(10)} alignItems={'center'}
                       justifyContent={'space-between'} marginTop={scale(10)}>
                    <Block>
                        <_ticketItem numberTicket={handleQualityTicket(dataChair)} onPressItem={onPressTicket}/>
                    </Block>
                    <_ButtonBuy totalPrice={handlePriceTicket(dataChair, dataCorn, dataBeverage)}
                                text={'BUY'}
                                image={images.cart}
                                onPressBuy={onPressBuy}/>
                </Block>
                {/*render modal product & payment*/}
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
