import React, {memo, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, Img, ListView, Screen, Text} from "@components"
import {ColorsCustom} from "@theme/color";
import {Animated} from "react-native";
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
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";

type HomeProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export interface FilmProps {
    "id": string,
    "name": string,
    "type": number,
    "status": number,
    "detail": {
        images: {
            id: string,
            url: string
        }[],
        casters: any,
        categories: any,
        price: number,
        rated: number,
        rating: number,
        languages: any,
        director: string,
        duration_min: number,
        description: string
    },
    movie_id: string
    price: number
    rated: number
    rating: number
    trailer_path: string
    updated_at: string,
    created_at: string
    date_begin: string
    date_end: string
}

export const HomeScreen = ({navigation, route}: HomeProps) => {
    const [text, setTitle] = useState("In Theater now");
    const [dataFilmNow, setDataFilmNow] = useState<FilmProps[] | []>([]);
    const [dataFilmComing, setDataFilmComing] = useState<FilmProps[] | []>([]);
    const [dataFilmSearch, setDataFilmSearch] = useState<FilmProps[] | []>([]);
    const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const scrollRef = useRef<any>();
    const searchRef = useRef<any>();
    const scrollHorizontalTheaterX = useRef<any>(new Animated.Value(0)).current;
    const scrollHorizontalComingX = useRef<any>(new Animated.Value(0)).current;

    let isHorizontal = useSelector(
        (state: RootState) => state.home?.isHorizontal
    );
    let {token} = useSelector(
        (state: RootState) => state.app
    );
    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );

    //fetch data home page here
    useEffect(() => {
        dispatch(actionsHome.getDataHomePage(`${URL_DOMAIN}movies`, (result) => {
            if (result?.data?.data) {
                setDataFilmNow(result.data.data.filter((item: FilmProps) => {
                    return item?.type === 1
                }));
                setDataFilmComing(result.data.data.filter((item: FilmProps) => {
                    return item?.type === 2
                }))
            }
        }))
    }, []);

    const onScroll = (event: any) => {
        // console.log(event.nativeEvent.contentOffset.x)
    };

    //handle search text
    const onChangeTextSearch = (text: string, isFocus: boolean) => {
        setTimeout(() => {
            setIsFocusSearch(isFocus);
        }, 350);
        setTextSearch(text);
        searchRef.current.focus()
    };

    //handle submit search
    const onSubmitSearch = (text: string) => {
        //call api search
        alert(`call api search ${text}`)
    };

    //handle on change type of layout
    const handleOnPressChangeLayout = () => {
        dispatch(actionsHome.onSetLayoutHorizontal(!isHorizontal))
    };

    function onPressItem(item: FilmProps, isComing = false) {
        // console.log({item});
        if (token) {
            dispatch(actionsCinemas.onAddFilmToCurrentSeeList(item));
        }
        NavigationService.push(APP_SCREEN.FILM_DETAILS, {item, isComing});
        // alert(item)
    }

    //render item  for list vertical (type 1 )
    const _renderItem = ({item, index, isComing}: any) => {
        return (
            <SharedElement id={`item.${item.id}.photo`}>
                <_renderListFilm isComing={isComing} index={index} item={item} onPressItem={onPressItem}/>
            </SharedElement>
        )
    };

    //render item  in the theater for list Horizontal (type 2 )
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

    //render item  in the coming for list Horizontal (type 2 )
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
            <_renderListFilmHorizontal isComing translateX={translateX} index={index} item={item}
                                       onPressItem={onPressItem}/>
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
                        {/*switch change layout type */}
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

    // Horizontal list
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
                        // ListFooterComponent={_footerView}

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
                        // ListFooterComponent={_footerView}
                    />
                </Screen>
            </Block>
        )
    };

    // Vertical list
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
                              renderItem={({item, index}: any) => _renderItem({item, index, isComing: true})}
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

    //search list
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
            {!isFocusSearch ? <Button style={styles().buttonChangeLayout} onPress={handleOnPressChangeLayout}>
                <Img source={isHorizontal ? images.list : images.grid} style={styles().imageChangeLayout}/>
            </Button> : null}
        </Screen>
    );
};

export default memo(HomeScreen, isEqual);
