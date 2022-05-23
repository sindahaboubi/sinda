import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Artiste } from 'src/app/Class/artiste';
import { Categorie } from 'src/app/Class/categorie';
import { Client } from 'src/app/Class/client';
import { Service } from 'src/app/Class/service';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ClientService } from 'src/app/Services/client.service';
import { ServiceService } from 'src/app/Services/service.service';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  client:Client;
  artiste:Artiste;
  connecte:boolean;

  tabService:Service[]=[];
  tabServiceFiltre:Service[]=[];
  id_artiste :String;
  categories:Categorie[]=[];
  artistes:Artiste[]=[];
  
  @Input()service:Service;

  constructor(public dialog: MatDialog, private clientService:ClientService,private artisteService:ArtisteService,
    private serviceSer:ServiceService) { }

  ngOnInit(): void {
    this.serviceSer.getCategories().subscribe(categorie =>{
      for(let i=0;i<categorie['data'].length;i++){
        this.categories.push(new Categorie((Number)(categorie['data'][i].id),categorie['data'][i].libelle));
      }
    })
    
    if(sessionStorage.hasOwnProperty('idClient')) {
      this.clientService.getClientById(Number(sessionStorage.getItem('idClient'))).subscribe(data =>{this.client=new Client((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatclient,data['data'].image);console.log(data)});
    }
    if(sessionStorage.hasOwnProperty('idArtiste')) {
      this.artisteService.getArtisteById(Number(sessionStorage.getItem('idArtiste'))).subscribe(data => this.artiste=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image));
    }
    this.connecte=sessionStorage.length!=0;


    this.id_artiste = sessionStorage.getItem('idArtiste');
    if(sessionStorage.getItem('idArtiste')!=null){
      this.afficherServices(Number(sessionStorage.getItem('idArtiste')));
    }
    else
    this.afficherServices();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthentificationComponent,{
      width: '700px',
      height:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogInsc(){
    const dialogRef = this.dialog.open(InscriptionComponent,{
      width: '800px',
      height:'600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  afficherServices(id:number=null){
    if(id!=null){
     this.serviceSer.getServices().subscribe( services => {
       for(let i=0;i<services['data'].length;i++){
         this.tabService.push(new Service(services['data'][i].image,(Number)(services['data'][i].id),(Number)(services['data'][i].idartiste),services['data'][i].description,(Number)(services['data'][i].prix),services['data'][i].titre,new Date(services['data'][i].datecreation),services['data'][i].etatservice,(Number)(services['data'][i].idcategorie)));
       }
       this.tabService=this.tabService.filter(service => service.idArtiste==id);
       this.tabServiceFiltre=this.tabService;
       })
    }else
    this.serviceSer.getServices().subscribe( services => {
     for(let i=0;i<services['data'].length;i++){
       let s=new Service(services['data'][i].image,(Number)(services['data'][i].id),(Number)(services['data'][i].idartiste),services['data'][i].description,(Number)(services['data'][i].prix),services['data'][i].titre,new Date(services['data'][i].datecreation),services['data'][i].etatservice,(Number)(services['data'][i].idcategorie))
       this.tabService.push(s);
       this.tabServiceFiltre.push(s);
     }
    })
     }
  
}
