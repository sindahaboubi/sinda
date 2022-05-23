import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/Class/client';
import { Commentaire } from 'src/app/Class/commentaire';
import { Service } from 'src/app/Class/service';
import { ClientService } from 'src/app/Services/client.service';
import { SignalementS } from 'src/app/Class/signalementS';
import { ServiceService } from 'src/app/Services/service.service';
import { CommanderComponent } from '../commander/commander.component';
import { Commande } from 'src/app/Class/commande';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { Artiste } from 'src/app/Class/artiste';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthentificationComponent } from '../authentification/authentification.component';
import { SignalementC } from 'src/app/Class/signalement-c';

export interface DialogData {
  service:Service
  client:Client
  artiste:Artiste
} 

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})


export class ServiceComponent implements OnInit {

  constructor(public dialog2: MatDialog,
              public router: Router,
              public dialog: MatDialog,
              private serviceSer:ServiceService,
              private activatedRouter:ActivatedRoute,
              private fs:FormBuilder,
              private clientservice:ClientService,
              private artisteservice:ArtisteService) { }

  connecte:boolean;
  idArt:number=Number(sessionStorage.getItem('idArtiste'));//id de l'artiste connecté 
  client_comm:Client[]=[];
  idc:number=Number(sessionStorage.getItem('idClient'));
  commentaires:Commentaire[]=[];
  idcomm: number; //pour la modification du commentaire
  sig=true;
  sig2=true;
  mod=true;
  type: string;
  id:number=this.activatedRouter.snapshot.params['id'];
  auth_client:Client;
  currentProduit:Service;
  currentCommande:Commande;
  art:Artiste;
  ngOnInit(): void {
    this.serviceSer.getServiceById(this.id).subscribe
    (services => 
      {
      this.currentProduit=new Service(services['data'].image,(Number)(services['data'].id),(Number)(services['data'].idartiste),services['data'].description,(Number)(services['data'].prix),services['data'].titre,new Date(services['data'].datecreation),services['data'].etatservice,(Number)(services['data'].idcategorie)) as Service
      this.artisteservice.getArtisteById(this.currentProduit.idArtiste).subscribe(data => {this.art=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image)})
    }
    );
    this.clientservice.getClientById(this.idc).subscribe(
      data => this.auth_client=new Client((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatclient,data['data'].image)
    );
    this.serviceSer.getCommentairesById().subscribe(commentaire=>{
      if(commentaire['data']!="Commentaire not found")
      {
      for(let i=0;i<commentaire['data'].length;i++){
        this.commentaires.push(new Commentaire((Number)(commentaire['data'][i].id),(Number)(commentaire['data'][i].idclient),(Number)(commentaire['data'][i].idservice),commentaire['data'][i].description));
      }
      this.commentaires=this.commentaires.filter(commentaire=>commentaire.idService=(Number)(this.id));
      for(var i=0;i<this.commentaires.length;i++){
        this.clientservice.getClientById(this.commentaires[i].idClient).subscribe(
          data2 =>{
            let client=new Client((Number)(data2['data'].id),data2['data'].email,data2['data'].password,data2['data'].nom,data2['data'].prenom,new Date(data2['data'].datenaissance),data2['data'].genre,data2['data'].etatclient,data2['data'].image)
            this.client_comm.push(client);
          }
        )
      }
    }
    }
    );
    this.connecte=sessionStorage.hasOwnProperty('idArtiste');
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CommanderComponent,{
      width: '540px',
      height:'690px',
      data: {service:this.currentProduit,
             client:this.auth_client ,
             artiste:this.art
      }});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAuth() {
    const dialogRef = this.dialog2.open(AuthentificationComponent,{
      width: '400px',
      height:'400px'
    });
  }
  onSubmit(ch:string){
    let comm=new Commentaire(0,this.idc,this.id,ch);//Id Client a modifié avec l'authentification && Id Commentaire auto increment dans la bdd
    this.serviceSer.addComm(comm).subscribe(()=>{this.commentaires.push(comm)
    this.client_comm.push(this.auth_client);
    }
    );
  }
  supprimerComm(idc:number){
    this.serviceSer.deleteComm(idc).subscribe(data=> {this.commentaires= this.commentaires.filter(l=>l.id !=idc);console.log(data['data']);}
    );
  }
  opendcomm(idcommentaire:number){
    if(this.mod){
    this.mod=false;
    this.idcomm=idcommentaire;
  }
    else this.mod=true;
  }
  opensig(idc:number,type:string){
    if(type=="commentaire"){
      if(this.sig2){
        this.sig2=false;
        this.idcomm=idc;
        this.type=type;
      }
    else this.sig2=true;
    }else
    {
      if(this.sig){
        this.sig=false;
        this.type=type;
      }
    else this.sig=true;
    }
}
  modifierComm(ch:string){
    var c :Commentaire=new Commentaire(this.idcomm,this.idc,this.id,ch);
    this.serviceSer.updateComm(this.idcomm,c).subscribe(commentaire => {
      if(commentaire["data"]!="Fail")
      {
        let position = this.commentaires.findIndex(com=>com.id == c.id);
        this.commentaires[position]=c;
        this.mod=true;
      }
    });      this.mod=true;
  }
  verifSignal:boolean=false;
  verifSignalS:boolean=false;
  signaler(ch:string){
    if(this.type=="commentaire")
    {
      this.serviceSer.addSignalementCommentaire(new SignalementC(0,this.idc,this.idcomm,ch)).subscribe(data=>{if(data["data"]!="Fail") this.verifSignal=true;});
    }
  else 
  this.serviceSer.addSignalementService(new SignalementS(0,this.idc,this.id,ch)).subscribe(data=>{if(data["data"]!="Fail") this.verifSignalS=true;});
  this.sig=true;
  this.sig2=true;
  if(this.verifSignal)
  {
    document.getElementById("signaleC").innerHTML="Signal est terminé avec succes";
    document.getElementById("signaleC").classList.add("alert-success");
  }
  else
  {
    document.getElementById("signaleC").innerHTML="Erreur de signalement";
    document.getElementById("signaleC").classList.add("alert-warning");
  }

  if(this.verifSignalS)
  {
    document.getElementById("signaleS").innerHTML="Signal est terminé avec succes";
    document.getElementById("signaleS").classList.add("alert-success");
  }
  else
  {
    document.getElementById("signaleS").innerHTML="Erreur de signalement";
    document.getElementById("signaleS").classList.add("alert-warning");
  }
}
//Artiste:
hide=true;
modifier(){
  document.getElementsByClassName("main-section")[0].classList.add("col-6");
  document.getElementsByClassName("main-section")[0].classList.remove("main-section","col-lg-8");
  this.hide=false;
}
supprimer(){
  this.serviceSer.deleteService(this.id).subscribe(data=>{
    if(data["data"]!="Fail")
    this.router.navigate(['/liste']);
  });
}

// function ngOnChanges() {
//   throw new Error('Function not implemented.');
  
// }
}