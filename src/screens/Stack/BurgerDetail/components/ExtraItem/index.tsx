import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';
import styles from './style';
import {IExtra} from '../../../../../constants/types';

const ExtraItem = ({item, onPress}: {item: IExtra, onPress:(item:IExtra)=>void}) => {

    const _onPress = () => onPress(item)

  return (
    <Pressable onPress={_onPress} style={styles.container}>
      <View>
        <Text style={styles.textOne}>{item?.name}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.textTwo}>+ €{item?.price}</Text>
      </View>
    </Pressable>
  );
};

export default ExtraItem;
