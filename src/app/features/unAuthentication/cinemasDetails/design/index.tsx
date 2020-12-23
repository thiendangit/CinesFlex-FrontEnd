import React from "react";
import {styles} from './style'
import {Block, IconBack, ListView, Screen, Text} from "@components";
import {useTranslation} from 'react-i18next';
import {verticalScale} from "@common";
import {_cinemasListItem} from "./components";
import {NavigationService} from "@navigation/navigationService";
import {APP_SCREEN, RootStackParamList} from "@navigation/screenTypes";
import {FilmProps} from "@features/unAuthentication/home/design";
import {StackScreenProps} from "@react-navigation/stack";

interface CinemasDetailsParamProps {
    route: {
        params: {
            film: FilmProps,
            region: number
        }
    },
}

type CinemasDetailsProps = StackScreenProps<RootStackParamList, APP_SCREEN.FILM_DETAILS> | CinemasDetailsParamProps;

export const CinemasDetailsScreen: React.FC<CinemasDetailsProps> = (props) => {

    const film = props.route.params?.film ?? null;
    const region = props.route.params?.region ?? null;

    const _onGoBack = () => {
        NavigationService.goBack()
    };

    const onPressItem = (obj: any) => {
        if (film && region) {
            NavigationService.navigate(APP_SCREEN.BOOK_TICKET, {film, cinemas: obj, region});
        }
    };

    const _renderItem = ({item, index}: any) => {
        return <_cinemasListItem item={item} index={index} onPressItem={onPressItem}/>
    };

    return (
        <Block style={styles.container}>
            <ListView style={styles.listContainer}
                      data={[1, 2, 3, 4, 5, 6]}
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
                      contentContainerStyle={{
                          marginTop: verticalScale(60), alignSelf: 'center',
                          paddingBottom: verticalScale(80)
                      }}
            />
            <IconBack onPress={_onGoBack}/>
        </Block>
    )
};
