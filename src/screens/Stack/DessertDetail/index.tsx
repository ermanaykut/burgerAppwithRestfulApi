import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';

import {EProductType, IDessert} from '../../../constants/types';
import styles from './style';
import {Icon} from 'custom-components/src';
import { CartStore } from '../../../store';
import { colors } from '../../../constants/colors';

const DessertDetail = ({route}: any) => {
  const {item}: {item: IDessert} = route?.params ?? {};
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(item?.price ?? 0);

  const productType: EProductType = EProductType.DESSERT;

  useEffect(() => {
    if(count) setPrice(item?.price );
  }, [count]);



  const decreaseCount = () => setCount(count => --count)
  
  const increaseCount = () => setCount(count => ++count)


  const addToCart = () => {
    const existingCartItem = CartStore.cart.find(
      cartItem => cartItem.item.id === item.id && cartItem.item.productType === EProductType.DESSERT 
    );


    if (existingCartItem) {
      // Update the quantity of the existing item 
      existingCartItem.count += count;
      // cartStore.updateCart([...cartStore.cart]);
    } else {
      // If the item is not in the cart, add it as a new item
      const params = {
        item: {
          ...item,
          id: item?.id?.toString()?.includes(EProductType.DESSERT)
            ? item?.id
            : item?.id + productType,
        },
        price,
        count,
        productType,
      };
      CartStore.addToCart(params);
    }
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: item?.img}} />
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.title}>{item?.name}</Text>
          <Text style={styles.description}>{item?.description}</Text>
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
              <Icon name="minus : materialcomm" size={22} color={colors.white}/>
            </Pressable>
            <Text style={styles.countText}>{count}</Text>
            <Pressable onPress={increaseCount} style={styles.iconContainer}>
              <Icon name="plus : materialcomm" size={22} color={colors.white}/>
            </Pressable>
          </View>
          <View style={styles.subPriceContainer}>
            <Text style={styles.totalPrice}>€{(item?.price * count).toFixed(2)}</Text>
          </View>
          <Pressable onPress={addToCart} style={styles.addToCartContainer}>
            <Text style={styles.addToCartText}>Add To Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default DessertDetail;
