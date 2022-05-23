import { Component, OnInit } from '@angular/core';
import { Artiste } from 'src/app/Class/artiste';
import { Client } from 'src/app/Class/client';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private clientService:ClientService,private artisteService:ArtisteService) { }

  client:Client;
  artiste:Artiste;
  connecte:boolean;

  ngOnInit(): void {
    if(sessionStorage.hasOwnProperty('idClient')) {
      this.clientService.getClientById(Number(sessionStorage.getItem('idClient'))).subscribe(data =>{this.client=new Client((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatclient,data['data'].image);console.log(data)});
    }
    if(sessionStorage.hasOwnProperty('idArtiste')) {
      this.artisteService.getArtisteById(Number(sessionStorage.getItem('idArtiste'))).subscribe(data => this.artiste=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image));
    }
    this.connecte=sessionStorage.length!=0;
  }

}
