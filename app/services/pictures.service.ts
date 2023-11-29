import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddPictureDTO } from '../Types/pictures/AddPictureDTO';
import { Observable } from 'rxjs';
import { UpdatePictureDTO } from '../Types/pictures/UpdatePictureDTO';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private client:HttpClient) {}

  public add(picture:AddPictureDTO):Observable<object>
  {
    return this.client.post("https://localhost:7012/api/Picture",picture);
  }

  public update(picture:UpdatePictureDTO):Observable<object>
  {
    return this.client.put("https://localhost:7012/api/Picture",picture);
  }
  
}
