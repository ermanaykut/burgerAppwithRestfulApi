import {View, Text, Pressable, FlatList, ScrollView, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getLogin} from '../../../mmkv';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import styles from './style';
import {Button, Icon, Input} from 'custom-components/src';
import {colors} from '../../../constants/colors';
import {AddressStore} from '../../../store';
import {IAddress} from '../../../constants/types';
import {AddressItem, DefaultAddressItem} from './components';
import globalStyle from '../../../constants/style';

const Profile = () => {
  const userFullName = getLogin('loginData');
  const addressActionRef = useRef<ActionSheetRef>(null);

  //const [addressName, setAddressName] = useState<string>('');
  //const [name, setName] = useState<string>('');
  //const [familyName, setFamilyName] = useState<string>('');
  //const [streetName, setStreetName] = useState<string>('');
  //const [buildingNumber, setBuildingNumber] = useState<number>();
  //const [flatNumber, setFlatNumber] = useState<number>();
  //const [floorNumber, setFloorNumber] = useState<number>();
  //const [countyName, setCountyName] = useState<string>('');
  //const [cityName, setCityName] = useState<string>('');
  //const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

  const [addressInfo, setAddressInfo] = useState<IAddress>({
    addressName: '',
    name: '',
    familyName: '',
    streetName: '',
    buildingNumber: undefined,
    flatNumber: undefined,
    floorNumber: undefined,
    countyName: '',
    cityName: '',
    defaultAddress: false,
  });

  const [addresses, setAddresses] = useState<IAddress[]>();
  const [isActionHide, SetIsActionHide] = useState<boolean>(true);

  const latestAddresses = AddressStore.address;
  const DefCheckAddresses = AddressStore.address.find(
    x => x?.defaultAddress === true,
  );

  useEffect(() => {
    async function handleActionSheet() {
      if (isActionHide) {
        setAddresses(latestAddresses);
      }
    }
    handleActionSheet();
  }, [addresses]);

  const onDelete = (address: IAddress) => {
    AddressStore.deleteAddress(address);
    const updatedAddreses = addresses?.filter(addressX => addressX !== address);
    setAddresses(updatedAddreses);
  };

  const openAddressAction = () => {
    addressActionRef?.current?.show();
    SetIsActionHide(false);
  };

  const hideActionSheet = () => {
    addressActionRef?.current?.hide();
    SetIsActionHide(true);
  };

  const submitAddress = async () => {
    try {
      const isThereName = await AddressStore.control(addressInfo.addressName);

      if (isThereName) {
        Alert.alert(
          'Address Name already exists!',
          'Try an unused address name, please.',
        );
      } else {
        AddressStore.addToAdress(addressInfo);
        hideActionSheet();
        setAddressInfo(prevInfo => ({...prevInfo, defaultAddress: false}));
      }
    } catch (error) {
      console.error('Error checking address name:', error);
    }
  };

  const RenderAddress = ({item}: {item: IAddress}) => {
    return <AddressItem item={item} onDelete={onDelete} />;
  };
  const RenderDefaultAddress = ({item}: {item: IAddress}) => {
    return <DefaultAddressItem {...{item, onDelete}} />;
  };

  const checkBoxPress = () => {
    setAddressInfo(prevInfo => ({
      ...prevInfo,
      defaultAddress: !prevInfo.defaultAddress,
    }));
  };

  return (
    <View style={[globalStyle.globalContainer, styles.container]}>
      {latestAddresses?.length === 0 && (
        <View style={styles.thirdContainer}>
          <View style={styles.userContainer}>
            <Text style={styles.text}>
              Hello{'! '}
              <Text style={styles.username}>{userFullName}</Text> you can see
              and update your information from here.
            </Text>
            <Text style={styles.text2}>
              You haven't add any address, please click the button to add new
              addresses.
            </Text>
          </View>
        </View>
      )}
      {latestAddresses?.length! > 0 && (
        <ScrollView
          style={styles.secondContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.userContainer}>
            <Text style={styles.text}>
              Hello{'! '}
              <Text style={styles.username}>{userFullName}</Text> you can see
              and update your information from here.
            </Text>
          </View>
          {DefCheckAddresses && (
            <View style={styles.subTitleContainer}>
              <Text style={styles.subTitle}>Preferred Address</Text>
            </View>
          )}

          <View style={styles.flatContainer}>
            <FlatList
              data={addresses}
              renderItem={RenderDefaultAddress}
              keyExtractor={item => item.addressName.toString()}
            />
          </View>

          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>My Addresses</Text>
          </View>
          <View style={styles.flatContainer}>
            <FlatList
              data={addresses}
              renderItem={RenderAddress}
              keyExtractor={item => item.addressName.toString()}
            />
          </View>
        </ScrollView>
      )}
      <Button
        text="ADD NEW ADDRESS"
        textStyle={styles.buttonText}
        onPress={openAddressAction}
        containerStyle={styles.buttonStyle}
      />

      <ActionSheet gestureEnabled ref={addressActionRef}>
        <View style={styles.actionSheetContainer}>
          <View>
            <View style={styles.addressContainer}>
              <Input
                label={'Address Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, addressName: text})
                }
                placeholder="Work, home etc.."
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{width: '100%'}}
              />
            </View>
            <View style={styles.nameContainer}>
              <Input
                label={'Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, name: text})
                }
                placeholder="Please Enter Your Name"
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '47.5%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
              <Input
                label={'Family Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, familyName: text})
                }
                placeholder="Please Enter Related Address Name"
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '47.5%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
            </View>
            <View style={styles.streetContainer}>
              <Input
                label={'Street Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, streetName: text})
                }
                placeholder="Please Enter Street Name"
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
              />
            </View>
            <View style={styles.numberContainer}>
              <Input
                label={'Building No'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, buildingNumber: text})
                }
                placeholder="Building No "
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
              <Input
                label={'Flat No'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, flatNumber: text})
                }
                placeholder="Flat No "
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
              <Input
                label={'Floor No'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, floorNumber: text})
                }
                placeholder="Floor No "
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
            </View>
            <View style={styles.cityContainer}>
              <Input
                label={'County Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, countyName: text})
                }
                placeholder="Please Enter County Name"
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '47.5%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
              <Input
                label={'City Name'}
                onChangeText={(text: any) =>
                  setAddressInfo({...addressInfo, cityName: text})
                }
                placeholder="Please Enter City Name"
                textColor={colors.tortilla}
                outlineColor={colors.brown}
                activeOutlineColor={colors.tortilla}
                style={{
                  width: '47.5%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={submitAddress}
              text="Save"
              textStyle={{color: colors.tortilla}}
              containerStyle={{
                width: '40%',
                height: 40,
                borderColor: colors.tortilla,
              }}
            />
            <View style={styles.defaultTextContainer}>
              <Text style={styles.defaultText}>Save As A Default?</Text>
            </View>
            <View style={styles.checkBoxContainer}>
              <Pressable onPress={checkBoxPress} style={styles.checkBox}>
                {addressInfo.defaultAddress && (
                  <Icon
                    name="check : materialcomm"
                    size={60}
                    style={styles.checkIcon}
                  />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default React.memo(Profile);
