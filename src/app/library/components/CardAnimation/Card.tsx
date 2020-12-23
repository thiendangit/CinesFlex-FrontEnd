import React from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity} from "react-native";
import {images} from "@assets/image";
import {deviceWidth} from "@utils";
import {Block, Img} from "@components";
import {scale} from "@common";
import {icons} from "@assets/icon";
import {ColorsCustom} from "@theme/color";

const {width} = Dimensions.get("window");
export const CARD_WIDTH = deviceWidth / 1.4;
export const CARD_HEIGHT = deviceWidth / 2.5;

export interface CardType {
    card: number,
    isSelected: boolean
}

export const assets = [
    images.card1,
    images.card2,
    images.card3,
    images.card4,
];

const styles = StyleSheet.create({
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
    },
    card: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        borderRadius: 16,
    },
});

export enum Cards {
    Card1 = 0,
    Card2 = 1,
    Card3 = 2,
    Card4 = 3,
}

export const cards: CardType[] = [
    {
        card: Cards.Card1,
        isSelected: false
    },
    {
        card: Cards.Card2,
        isSelected: false
    },
    {
        card: Cards.Card3,
        isSelected: false
    },
    {
        card: Cards.Card4,
        isSelected: false
    },
];

export interface CardProps {
    card: CardType,
    onPress: (card: CardType, index: number) => void,
    index: number
}

const Card = ({card, onPress, index}: CardProps) => {
    return (
        <TouchableOpacity activeOpacity={1} style={styles.cardContainer} onPress={() => onPress(card, index)}>
            <Img style={styles.card} source={assets[card.card]}/>
            {card.isSelected ? <Img
                containerStyle={{
                    position: 'absolute', right: scale(5),
                    bottom: scale(5),
                }}
                resizeMode={'cover'}
                source={icons.check}
                tintColor={ColorsCustom.login.sms}
                style={{
                    height: scale(40),
                    width: scale(40),
                }}/> : null}
        </TouchableOpacity>
    );
};

export default Card;
