import {action, makeAutoObservable, observable} from 'mobx';
import {EProductType} from '../constants/types';

class CartStore {
  constructor() {
    makeAutoObservable(this);
  }

  @observable cart: any[] = [];
  @observable total: number = 0;

  @action addToCart = (params: any) => {
    console.log('AddToCart Giriş')
    // Check if the product type is BURGER or DESSERT
    if (params?.productType === EProductType.BURGER || params?.productType === EProductType.DESSERT) {
      this.total += params?.price * params?.count;
    }
  
    // Find the product in the cart based on item ID
    let existingProduct = this.cart.find(
      x => x?.item?.id === params?.item?.id
    );
    console.log(existingProduct)
  
    if (existingProduct) {
      if(existingProduct.productType === EProductType.DESSERT){
        let dessertPlus = existingProduct={
          count: existingProduct.count += params?.count
        }
        this.cart.push(dessertPlus)
      } else {

        console.log('existing giriş')
        // Product with the same item ID exists in the cart
        
        // Sort the extras arrays for comparison
        const existingExtrasSorted = existingProduct.extra.slice().sort();
        console.log(existingExtrasSorted)
        
        const newExtrasSorted = params.extra.slice().sort();
        console.log(newExtrasSorted)
        
        // Check if the sorted extras are the same
        const extrasMatch =
        JSON.stringify(existingExtrasSorted) === JSON.stringify(newExtrasSorted);
        
        if (extrasMatch) {
          console.log('extrasMatch girişi')
          // If the sorted extras are the same, increment the count
          
          let bungo = existingProduct={
            count: existingProduct.count += params?.count
          }
          
          this.cart.push(bungo)
        } else {
          console.log('ExtraMatch için else')
          // If the sorted extras are different, add a new product entry
          this.cart.push(params);
        };
      };
    } else {
      console.log('existingProduct else')
      // Product with the same item ID does not exist in the cart, so add it
      this.cart.push(params);
    };
    };
    

  @action changeCount = (params: any, type: string) => {
    let index = this.cart.findIndex(x => x?.item?.id === params?.item?.id);
    let arr = this.cart;
    arr[index] = {
      ...arr[index],
      count: type === 'plus' ? arr[index]?.count + 1 : arr[index]?.count - 1,
    };
    this.cart = arr;
    if (type === 'plus') this.total += params?.price;
    else this.total -= params?.price; //deleteProduct'ta total azaltılmadığı için total ürün silinmesinde azalmıyor
  };

  @action clearAll = () => {
    this.cart = [];
    this.total = 0;
  }; //total sıfırlanmıyor

  @action deleteProduct = (params: any) => {
    let arr: any[] = [];
    this.cart?.map(x => {
      if (x?.item?.id === params?.item?.id) {
        if (params?.productType === EProductType.BURGER) {
          if (x?.extra?.id !== params?.extra?.id) {
            arr.push(x);
          }else{this.total -= x?.price}
        } else{this.total -= x?.price}
      } else arr.push(x);
    });
    this.cart = arr;

  };
}

export default new CartStore();
