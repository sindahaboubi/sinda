import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/Services/client.service';
import { ArtisteService } from 'src/app/Services/artiste.service';
import { Client } from 'src/app/Class/client';
import { Artiste } from 'src/app/Class/artiste';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  formInscri:FormGroup;

  constructor(public serviceArtiste:ArtisteService,public serviceClient:ClientService,public dialogRef: MatDialogRef<InscriptionComponent>,public fb:FormBuilder) { }
  ngOnInit(): void {
    this.formInscri=this.fb.group({
      nom:[],
      prenom:[],
      email:[],
      password:[],
      dateNaissance:[],
      genre:[],
      etat:[],
      image:[],
      type:[]
  });
  }
  onSubmit(){
    if(this.formInscri.get("type").value=="client"){
      var c:Client=new Client(0,this.formInscri.get('email').value,this.formInscri.get('password').value,this.formInscri.get('nom').value,this.formInscri.get('prenom').value,this.formInscri.get('dateNaissance').value,this.formInscri.get('genre').value,false,this.formInscri.get('image').value);
      this.serviceClient.inscription(c).subscribe(res =>console.log(res));
      console.log(this.formInscri.value);
    }else
    {
      var a:Artiste=new Artiste(0,this.formInscri.get('email').value,this.formInscri.get('password').value,this.formInscri.get('nom').value,this.formInscri.get('prenom').value,this.formInscri.get('dateNaissance').value,this.formInscri.get('genre').value,false,this.formInscri.get('image').value);
      this.serviceArtiste.inscription(a).subscribe(res =>console.log(res));
      console.log(this.formInscri.value);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  get email() {
    return this.formInscri.controls["email"];
  }
  get password() {
    return this.formInscri.controls["password"];
  }
  get nom() {
    return this.formInscri.controls["nom"];
  }
  get prenom() {
    return this.formInscri.controls["prenom"];
  }
  get dateNaissance(){
    return this.formInscri.controls["dateNaissance"];
  }
  get genre() {
    return this.formInscri.controls["genre"];
  }
  get type() {
    return this.formInscri.controls["type"];
  }
  get image() {
    return this.formInscri.controls["image"];
  }
}
