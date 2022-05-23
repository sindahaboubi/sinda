import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-rechercher',
  templateUrl: './rechercher.component.html',
  styleUrls: ['./rechercher.component.css']
})
export class RechercherComponent implements OnInit {
  titre :any;
  services:any;
  constructor(private serviceservice:ServiceService) { }

  ngOnInit(): void {
    this.serviceservice.getServices().subscribe(
      services=>{
        for(let i=0;i<services['data'].length;i++){
          let s=new Service(services['data'][i].image,services['data'][i].id,services['data'][i].idartiste,services['data'][i].description,services['data'][i].prix,services['data'][i].titre,services['data'][i].datecreation,services['data'][i].etatservice,services['data'][i].idcategorie)
          this.services.push(s);
        }
      }
    )
  }

  search(){
    return this.services.filter(serv => {
      return serv.titre?.toLocaleLowerCase().match(this.titre?.toLocaleLowerCase())      
    });
   }
}
