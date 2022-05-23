import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artiste } from 'src/app/Class/artiste';
import { Commande } from 'src/app/Class/commande';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { ServiceService } from 'src/app/Services/service.service';
import { DialogData } from '../service/service.component';
@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.css']
})
export class CommanderComponent implements OnInit {
  art:Artiste;
  constructor(public dialogRef: MatDialogRef<CommanderComponent>,
              @Inject(MAT_DIALOG_DATA)public data: DialogData,
              private serviceS:ServiceService,
              private fb:FormBuilder) { }
  commandeForm:FormGroup;
  facture:FormGroup;
  date_jour:Date=new Date();
  ngOnInit(): void {
    console.log(this.data.artiste)
    this.commandeForm = this.fb.group({
      idClient:[this.data.client.id],
      idService:[this.data.service.id],
      description:[""],
      dateCommande:[this.date_jour]
    });
    this.facture = this.fb.group({
      idCommande:[]
    });
  }
  verifCommande:boolean = false;
  verifFacture:boolean = false;
  commander(){
      this.serviceS.addCommande(this.commandeForm.value).subscribe(
        data=>{
          if(data["data"]!=null) 
          {
            this.verifCommande = true;
            this.facture = this.fb.group({
              idCommande:[data["data"]]
            });
            this.serviceS.addFacture(this.facture.value,this.data.client.id,this.data.service.id).subscribe(
              facture =>{if(facture["data"]!="Fail") this.verifFacture= true;}
            )
           
          }
          if(this.verifCommande)
          {
            document.getElementById("resultat").innerHTML="Votre commande est envoyée avec succes";
            if(this.verifFacture)
            document.getElementById("resultat").innerHTML="Votre commande et facture sont envoyées avec succes.";
            document.getElementById("close").innerHTML="Fermer";
          }
          else
          {
            document.getElementById("resultat").innerHTML="Votre commande n'a pas ete envoyée.";
          }
        }
      )
      
    // this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
