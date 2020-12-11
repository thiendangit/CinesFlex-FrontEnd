import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {
    Block,
    Button,
    Header,
    IconBack,
    Img,
    ListView,
    ModalAppMode,
    ModalBox,
    ModalBoxRef,
    Screen,
    Text
} from "@components"
import {Alert, Animated, ScrollView} from "react-native";
import {dispatch, scale, useSelector, verticalScale} from "@common";
import {styles} from "@features/authentication/userProfile/design/style";
import {ColorsCustom} from "@theme/color";
import {ChairItem, ChairItemChoose, tabItem} from "@config/type";
import {onLogout} from "@app_redux/reducer";
import {AppState} from "@app_redux/type";
import {dayItem as _dayItem} from '../design/components'
import {timeItem as _timeItem} from '../design/components'
import {moreItem as _moreItem} from '../design/components'
import {NavigationService} from "@navigation/navigationService";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {images} from "@assets/image";
import {deviceHeight, deviceWidth} from "@utils";
import {chairs} from "@features/authentication/bookTicket/design/dataSample/data";
import {_ButtonBuy} from "@features/unAuthentication/cinemasDetails/design/components/buttonBuy/buttonBuy";
import {_ticketItem} from "@features/authentication/bookTicket/design/components/ticketItem/timeItem";
import {_buttonChooseMore} from "@features/authentication/bookTicket/design/components/buttonChooseMore/buttonChooseMore";
import {icons} from "@assets/icon";
import {AppMode} from "@library/components/AppMode/AppMode";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const BookTicketScreen = ({navigation, route}: MoreProps) => {

    const token = useSelector(
        (state: { app: AppState }) => state?.app?.token
    );

    const [dataChair, setDataChair] = useState<any>(chairs);
    const modalCorn = useRef<ModalBoxRef>();
    const modalBeverages = useRef<ModalBoxRef>();

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
        setDataChair(dataCopy)
    }, []);

    const _onGoBack = () => {
        NavigationService.goBack()
    };


    const _renderHeaderView = () => {
        return (
            <Block>
                <Header headerText={'UserProfile'}
                        titleStyle={styles().headerTitle}
                        style={[
                            styles().header,
                            {
                                backgroundColor: ColorsCustom.lime_green
                            }]
                        }/>
            </Block>
        )
    };

    const onPressBuy = () => {
        NavigationService.navigate(APP_SCREEN.BOOK_TICKET_RESULT, {text: "Book ticket success! Please take your phone with book code for take a ticket"})
    };

    const onPressTicket = () => {

    };

    const onPressButtonBeverages = () => {
        modalBeverages.current?.show()
    };

    const onPressButtonCorn = () => {
        modalCorn.current?.show()
    };

    const onPressCornItem = () => {
        alert('onPressCornItem')
    };

    const onPressBeveragesItem = () => {
        alert('onPressBeveragesItem')
    };

    const _renderMoreItem = ({item, index}: any, onPress: () => void) => {
        return <_moreItem index={item} item={index} onPressItem={onPress}/>
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
                                let dataCopy: ChairItemChoose[] = Object.assign([], dataChair);
                                for (let i in dataCopy) {
                                    if (dataCopy[i].name === item.name) {
                                        dataCopy[i].is_selected = !dataCopy[i].is_selected
                                    }
                                }
                                setDataChair(dataCopy)
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
                    <_buttonChooseMore onPressItem={onPressButtonCorn} image={images.corn} numberItem={0}/>
                    <_buttonChooseMore onPressItem={onPressButtonBeverages} image={images.beverage} numberItem={0}/>
                </Block>
                <Block direction={'row'} marginLeft={scale(20)} alignItems={'center'}
                       justifyContent={'space-between'} marginTop={scale(20)}
                >
                    <Block>
                        <_ticketItem numberTicket={2} onPressItem={onPressTicket}/>
                    </Block>
                    <_ButtonBuy text={`BUY 10.00$`} image={images.cart} onPressBuy={onPressBuy}/>
                </Block>
                <ModalBox ref={modalCorn} key={0}>
                    <Block style={styles().modalChooseItem}>
                        <Block block style={{
                            borderBottomLeftRadius: scale(60),
                            borderBottomRightRadius: scale(60),
                            borderTopLeftRadius: scale(20),
                            borderTopRightRadius: scale(20),
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                            <ListView
                                data={[1, 2, 3, 4]}
                                renderItem={({item, index}: any) => _renderMoreItem({item, index}, onPressCornItem)}
                                keyExtractor={((item, index) => index.toString())}
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
                            <Button>
                                <Text>
                                    abc
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </ModalBox>
                <ModalBox ref={modalBeverages} key={1}>
                    <Block style={styles().modalChooseItem}>
                        <Block block style={{
                            borderBottomLeftRadius: scale(60),
                            borderBottomRightRadius: scale(60),
                            borderTopLeftRadius: scale(20),
                            borderTopRightRadius: scale(20),
                            alignItems: 'center',
                            backgroundColor: 'white'
                        }}>
                            <ListView
                                data={[1, 2, 3, 4]}
                                keyExtractor={((item, index) => index.toString())}
                                renderItem={({item, index}: any) => _renderMoreItem({
                                    item,
                                    index
                                }, onPressBeveragesItem)}
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
                            <Button>
                                <Text>
                                    abc
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </ModalBox>
            </Screen>
            <IconBack onPress={_onGoBack}/>
        </Block>
    );
};

export default memo(BookTicketScreen, isEqual);
