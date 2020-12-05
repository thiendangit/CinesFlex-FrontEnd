import React, {memo} from 'react';
// @ts-ignore
import {StackScreenProps} from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import {RootStackParamList, APP_SCREEN} from '@navigation/screenTypes';
import {Block, Header} from "@components"
import {styles} from "@features/authentication/userProfile/design/style";
import {ColorsCustom} from "@theme/color";
type MoreProps = StackScreenProps<RootStackParamList, APP_SCREEN.HOME>;

export const CinemasScreen = ({navigation, route}: MoreProps) => {

    const _renderHeaderView = () => {
        return (
            <Block>
                <Header headerText={'Cinemas'}
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

    return (
        <Block style={styles().container}>
            {_renderHeaderView()}
        </Block>
    );
};

export default memo(CinemasScreen, isEqual);
