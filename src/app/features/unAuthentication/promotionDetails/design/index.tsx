import React, {memo} from 'react';
// @ts-ignore
import isEqual from 'react-fast-compare';
import {APP_SCREEN} from '@navigation/screenTypes';
import {Block, Button, IconBack, Img, Screen, Text} from "@components"
import {NavigationService} from "@navigation/navigationService";
import {scale, verticalScale} from "@common";
import {deviceHeight, deviceWidth} from "@utils";
import {Animated, ScrollView, StatusBar} from "react-native";
import {PromotionItemProps} from "@features/unAuthentication/promotion/design";
import LinearGradient from "react-native-linear-gradient";
import {FontSizeDefault} from "@theme/fontSize";
import {ColorsCustom} from "@theme/color";

interface leftTabOption {
    title: string
}

export interface Props {
    route: {
        params: {
            item: PromotionItemProps
        }
    },
}

const BACKDROP_HEIGHT = deviceHeight * 0.4;

export const PromotionDetailsScreen: React.FC<Props> = (props): React.ReactElement => {

    let item = props.route.params?.item ?? null;

    const onPressBack = () => {
        NavigationService.goBack()
    };


    return (
        <ScrollView bounces={false} style={{flex: 1, backgroundColor: 'white'}}>
            <Block style={{
                height: BACKDROP_HEIGHT,
                width: deviceWidth,
                position: 'absolute',
                backgroundColor: 'white'
            }}>
                <StatusBar hidden={true}/>
                <Animated.View
                    removeClippedSubviews={false}
                    style={{
                        position: 'absolute',
                        width: deviceWidth,
                        height: deviceHeight,
                        overflow: 'hidden',
                    }}
                >
                    <Img
                        resizeMode={'cover'}
                        source={{uri: item.image}}
                        style={{
                            width: deviceWidth,
                            height: BACKDROP_HEIGHT,
                            position: 'absolute',
                        }}
                    />
                </Animated.View>
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0)', 'white']}
                    style={{
                        height: BACKDROP_HEIGHT,
                        width: deviceWidth,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
            </Block>
            <Block marginTop={BACKDROP_HEIGHT + scale(20)}>
                <Text style={{
                    fontSize: FontSizeDefault.FONT_14,
                    paddingHorizontal: scale(10),
                }}>
                    CGV là chữ viết tắt của Culture (Văn Hóa) – Great (Vĩ Đại) – Vital (Thiết Yếu) cũng là sứ mệnh của
                    CGV từ khi thành lập năm 1996. Hệ thống rạp chiếu phim CGV Việt Nam liên tục cập nhật và sở hữu
                    nhiều công nghệ phòng chiếu hiện đại. Công nghệ chuyển động đa chiều 4DX, âm thanh Dolby Atmos cho
                    các màn hiệu ứng âm thanh bom tấn chân thực, màn hình cong IMAX trải nghiệm hình ảnh cực nét tuyệt
                    đỉnh cùng âm thành phòng chiếu… cùng các trải nghiệm 3D 48FS, Gold Class và ghế Sweetbox cực sáng
                    tạo. Ngoài ra, các chương trình khuyến mãi được tổ chức thường xuyên dành tặng cho quý khách hàng.
                    Bạn cũng có thể tìm kiếm mã giảm giá và ưu đãi tại các danh mục liên quan như Top 20 Mã Giảm Giá,
                    Coupon Hot trong tuần, Tổng hợp,…
                </Text>
                <Button style={{
                    borderColor: ColorsCustom.blue,
                    borderWidth: 1,
                    width: deviceWidth / 3,
                    marginTop: scale(30),
                    alignSelf: 'center',
                    borderRadius: scale(5)
                }}>
                    <Text>
                        Code 12321312
                    </Text>
                </Button>
            </Block>
            <IconBack containerStyle={{marginTop: verticalScale(20)}} onPress={onPressBack}/>
        </ScrollView>
    );
};

export default memo(PromotionDetailsScreen, isEqual);
