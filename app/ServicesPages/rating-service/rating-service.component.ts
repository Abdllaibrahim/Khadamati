import { Component, Input, OnInit } from '@angular/core';
import { RatingsService } from '../../services/ratings.service';

import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatingAddDto } from 'src/app/Types/Ratings/RatingAddDto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rating-service',
  templateUrl: './rating-service.component.html',
  styleUrls: ['./rating-service.component.css']
})
export class RatingServiceComponent implements OnInit{
  userId?:string=this.user.GetUserId()!;
  newRatingId?:number;
  userName?:string;
  comment?:string;
  @Input() serviceId?:number;
  @Input() ratingId?:number;
  @Input() rating?:number;
  ratingDate?:string;
  

  AddingStatus:boolean=false;

  constructor(private ratingsService:RatingsService,private router:Router,private user:UserService) { }

  ngOnInit(): void 
  {

  }

  
  addRating():void
  {
    if(!this.user.IsLoggedIn())
    {
      this.router.navigateByUrl("/Login");
    }
    else
    {
      const comment1= document.getElementById("c") as HTMLTextAreaElement;
      const rate= document.getElementById("s") as HTMLSelectElement;
      const ratingService:RatingAddDto=
      {
        serviceId: this.serviceId!,
        userId: this.userId!,
        comment: comment1.value,
        rating:parseInt(rate.value),
      };
      this.ratingsService.add(ratingService).subscribe({
        next:()=> 
        {
          this.ratingsService.getRatingByUserAndService(this.serviceId!,this.userId!).subscribe({
            next:(rating)=> {
              this.newRatingId=rating.id;
              this.userName=rating.userName;
              this.comment= comment1.value;
              this.rating=parseInt(rate.value);
              this.ratingDate=rating.date!;
              this.AddingStatus=true;
            },
            error:(error)=> {
              console.error("Calling API failed",error);     
            },
          })
        },
        error:(err)=> {
          console.log("failed",err);
          console.log(ratingService.serviceId+"/"+ratingService.userId+"/"+ratingService.comment+"/"+ratingService.rating+"/");
        },
      });
    }  
  }

   deleteRating() {
    this.ratingsService.delete(this.newRatingId!).subscribe({
      next:()=> {
        this.AddingStatus=false;
      },
      error:(error)=> {
        console.error("Calling API failed ,this id: "+this.newRatingId+"is not found",error);     
      },
    })
    }

}
