import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from 'src/app/Class/categorie';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.css']
})
export class CardServiceComponent implements OnInit {
  constructor(private serviceSer:ServiceService) { }
  categories:Categorie[]=[];
  @Input()service:Service;
  ngOnInit(): void {
    this.serviceSer.getCategories().subscribe(categorie =>{
      for(let i=0;i<categorie['data'].length;i++){
        this.categories.push(new Categorie((Number)(categorie['data'][i].id),categorie['data'][i].libelle));
      }
    })
  }

}
