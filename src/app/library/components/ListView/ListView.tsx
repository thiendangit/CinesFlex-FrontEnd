import React, {memo} from 'react';
import {FlatList, FlatListProps, RefreshControl} from 'react-native';
import equals from 'react-fast-compare';
import {ListViewProps} from './ListView.props';
import {Block, Text} from "@library/components";
import {scale} from "@common";
import {ColorsCustom} from "@theme/color";

const ListViewComponent = (props: ListViewProps & FlatListProps<any>) => {
    const {
        onLoadMore,
        onRefreshing,
        canRefresh = true,
        canLoadMore = false,
        refreshing = false,
    } = props;
    const loadMore = () => {
        if (canLoadMore && onLoadMore && typeof onLoadMore === 'function') {
            onLoadMore();
        }
    };
    const refresh = () => {
        if (onRefreshing && typeof onRefreshing === 'function') {
            onRefreshing();
        }
    };
    return (
        <FlatList
            refreshControl={
                canRefresh ? (
                    <RefreshControl refreshing={refreshing}
                                    tintColor={ColorsCustom.lime_green}
                                    colors={["#9Bd35A", "#689F38"]}
                                    onRefresh={refresh}/>
                ) : undefined
            }
            onEndReached={loadMore}
            ListEmptyComponent={() => {
                return (
                    <Block style={{
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: scale(100)
                    }}>
                        <Text>
                            List empty
                        </Text>
                    </Block>
                )
            }}
            onEndReachedThreshold={0.001}
            {...props}
        />
    );
};

export const ListView = memo(ListViewComponent, equals);
