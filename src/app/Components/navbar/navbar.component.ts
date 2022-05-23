import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Artiste } from 'src/app/Class/artiste';
import { Client } from 'src/app/Class/client';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ClientService } from 'src/app/Services/client.service';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { InscriptionComponent } from '../inscription/inscription.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  client:Client;
  artiste:Artiste;
  connecte:boolean;

  constructor(public dialog: MatDialog,private clientService:ClientService,private artisteService:ArtisteService) { }
  ngOnInit(): void {
    if(sessionStorage.hasOwnProperty('idClient')) {
      this.clientService.getClientById(Number(sessionStorage.getItem('idClient'))).subscribe(data =>{this.client=new Client((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatclient,data['data'].image);console.log(data)});
    }
    if(sessionStorage.hasOwnProperty('idArtiste')) {
      this.artisteService.getArtisteById(Number(sessionStorage.getItem('idArtiste'))).subscribe(data => this.artiste=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image));
    }
    this.connecte=sessionStorage.length!=0;
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
  logout(){
    sessionStorage.clear();
    this.client=null;
    this.artiste=null;
    window.location.reload();
  }
}
