import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/Class/client';
import { ClientService } from 'src/app/Services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  formValue : FormGroup; 
  
  clientObj: Client
  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;

  constructor(private clientService:ClientService, private activatedRouter:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder) { }

  id:number=this.activatedRouter.snapshot.params['id'];
  public currentClient:Client;

  ngOnInit(): void {
    this.clientService.getClientById(this.id).subscribe
    (data => this.currentClient=new Client((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatclient,data['data'].image));

    this.formValue = this.formBuilder.group({
      nom:[''],
      prenom:[''],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      genre:[]
  })
}

EditClient(data:any){
  this.formValue.controls['nom'].setValue(data.nom);
  this.formValue.controls['prenom'].setValue(data.prenom);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['password'].setValue(data.password);
  this.formValue.controls['genre'].setValue(data.genre);
  this.clientObj.id = data.id;
  this.UpdateShowBtn();
}

UpdateClient(){
  this.clientObj.nom = this.formValue.value.nom;
  this.clientObj.prenom = this.formValue.value.prenom;
  this.clientObj.email = this.formValue.value.email;
  this.clientObj.password = this.formValue.value.password;
  this.clientObj.genre = this.formValue.value.genre;
  this.clientService.putClient(this.clientObj,this.clientObj.id).subscribe(res => {
    alert("Profil modifié avec succés");
    this.SaveShowBtn();
  })
}

UpdateShowBtn()
{
  this.btnUpdateShow = true;
  this.btnSaveShow = false;
}

SaveShowBtn()
{
  this.btnUpdateShow = false;
  this.btnSaveShow = true;
}

get password(){
  return this.formValue.get('password');
}
get email() {
return this.formValue.get('email');
}
get prenom(){
  return this.formValue.get('prenom');
}
get nom(){
  return this.formValue.get('nom');
}

}
