import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent  implements OnInit{
  product!: Product;
  constructor(private productService: ProductService,private cartService: CartService, private route: ActivatedRoute){}
  ngOnInit(): void { 
      this.route.paramMap.subscribe(()=>{
        this.handleProductDetails();
      }
      )
  }
  handleProductDetails() {
    //Get the "id " param string and convert to a number uusing the + symbol
    const productId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(productId).subscribe(
      data =>{
        this.product = data;
      }
    )
  }
  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);


  }

}
