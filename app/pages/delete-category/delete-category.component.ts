import { ICategoryData } from 'src/app/interfaces/categoryData.interface';
import { categoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.css']
})
export class DeleteCategoryComponent implements OnInit {
  Name:string = "Category Text";
  data:ICategoryData[]|undefined;
  selectedItem:any;
  id: number = 0
  constructor(private categoryService: categoryService) { }
  ngOnInit(): void {
    this.category()
  }
  
  category(){
    this.categoryService.getCategoryData().subscribe((res)=>{
      this.data =res
    })
  }


  delete(id:number){
    this.categoryService.deleteCategory(id).subscribe(
    ()=>{
      this.category()
    })
  }
}
