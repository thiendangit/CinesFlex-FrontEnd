import React, {memo, useRef, useState} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, ListView, Screen, SearchRight, Text} from "@components"
import {styles} from "@features/authentication/userProfile/design/style";
import {ColorsCustom} from "@theme/color";
import {Animated} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import {Constants, scale, verticalScale} from "@common";
import {deviceWidth} from "@utils";
import {FontSizeDefault} from "@theme/fontSize";
import {_renderListFilm} from './components';
import SearchBarAnimation from "@library/components/SeachBarAnimation";

type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const HomeScreen = ({navigation, route}: MoreProps) => {
    const [text, setTitle] = useState("In Theater now");
    const [dataFilmNow, setDataFilmNow] = useState<any>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [dataFilmComing, setDataFilmComing] = useState<any>([1, 2, 3]);
    const [dataFilmSearch, setDataFilmSearch] = useState<any>([1, 2, 3,4]);
    const [isFocusSearch, setIsFocusSearch] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const scrollRef = useRef<any>();
    const searchRef = useRef<any>();

    const onScroll = (event: any) => {
        // console.log(event.nativeEvent.contentOffset.x)
    };

    const onChangeTextSearch = (text : string, isFocus : boolean) => {
        setTimeout(()=>{
            setIsFocusSearch(isFocus);
        },350);
        setTextSearch(text);
        searchRef.current.focus()
    };

    const onSubmitSearch = () => {
      alert('call api search')
    };

    const _renderHeaderView = () => {
        return (
            <Block direction={'row'}>
                <Text style={styles().headerTitle}/>
                <SearchBarAnimation text={textSearch}
                                    placeHolder={'Search film'}
                                    ref={searchRef}
                                    isFocus={false}
                                    onChangeTextSearch={onChangeTextSearch}
                                    onSubmit={onSubmitSearch}
                />
                {!isFocusSearch ?
                    <>
                        <Text style={styles().headerTitle}>
                            {text}
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

    function onPressItem(item: any) {
        // NavigationService.navigate(APP_SCREEN.HOME);
        // alert(item)
    }

    const _renderItem = ({item, index}: any) => {
        return (
            <_renderListFilm index={index} item={item} onPressItem={onPressItem}/>
        )
    };

    const _footerView = () => {
        return (
            <Block height={verticalScale(30)} width={deviceWidth}/>
        )
    }

    const contentView = () => {
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
                              keyExtractor={(item, index) => index.toString()}
                              contentContainerStyle={{marginTop: verticalScale(10)}}
                              ListFooterComponentStyle={{
                                  marginTop: verticalScale(40)
                              }}
                              numColumns={2}
                    />
                </Block>
            </Animated.ScrollView>
        )
    }

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
                {!isFocusSearch ? contentView() : contentViewForSearch()}
            </Block>
        </Screen>
    );
};

export default memo(HomeScreen, isEqual);
