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
  //initialiase
  products: Product[]=[];
  currentCategoryId: number=1;
  previousCategoryId:number =1;
  searchMode: boolean = false;
  //add a new property for pagination
   thePageNumber: number = 1;
   thePageSize:number = 10;
   theTotalElements =0;
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
   // Checking the differents caategory than previous
   //note: Angular will reuse a component if it is currently being viewed
   if(this.previousCategoryId != this.currentCategoryId){
    this.thePageNumber=1;

   }
   this.previousCategoryId = this.currentCategoryId;
   console.log(`currentCategoryId=${this.currentCategoryId}, previousCategoryId=${this.previousCategoryId} `);
    //Now we need to get the product category for the given id of the same category
    this.productService.getProductListPaginate(this.thePageNumber -1, this.thePageSize, this.currentCategoryId).subscribe(
      data =>{
        //collecting data frim the product services 
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;        
      }
    );
  }

}
