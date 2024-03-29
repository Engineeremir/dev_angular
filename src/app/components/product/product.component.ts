import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/serivces/cart.service';
import { ProductService } from 'src/app/serivces/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  products:Product[] = [];
  dataLoaded = false;
  filterText="";
  constructor(private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private cartService:CartService,
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["categoryId"]) {
        this.getProductsByCategoryId(params["categoryId"])
      }else{
        this.getProducts()
      }
    })
  }

  getProducts(){
      this.productService.getProducts().subscribe(response=>{
        this.products = response.data
        this.dataLoaded = true;
      })

  }

  getProductsByCategoryId(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }
  addToCart(product:Product){
    console.log(product.productName)
    this.toastrService.success("Sepete Eklendi",product.productName)
    this.cartService.addToCart(product);
  }

}
