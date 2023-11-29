import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoryData } from '../interfaces/categoryData.interface';
import { CategoryReadDTO } from '../Types/category/CategoryReadDTO';

@Injectable({
  providedIn: 'root'
})
export class categoryService {
  private readonly BASE_URL = 'https://localhost:7012/api/Category'
  constructor(private http:HttpClient) { }

  getCategoryData():Observable<ICategoryData[]>{
    return this.http.get<ICategoryData[]>(`${this.BASE_URL}`)
    }
 
  addCategoryData(
    data:{
        name:string
    }
    ){
    return this.http.post(`${this.BASE_URL}`,data)
  }
  deleteCategory(id:number){
  return this.http.delete(`${this.BASE_URL}/${id}`)
  }
  public getAll():Observable<CategoryReadDTO[]>
  {
    return this.http.get<CategoryReadDTO[]>("https://localhost:7012/api/Category");
  }
}
