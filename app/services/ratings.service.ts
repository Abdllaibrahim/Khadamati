import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RatingAddDto } from '../Types/Ratings/RatingAddDto';
import { RatingDto } from '../Types/Ratings/RatingDto';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private client:HttpClient) { }

  public add(rating:RatingAddDto):Observable<object>
  {
    return this.client.post("https://localhost:7012/api/Rating",rating);
  }

  public delete(id:number):Observable<object>
  {
    return this.client.delete("https://localhost:7012/api/Rating/"+id);
  }

  public getRatingByUserAndService(sid:number,uid:string):Observable<RatingDto>
  {
    return this.client.get<RatingDto>("https://localhost:7012/api/Rating?sid="+sid+"&uid="+uid);
  }

}
