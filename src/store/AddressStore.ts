import {action, makeAutoObservable, observable} from 'mobx';
import {IAddress} from '../constants/types';

class AddressStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable address: IAddress[] = [];
  @observable controlAddresssName: boolean = false

  @action addToAdress = (addressData: IAddress) => {
    let arr: IAddress[] = this.address;

    if (arr.length === 0) {
      arr.push(addressData);
    } else {
      if (addressData.defaultAddress === true) {
        const existingDefaultAddress = arr.find(
          address => address.defaultAddress === true,
        );

        if (existingDefaultAddress) {
          existingDefaultAddress.defaultAddress = false;
        }
      }

      arr.push(addressData);
    }

    this.address = arr ?? [];
  };
  
  @action deleteAddress = (addressData: IAddress) => {
    const arr: IAddress[] = this.address;
    if (arr.map(addressX => addressX.addressName === addressData.addressName)) {
      const updatedAddresses: IAddress[] = arr.filter(
        addressX => addressX.addressName !== addressData.addressName,
      );
      this.address = updatedAddresses;
    }
  };

  @action control = async (addressName: string) => {
    const arr: IAddress[] = this.address;
    
    const addressExists = arr.find((addressX) => addressX.addressName === addressName);
  
    if (addressExists) {
      this.controlAddresssName = true;
    } else {
      this.controlAddresssName = false;
    }
  
    return this.controlAddresssName;
  };



}

export default new AddressStore();
