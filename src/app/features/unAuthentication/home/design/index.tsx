import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Img, ListView, Screen, Text} from "@components"
import {ColorsCustom} from "@theme/color";
import {Animated, View} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import {Constants, dispatch, scale, verticalScale} from "@common";
import {deviceWidth} from "@utils";
import {FontSizeDefault} from "@theme/fontSize";
import {_renderListFilm, _renderListFilmHorizontal} from './components';
import SearchBarAnimation from "@library/components/SeachBarAnimation";
import {NavigationService} from "@navigation/navigationService";
import {styles} from "@features/unAuthentication/home/design/style";
import {images} from "@assets/image";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {actionsHome} from "../redux/reducer";
import {SharedElement} from "react-navigation-shared-element";

type HomeProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export interface FilmProps {
    id: number
    image: string
}

let dataDemo = [{
    id: 1,
    image: 'https://phimgi.tv/wp-content/uploads/sat-thu-john-wick-phan-3-chuan-bi-chien-tranh-john-wick-chapter-3-parabellum-9544-2.jpg'
}, {
    id: 2,
    image: 'https://pbs.twimg.com/media/EoQhMw0XcAE2uh9.jpg'
}, {
    id: 3,
    image: 'https://image.phimmoizz.net/film/9271/poster.medium.jpg'
}, {
    id: 4,
    image: 'https://cdn.moveek.com/media/cache/tall/5f7bd372a5dc5059847886.jpg'
}, {
    id: 5,
    image: 'https://pbs.twimg.com/media/EoQhMw0XcAE2uh9.jpg'
}, {
    id: 6,
    image: 'https://image.phimmoizz.net/film/9271/poster.medium.jpg'
}];

let dataDemo2 = [{
    id: 7,
    image: 'https://phimgi.tv/wp-content/uploads/sat-thu-john-wick-phan-3-chuan-bi-chien-tranh-john-wick-chapter-3-parabellum-9544-2.jpg'
}, {
    id: 8,
    image: 'https://pbs.twimg.com/media/EoQhMw0XcAE2uh9.jpg'
}, {
    id: 9,
    image: 'https://image.phimmoizz.net/film/9271/poster.medium.jpg'
}, {
    id: 10,
    image: 'https://cdn.moveek.com/media/cache/tall/5f7bd372a5dc5059847886.jpg'
}, {
    id: 11,
    image: 'https://pbs.twimg.com/media/EoQhMw0XcAE2uh9.jpg'
}, {
    id: 12,
    image: 'https://image.phimmoizz.net/film/9271/poster.medium.jpg'
}];

export const HomeScreen = ({navigation, route}: HomeProps) => {
    const [text, setTitle] = useState("In Theater now");
    const [dataFilmNow, setDataFilmNow] = useState<any>(dataDemo);
    const [dataFilmComing, setDataFilmComing] = useState<any>(dataDemo2);
    const [dataFilmSearch, setDataFilmSearch] = useState<any>(dataDemo);
    const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const scrollRef = useRef<any>();
    const searchRef = useRef<any>();
    const scrollHorizontalTheaterX = useRef<any>(new Animated.Value(0)).current;
    const scrollHorizontalComingX = useRef<any>(new Animated.Value(0)).current;

    let isHorizontal = useSelector(
        (state: RootState) => state.home?.isHorizontal
    );

    useEffect(() => {
        //call api
    }, []);

    const onScroll = (event: any) => {
        // console.log(event.nativeEvent.contentOffset.x)
    };

    const onChangeTextSearch = (text: string, isFocus: boolean) => {
        setTimeout(() => {
            setIsFocusSearch(isFocus);
        }, 350);
        setTextSearch(text);
        searchRef.current.focus()
    };

    const onSubmitSearch = () => {
        //call api search
        alert('call api search')
    };

    const handleOnPressChangeLayout = () => {
        dispatch(actionsHome.onSetLayoutHorizontal(!isHorizontal))
    };

    function onPressItem(item: FilmProps) {
        console.log({item});
        NavigationService.push(APP_SCREEN.FILM_DETAILS, {item});
        // alert(item)
    }

    const _renderItem = ({item, index}: any) => {
        return (
            <SharedElement id={`item.${item.id}.photo`}>
                <_renderListFilm index={index} item={item} onPressItem={onPressItem}/>
            </SharedElement>
        )
    };

    const _renderItemInTheTheaterHorizontal = ({item, index}: any) => {
        const inputRange = [
            (index - 0.9) * deviceWidth,
            index * deviceWidth,
            (index + 0.9) * deviceWidth
        ];
        const translateX = scrollHorizontalTheaterX.interpolate({
            inputRange,
            outputRange: [-deviceWidth * 0.5, 0, deviceWidth * 0.5]
        });
        return (
            <SharedElement id={`item.${item.id}.photo`}>
                <_renderListFilmHorizontal translateX={translateX} index={index} item={item} onPressItem={onPressItem}/>
            </SharedElement>
        )
    };

    const _renderItemComingHorizontal = ({item, index}: any) => {
        const inputRange = [
            (index - 0.6) * deviceWidth,
            index * deviceWidth,
            (index + 0.6) * deviceWidth
        ];
        const translateX = scrollHorizontalComingX.interpolate({
            inputRange,
            outputRange: [-deviceWidth * 0.7, 0, deviceWidth * 0.7]
        });
        return (
            <_renderListFilmHorizontal translateX={translateX} index={index} item={item} onPressItem={onPressItem}/>
        )
    };

    const _footerView = () => {
        return (
            <Block height={verticalScale(30)} width={deviceWidth}/>
        )
    };

    const _renderHeaderView = () => {
        return (
            <Block direction={'row'}>
                <Block height={verticalScale(35)}/>
                <SearchBarAnimation text={textSearch}
                                    placeHolder={'Search film'}
                                    ref={searchRef}
                                    isFocus={false}
                                    onChangeTextSearch={onChangeTextSearch}
                                    onSubmit={onSubmitSearch}
                />
                {!isFocusSearch && !isHorizontal ?
                    <>
                        <Text style={styles().headerTitle}>
                            {text.toUpperCase()}
                        </Text>
                        <SwitchSelector
                            textStyle={{fontSize: FontSizeDefault.FONT_10}}
                            textCStyle={{fontSize: FontSizeDefault.FONT_10}}
                            initial={0}
                            style={{width: deviceWidth / 3.9, marginTop: scale(5), marginLeft: scale(10)}}
                            onPress={value => {
                                if (value === Constants.NOW) {
                                    setTitle('Coming soon');
                                    scrollRef.current.scrollTo({x: deviceWidth * 2, animated: true})
                                } else {
                                    setTitle('In Theater now');
                                    scrollRef.current.scrollTo({x: 0, animated: true})
                                }
                            }}
                            textColor={ColorsCustom.blackTextPrimary}
                            selectedColor={ColorsCustom.lightWhite}
                            buttonColor={ColorsCustom.lime_green}
                            borderColor={ColorsCustom.lime_green}
                            hasPadding
                            options={[
                                {label: "Now", value: Constants.COMING},
                                {label: "Coming", value: Constants.NOW}
                            ]}
                        />
                    </>
                    : null}
            </Block>
        )
    };

    const contentViewHorizontal = () => {
        return (
            <Block marginTop={10} flex={1}>
                <Screen scroll>
                    <Text style={styles().headerTitle}>
                        {'In Theater Now'.toUpperCase()}
                    </Text>
                    <Animated.FlatList style={styles().listContainer}
                                       data={dataFilmNow}
                                       showsHorizontalScrollIndicator={false}
                                       onScroll={Animated.event(
                                           [{
                                               nativeEvent: {contentOffset: {x: scrollHorizontalTheaterX}}
                                           }],
                                           {useNativeDriver: true}
                                       )}
                                       horizontal
                                       pagingEnabled
                                       renderItem={_renderItemInTheTheaterHorizontal}
                                       keyExtractor={(item, index) => index.toString()}
                                       contentContainerStyle={{
                                           marginTop: verticalScale(40),
                                           marginBottom: verticalScale(40)
                                       }}
                                       ListFooterComponent={_footerView}

                    />
                    <Text style={styles().headerTitle}>
                        {'Coming Soon'.toUpperCase()}
                    </Text>
                    <Animated.FlatList style={styles().listContainer}
                                       data={dataFilmComing}
                                       showsHorizontalScrollIndicator={false}
                                       onScroll={Animated.event(
                                           [{
                                               nativeEvent: {contentOffset: {x: scrollHorizontalComingX}}
                                           }],
                                           {useNativeDriver: true}
                                       )}
                                       horizontal
                                       pagingEnabled
                                       renderItem={_renderItemComingHorizontal}
                                       keyExtractor={(item, index) => `${index}+1`.toString()}
                                       contentContainerStyle={{
                                           marginTop: verticalScale(40),
                                           marginBottom: verticalScale(40)
                                       }}
                                       ListFooterComponent={_footerView}

                    />
                </Screen>
            </Block>
        )
    };

    const contentViewVertical = () => {
        return (
            <Animated.ScrollView
                horizontal
                snapToInterval={deviceWidth}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEnabled={false}
                ref={scrollRef}
                style={{flex: 1, marginTop: scale(10)}}
                scrollEventThrottle={1}
                {...{onScroll}}
            >
                <Block block>
                    <ListView style={styles().listContainer}
                              data={dataFilmNow}
                              showsVerticalScrollIndicator={false}
                              renderItem={_renderItem}
                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{marginTop: verticalScale(10)}}
                              ListFooterComponent={_footerView}
                              ListFooterComponentStyle={{
                                  marginTop: verticalScale(40)
                              }}
                              numColumns={2}
                    />
                </Block>
                <Block block>
                    <ListView style={[styles().listContainer]}
                              data={dataFilmComing}
                              showsVerticalScrollIndicator={false}
                              renderItem={_renderItem}
                              keyExtractor={(item, index) => `${index}+1`.toString()}
                              contentContainerStyle={{marginTop: verticalScale(10)}}
                              ListFooterComponentStyle={{
                                  marginTop: verticalScale(40)
                              }}
                              numColumns={2}
                    />
                </Block>
            </Animated.ScrollView>
        )
    };

    const contentViewForSearch = () => {
        return (
            <Block
                block
                marginTop={scale(10)}
            >
                <Block block>
                    <ListView style={styles().listContainer}
                              data={dataFilmSearch}
                              showsVerticalScrollIndicator={false}
                              renderItem={_renderItem}
                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{marginTop: verticalScale(10)}}
                              ListFooterComponent={_footerView}
                              ListFooterComponentStyle={{
                                  marginTop: verticalScale(40)
                              }}
                              numColumns={2}
                    />
                </Block>
            </Block>
        )
    };

    return (
        <Screen style={{flex: 1}} statusColor={ColorsCustom.lightWhite}>
            <Block style={styles().container} block>
                {_renderHeaderView()}
                {!isFocusSearch ?
                    isHorizontal ? contentViewHorizontal() : contentViewVertical()
                    : contentViewForSearch()}
            </Block>
            <Button style={styles().buttonChangeLayout} onPress={handleOnPressChangeLayout}>
                <Img source={isHorizontal ? images.list : images.grid} style={styles().imageChangeLayout}/>
            </Button>
        </Screen>
    );
};

export default memo(HomeScreen, isEqual);
