import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  public products: Product[]=[];
  public currentCategoryId: number=0;
  public searchMode: boolean = true;
  constructor(private productService: ProductService, private route:ActivatedRoute){}
  ngOnInit(): void { 
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
    
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProduct();
    }else{
      this.handleListProducts();
    }
    
  }
  handleSearchProduct() {
    //search from a list of products
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //seach products from using the given keyword from the user
    this.productService.seachPrdoucts(theKeyword).subscribe(
      data =>{
        this.products = data;
      }
    )
  }
  handleListProducts(){
    //check if the id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the 'id' string. convert the string to a number using the "+" symbol
      this.currentCategoryId  = +this.route.snapshot.paramMap.get('id')!;
    }else{
      //If the category is not available 
      this.currentCategoryId =1;
    }

    //Now we need to get the product category for the given id of the same category
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data =>{
        this.products = data;
      }
    )
  }

}
