import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artiste } from 'src/app/Class/artiste';
import { Commande } from 'src/app/Class/commande';
import { ArtisteService } from 'src/app/Services/artiste.service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  constructor(private artisteSer:ArtisteService, private activatedRouter:ActivatedRoute) { } 
  id:number=this.activatedRouter.snapshot.params['id'];
  currentArtiste:Artiste;
  commandes:Commande[]=[];


  ngOnInit(): void {
    console.log(this.id);
    this.artisteSer.getArtisteById(this.id).subscribe(data => {data => this.currentArtiste=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image)})
    this.artisteSer.getCommandesById(this.id).subscribe(data=> {
      console.log(data['data']);
      for(let i=0;i<data['data'].length;i++){
      this.commandes.push(new Commande((Number)(data['data'][i].id),(Number)(data['data'][i].idartiste),(Number)(data['data'][i].idclient),(Number) (data['data'][i].idservice),data['data'][i].description,new Date(data['data'][i].datecommande)));
  } console.log(this.commandes)});
    
  }
}