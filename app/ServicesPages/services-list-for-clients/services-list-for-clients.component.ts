import { Component, OnInit } from '@angular/core';
import { ServicesOfKhadamatiService } from '../../services/services-of-khadamati.service';
import { Router } from '@angular/router';
import { GetAllServicesDetailsDTO } from 'src/app/Types/services/GetAllServicesDetailsDTO';
import { LocationsListService } from 'src/app/services/locations-list.service';
import { categoryService } from 'src/app/services/category.service';
import { CategoryReadDTO } from 'src/app/Types/category/CategoryReadDTO';

@Component({
  selector: 'app-services-list-for-clients',
  templateUrl: './services-list-for-clients.component.html',
  styleUrls: ['./services-list-for-clients.component.css']
})
export class ServicesListForClientsComponent implements OnInit {
  categories?: CategoryReadDTO[];
  services?: GetAllServicesDetailsDTO[];
  totalRatings: number = 0;
  currentPage: number = 1;
  sizeOfPage: number = 8;
  paginatedServices: GetAllServicesDetailsDTO[] = [];
  Cat = "-Select-";
  Loc = "-Select-";
  constructor(private servicesOfKhadamatiService: ServicesOfKhadamatiService
    , private router: Router, public locations: LocationsListService, private categorie: categoryService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.Filter();
    this.categorie.getAll().subscribe({
      next: (list) => {
        this.categories = list
      },
      error: (error) => {
      }
    })
  }

  Filter() {
    const paramsString = window.location.href.split('?');
    const searchParams = new URLSearchParams(paramsString[1]);
    if (searchParams.has("Location") || searchParams.has("Category")) {
      if (searchParams.has("Category")) { this.Cat = searchParams.get("Category")!; }
      if (searchParams.has("Location")) { this.Loc = searchParams.get("Location")!; }

      this.servicesOfKhadamatiService.getSearch(this.Loc, this.Cat).subscribe({
        next: (services) => {
          this.services = services.filter(service => service.approved)
          for (let i = 0; i < services.length; i++) {
            if (services[i].ratings?.length !== 0) {
              let sum = 0;
              for (let j = 0; j < services[i].ratings?.length!; j++) {
                sum += services[i].ratings![j].rating;
              }
              services[i].rating = sum / services[i].ratings?.length!;
            }
            else {
              services[i].rating = 0;
            }
          }
        },
        error: (error) => {
        },
      });
    }
    else {
      this.servicesOfKhadamatiService.getAllDetails().subscribe({
        next: (services) => {
          this.services = services.filter(service => service.approved)
          for (let i = 0; i < services.length; i++) {
            if (services[i].ratings?.length !== 0) {
              let sum = 0;
              for (let j = 0; j < services[i].ratings?.length!; j++) {
                sum += services[i].ratings![j].rating;
              }
              services[i].rating = sum / services[i].ratings?.length!;
            }
            else {
              services[i].rating = 0;
            }
          }
        },
        error: (error) => {
        },
      });
    }
  }

  GetData(paginatedData: any[]) {
    this.paginatedServices = paginatedData;
  }

  search(location: string, category: string): void {
    if (location == "-Select-") {
      location = "empty";
    }
    if (category == "-Select-") {
      category = "empty";
    }

    this.router.navigateByUrl("/?Location=" + location + "&Category=" + category);
    this.Filter();
  }

  Details(id: number) {
    this.router.navigateByUrl("/service/" + id);
  }

}
