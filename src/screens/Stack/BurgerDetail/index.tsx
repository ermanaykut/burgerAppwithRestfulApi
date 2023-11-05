import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {EProductType, IBurger, IExtra} from '../../../constants/types';
import styles from './style';
import {Icon} from 'custom-components/src';
import IngridientItem from './components/IngridientItem';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {BURGEREXTRADATA} from './burgerExtraData';
import ExtraItem from './components/ExtraItem';
import {CartStore} from '../../../store';
import {observer} from 'mobx-react';

const BurgerDetail = ({route}: any) => {
  const {item}: {item: IBurger} = route?.params ?? {};
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(item?.price ?? 0);
  const [extra, setExtra] = useState<IExtra | null>();

  useEffect(() => {
    if (extra) setPrice(item?.price + (extra?.price ?? 0));
  }, [extra]);

  const productType: EProductType = EProductType.BURGER;

  const decreaseCount = () => {
    setCount(count => --count);
  };
  const increaseCount = () => {
    setCount(count => ++count);
  };

  const renderIngridients = ({item}: {item: IBurger}) => (
    <IngridientItem {...{item}} />
  );

  const onPress = (item: IExtra) => {
    actionSheetRef.current?.hide();
    setExtra(item);
  };

  const renderExtra = ({item}: {item: IExtra}) => (
    <ExtraItem {...{item, onPress}} />
  );
  const openExtraAction = () => actionSheetRef.current?.show();

  const addToCart = () => {
    const params = {
      item,
      price,
      extra,
      count,
      productType,
    };
    CartStore.addToCart(params);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item?.images}} />
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.title}>{item?.name}</Text>
          <Text numberOfLines={5} style={styles.description}>
            {item?.desc}
          </Text>
          <Text style={styles.titleIngridients}>Ingridients:</Text>
          <View style={styles.flatContainer}>
            <FlatList
              numColumns={3}
              data={item?.ingredients || []}
              keyExtractor={index => index.toString()}
              renderItem={renderIngridients}
            />
          </View>
          <Pressable onPress={openExtraAction} style={styles.extra}>
            <Text style={styles.actionButtonText}> Add Extra Ingridients</Text>
          </Pressable>
        </View>
        <View style={styles.priceContainer}>
          <View style={styles.countContainer}>
            <Pressable
              onPress={decreaseCount}
              disabled={count === 1}
              style={[
                styles.iconContainer,
                count === 1 && styles.disabledIconContainer,
              ]}>
              <Icon name="minus : materialcomm" size={22} />
            </Pressable>
            <Text style={styles.countText}>{count}</Text>
            <Pressable onPress={increaseCount} style={styles.iconContainer}>
              <Icon name="plus : materialcomm" size={22} />
            </Pressable>
          </View>
          <View style={styles.subPriceContainer}>
            <Text style={styles.totalPrice}>
              €{(item?.price * count + (extra ? extra?.price : 0)).toFixed(2)}
            </Text>
          </View>
          <Pressable onPress={addToCart} style={styles.addToCartContainer}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </Pressable>
        </View>
      </View>
      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <View style={styles.actionSheetContainer}>
          <Text style={styles.actionTitle}>Choose Your Extra Ingridients</Text>
          <FlatList data={BURGEREXTRADATA} renderItem={renderExtra} />
        </View>
      </ActionSheet>
    </View>
  );
};

export default observer(BurgerDetail);
