import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Artiste } from 'src/app/Class/artiste';
import { ArtisteService } from 'src/app/Services/artiste.service';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.css']
})
export class ArtisteComponent implements OnInit {


  formValue : FormGroup; 
  
  artisteObj: Artiste
  btnUpdateShow:boolean = false;

  btnSaveShow:boolean = true;

  constructor(private artisteService:ArtisteService, private activatedRouter:ActivatedRoute,private router:Router,
    private formBuilder:FormBuilder) { }

  id:number=this.activatedRouter.snapshot.params['id'];
  public currentArtiste:Artiste;

  ngOnInit(): void {
    this.artisteService.getArtisteById(this.id).subscribe
    (data => this.currentArtiste=new Artiste((Number)(data['data'].id),data['data'].email,data['data'].password,data['data'].nom,data['data'].prenom,new Date(data['data'].datenaissance),data['data'].genre,data['data'].etatartiste,data['data'].image));

    this.formValue = this.formBuilder.group({
      nom:[''],
      prenom:[''],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]],
      genre:[]
  })
}

EditArtiste(data:any){
  this.formValue.controls['nom'].setValue(data.nom);
  this.formValue.controls['prenom'].setValue(data.prenom);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['password'].setValue(data.password);
  this.formValue.controls['genre'].setValue(data.genre);
  this.artisteObj.id = data.id;
  this.UpdateShowBtn();
}

UpdateArtiste(){
  this.artisteObj.nom = this.formValue.value.nom;
  this.artisteObj.prenom = this.formValue.value.prenom;
  this.artisteObj.email = this.formValue.value.email;
  this.artisteObj.password = this.formValue.value.password;
  this.artisteObj.genre = this.formValue.value.genre;
  this.artisteService.putArtiste(this.artisteObj,this.artisteObj.id).subscribe(res => {
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
