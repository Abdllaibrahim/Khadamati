import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllServicesDetailsDTO } from '../Types/services/GetAllServicesDetailsDTO';
import { GetServiceByIdDTO } from 'src/app/Types/services/GetServiceByIdDTO';
import { GetServiceDetailsByIdDTO } from '../Types/services/GetServiceDetailsByIdDTO';
import { AddServiceDTO } from '../Types/services/AddServiceDTO';
import { UpdateServiceDTO } from '../Types/services/UpdateServiceDTO';
import { GetSpecificServicesDetailsDTO } from '../Types/services/GetSpecificServicesDetailsDTO';
import { GetAllServicesDTO } from '../Types/services/GetAllServicesDTO';


@Injectable({
  providedIn: 'root'
})
export class ServicesOfKhadamatiService {

  constructor(private client:HttpClient) 
  {}

  
  public getAllDetails():Observable<GetAllServicesDetailsDTO[]> 
  {
    return this.client.get<GetAllServicesDetailsDTO[]>("https://localhost:7012/api/Service/Details");
  }

  public getAll():Observable<GetAllServicesDTO[]>
  {
    return this.client.get<GetAllServicesDTO[]>("https://localhost:7012/api/Service");
  }

  public getById(id:number):Observable<GetServiceByIdDTO>
  {
    return this.client.get<GetServiceByIdDTO>("https://localhost:7012/api/Service/"+id);
  }

  public getDetailsById(id:number):Observable<GetServiceDetailsByIdDTO>
  {
    return this.client.get<GetServiceDetailsByIdDTO>("https://localhost:7012/api/Service/Details/"+id);
  }

  public getSpecificDetails(location:string,category:string):Observable<GetSpecificServicesDetailsDTO[]>
  {
    return this.client.get<GetSpecificServicesDetailsDTO[]>
    ("https://localhost:7012/api/Service/SpecificDetails?loction="+location+"&category="+category);
  }
  
  public getSearch(location:string,category:string):Observable<GetAllServicesDetailsDTO[]>
  {
    return this.client.get<GetAllServicesDetailsDTO[]>
    ("https://localhost:7012/api/Service/Search?loction="+location+"&category="+category);
  }
  public add(service:AddServiceDTO):Observable<object>
  {
    return this.client.post("https://localhost:7012/api/Service",service);
  }

  public update(service:UpdateServiceDTO):Observable<object>
  {
    return this.client.put("https://localhost:7012/api/Service",service);
  }
  public Approve(id:number):Observable<object>
  {
    return this.client.post("https://localhost:7012/api/Service/Approve/"+id,id); 
  }
  public delete(id:number):Observable<object>
  {
    return this.client.delete("https://localhost:7012/api/Service/"+id); 
  }
  
}
