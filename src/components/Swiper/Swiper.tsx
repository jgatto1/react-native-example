import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Animated, Dimensions, FlatList, ListRenderItem, StyleProp, View, ViewStyle, ViewToken } from 'react-native';
import { useSwiperStyles } from 'components/Swiper/Swiper.styles';
import { Button } from 'components';

export interface SwiperProps {
  data: JSX.Element[];
  showPagination?: boolean;
  indicatorsPos?: 'top' | 'bottom';
  firstButton?: React.VFC<{ goNext: () => void }>;
  endButtonText?: string | JSX.Element;
  onFinish?: () => void;
  enableNext?: (currentPage: number) => boolean;
  hideBottomBar?: boolean;
  styles?: {
    list?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    itemContainer?: StyleProp<ViewStyle>;
  };
}

export interface SwiperRef {
  goTo: (page: number) => void;
}

export const Swiper = React.forwardRef<SwiperRef, SwiperProps>((props, ref) => {
  const styles = useSwiperStyles();

  const [currentPage, setCurrentPage] = useState<number | null>(0);
  const [dimension, setDimension] = useState<{ width: number; height: number } | null>(null);
  const [backgroundColorAnim, setBackgroundColorAnim] = useState(new Animated.Value(0));
  const [flatList, setFlatList] = useState<FlatList | null>(null);

  const onLayout = () => {
    const { width, height } = Dimensions.get('window');
    setDimension({ width, height });
  };

  useEffect(() => {
    Animated.timing(backgroundColorAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = (index: number) => {
    flatList?.scrollToIndex({ animated: true, index });
  };

  const goNext = () => {
    if ((currentPage || 0) + 1 >= props.data.length) {
      props.onFinish && props.onFinish();
      return;
    }
    scrollTo((currentPage || 0) + 1);
  };

  const goBack = () => {
    if (!currentPage) {
      return;
    }
    scrollTo(currentPage - 1);
  };

  const refInit = () => ({
    goTo: (index: number) => {
      if (index < 0 || index >= props.data.length) {
        throw new Error(`goTo out of index ${index}`);
      }
      scrollTo(index);
    },
  });

  useImperativeHandle(ref, refInit, [scrollTo, refInit]);

  const pagination = props.showPagination && (currentPage !== 0 || !props.firstButton);

  const renderItem: ListRenderItem<React.VFC | JSX.Element> = (item) => {
    // const Item = item.item;
    const widthStyle = { width: dimension?.width || Dimensions.get('window').width };

    return (
      <View style={[widthStyle, styles.itemContainer, props.styles?.itemContainer]}>{item.item as JSX.Element}</View>
    );
  };

  const onViewRef = React.useRef((change: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
    const viewableItems = change.viewableItems;
    if (!viewableItems[0]) {
      return;
    }
    setCurrentPage(viewableItems[0].index);
    setBackgroundColorAnim(new Animated.Value(0));
  });

  const nextButtonText = currentPage === props.data.length - 1 ? props.endButtonText || 'FINISH' : 'NEXT';

  const canGoNext = props.enableNext && currentPage !== null ? props.enableNext(currentPage) : true;

  return (
    <Animated.View onLayout={onLayout} style={[styles.animatedContainer]}>
      {pagination && props.indicatorsPos === 'top' && (
        <View style={styles.dotsContainer}>
          {[...Array(props.data.length)].map((_, index) => (
            <View key={`dot-${index}`} style={[styles.dot, currentPage === index && styles.dotCurrent]} />
          ))}
        </View>
      )}
      <View style={[styles.listContainer, props.styles?.list]}>
        <FlatList
          ref={(flatListRef) => setFlatList(flatListRef)}
          data={props.data}
          pagingEnabled
          horizontal
          scrollEnabled={false}
          onViewableItemsChanged={onViewRef.current}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
          initialNumToRender={1}
          extraData={
            dimension?.width // ensure that the list re-renders on orientation change
          }
        />
      </View>
      {!props.hideBottomBar && (
        <View style={styles.barContainer}>
          {props.firstButton && currentPage === 0 && <props.firstButton goNext={goNext} />}
          {pagination && (
            <>
              <View style={styles.paginationContainer}>
                <View style={styles.buttonLeftContainer}>
                  {(currentPage || 0) > 0 && (
                    <Button style={styles.buttonLeft} textStyle={styles.buttonLeftText} onPress={() => goBack()}>
                      PREVIOUS
                    </Button>
                  )}
                </View>
                {(!props.indicatorsPos || props.indicatorsPos === 'bottom') && (
                  <View style={[styles.dotsContainer, styles.dotsContainerGrow]}>
                    {[...Array(props.data.length)].map((_, index) => (
                      <View key={`dot-${index}`} style={[styles.dot, currentPage === index && styles.dotCurrent]} />
                    ))}
                  </View>
                )}
                <View style={styles.buttonRightContainer}>
                  <Button
                    style={{ paddingHorizontal: 25 - (typeof nextButtonText === 'string' ? nextButtonText.length : 0) }}
                    disabled={!canGoNext}
                    onPress={() => canGoNext && goNext()}>
                    {nextButtonText}
                  </Button>
                </View>
              </View>
            </>
          )}
        </View>
      )}
    </Animated.View>
  );
});
