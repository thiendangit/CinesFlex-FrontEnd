import React, {memo} from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Screen, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {NavigationService} from "@navigation/navigationService";
import isEqual from "react-fast-compare";
import {dispatch, verticalScale} from "@common";
import {_currentSeeListItem} from "./components";
import {FilmProps} from "@features/unAuthentication/home/design";
import {APP_SCREEN} from "@navigation/screenTypes";
import {Alert} from "react-native";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";

export interface Props {
    route: {
        params: {
            text: string
        }
    },
}

const CurrentSeeListScreen: React.FC<Props> = (props): React.ReactElement => {
    const [t] = useTranslation();

    const onPressBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (item: FilmProps) => {
        NavigationService.navigate(APP_SCREEN.FILM_DETAILS, {item, isComing: item.type === 2});
    };

    const onPressDelete = (item: FilmProps) => {
        Alert.alert(
            "",
            "Do you want to delete this film ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "destructive"
                },
                {text: "OK", onPress: () => dispatch(actionsCinemas.onAddFilmToFavoriteList(item))}
            ],
            {cancelable: false}
        );
    };

    let {currentSeeList} = useSelector(
        (state: RootState) => state.cinemas
    );

    const _renderItem = ({item, index}: any) => {
        return <_currentSeeListItem item={item} index={index} onPressItem={onPressItem} onPressDelete={onPressDelete}/>
    };

    return (
        <Block style={styles.container}>
            <Screen>
                <ListView style={styles.listContainer}
                          data={currentSeeList}
                          ListHeaderComponent={() => {
                              return <Text style={styles.text}>
                                  Current See
                              </Text>
                          }}
                          showsVerticalScrollIndicator={false}
                          renderItem={_renderItem}
                          keyExtractor={(item, index) => index.toString()}
                          contentContainerStyle={{
                              marginTop: verticalScale(50), alignSelf: 'center',
                              paddingBottom: verticalScale(60)
                          }}
                />
            </Screen>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </Block>
    )
};

export default memo(CurrentSeeListScreen, isEqual);
