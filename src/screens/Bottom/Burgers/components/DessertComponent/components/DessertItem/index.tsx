import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';

import {IDessert} from '../../../../../../../constants/types';

import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { PAGES } from '../../../../../../pages';

const DessertItem = ({item}: {item: IDessert}) => {
  const navigation = useNavigation<any>()

  const navToBurgerDetail = () =>{
    navigation.navigate(PAGES.DESSERTDETAIL.name, {item})
  }
  return (
    <Pressable onPress={navToBurgerDetail} style={styles.container}>
      <Image source={{uri: item?.img}} style={styles.image} />
      <View style={styles.rightContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {item.description}
        </Text>
        <Text style={styles.price}>€{item.price}</Text>
      </View>
    </Pressable>
  );
};

export default DessertItem;
