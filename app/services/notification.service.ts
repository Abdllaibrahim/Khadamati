import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NotificationDto, NotificationAddDto } from '../Types/NotificationDto';





@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private client:HttpClient,private datePipe: DatePipe) {  }

  public getById(id:number):Observable<NotificationDto>
  {
    return this.client.get<NotificationDto>("https://localhost:7012/api/Notification"+id);
  }
  public add(add:NotificationAddDto):Observable<any>
  {
    return this.client.post<string>("https://localhost:7012/api/Notification",add);
  }
  public getByUserId(id:string):Observable<NotificationDto>
  {
    return this.client.get<NotificationDto>("https://localhost:7012/api/Notification/User"+id);
  }
  public update(Notification:NotificationDto):Observable<object>
  {
    return this.client.put("https://localhost:7012/api/Notification",Notification);
  }
  
  public delete(id:number):Observable<object>
  {
    return this.client.delete("https://localhost:7012/api/Notification/"+id); 
  }
  public CreateNotification(Text:string,id:string):string
  {
    var status="Fail";
    const not :NotificationAddDto={
      text:Text,
      date: new Date().toISOString(),
      seen:false,
      userId:id,
    }
    console.log(not);
    this.add(not).subscribe(
      {
        next:()=>{
          status = "Success";
        },
        error:(error)=>{
          status=error.message;
        }
      }
    )
    return status;
  }

}
