import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];
  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }
  addToCart(theCartItem: CartItem){
    //check if we already have the in our car
    let alreadyExistInCart: boolean = false;
    let existingCartItem: any = undefined;
    if(this.cartItems.length> 0){
       existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);
       //check if we found the existing item
      alreadyExistInCart = (existingCartItem !=undefined);
    }
    if(alreadyExistInCart){
      existingCartItem.quantity++;
    }else{
      //just add items into the array
      this.cartItems.push(theCartItem);
    }
    //computer cart total price and total quantity
    this.cumputeCartTotals();

  }
  cumputeCartTotals(){
    let totalPriceValue: number =0;
    let totalQuantityValue:number =0;
    for(let currentCartItem of this.cartItems){
      totalPriceValue+= currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of cart');
    for(let temCartItem of this.cartItems){
      const subTotalPrice = temCartItem.quantity * temCartItem.unitPrice;
      console.log(`name: ${temCartItem.name}, quantity=${temCartItem.quantity}, unitPrice=${temCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
    
    
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalPriceValue}`);
    console.log('------------');
  }
}
