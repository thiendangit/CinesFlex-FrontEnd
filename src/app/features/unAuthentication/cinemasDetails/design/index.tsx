import React, {useEffect, useState} from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Text} from "@components";
import {dispatch, handleCheckTimeWithCurrentTime, verticalScale} from "@common";
import {_cinemasListItem} from "./components";
import {NavigationService} from "@navigation/navigationService";
import {APP_SCREEN, RootStackParamList} from "@navigation/screenTypes";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";
import {actionsCinemas} from "@features/unAuthentication/cinemas/redux/reducer";
import {useSelector} from "react-redux";
import {RootState} from "@store/allReducers";
import {RegionProps} from "@features/unAuthentication/cinemas/design";
import {ShowTimeProps} from "@config/type";
import moment from "moment";

interface CinemasDetailsParamProps {
    route: {
        params: {
            film: FilmProps,
            region: RegionProps
        }
    },
}

export interface CinemasProps {
    description: string
    id: string
    name: string
    region_id: string
    show_times: ShowTimeProps[]
    status: number
    type: number,
    images: {
        url: string
    }[]
}

type CinemasDetailsProps = StackScreenProps<RootStackParamList, APP_SCREEN.FILM_DETAILS> | CinemasDetailsParamProps;

export const CinemasDetailsScreen: React.FC<CinemasDetailsProps> = (props) => {

    const film = props.route.params?.film ?? null;
    const region = props.route.params?.region ?? null;

    const [cinemas, setCinemas] = useState<CinemasProps[] | []>([]);

    let URL_DOMAIN = useSelector(
        (state: RootState) => state.app?.appUrl
    );
    useEffect(() => {
        //fetch cinemas list by region & movie
        dispatch(actionsCinemas.getListCinemas(`${URL_DOMAIN}movie-screens/show-times-by-movie-n-region`, {
            "movie_id": film?.id ?? null,
            "region_id": region?.id ?? null
        }, (result) => {
            console.log({result});
            if (result && result?.data?.data) {
                setCinemas(result?.data?.data)
            }
        }))
    }, []);

    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (obj: any) => {
        if (film && region) {
            NavigationService.navigate(APP_SCREEN.BOOK_TICKET, {film, cinemas: obj, region});
        }
    };

    const _renderItem = ({item, index}: any) => {
        return <_cinemasListItem item={item} index={index} film={film} onPressItem={onPressItem}/>
    };

    return (
        <Block style={styles.container}>
            <ListView style={styles.listContainer}
                      data={cinemas}
                      ListHeaderComponent={() => {
                          return (
                              <Text style={styles.text}>
                                  CINEMAS LIST
                              </Text>
                          )
                      }}
                      showsVerticalScrollIndicator={false}
                      renderItem={_renderItem}
                      keyExtractor={(item, index) => index.toString()}
                      contentContainerStyle={styles.flatListContainer}
            />
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
