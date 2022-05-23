import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/Services/service.service';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Categorie } from 'src/app/Class/categorie';

@Component({
  selector: 'app-poster-service',
  templateUrl: './poster-service.component.html',
  styleUrls: ['./poster-service.component.css']
})
export class PosterServiceComponent implements OnInit {

  constructor(private fb: FormBuilder,private serviceService:ServiceService) { }
  date_jour:Date=new Date();
  ajouterService :FormGroup;
  categories:Categorie[]=[];
  ngOnInit(): void {

    this.serviceService.getCategories().subscribe(categorie =>{
      for(let i=0;i<categorie['data'].length;i++){
        this.categories.push(new Categorie((Number)(categorie['data'][i].id),categorie['data'][i].libelle));
      }
    })
    this.ajouterService = this.fb.group({
      titre:["",Validators.required],
      prix:[,Validators.required],
      image :["",Validators.required],
      description:["",Validators.required], 
      cat:[],
      idArtiste:[sessionStorage.getItem('idArtiste')],
      dateCrea:[this.date_jour],
      etat:["dispo"]
    })
  }

  get description() {
    return this.ajouterService.get('description');
  }
  get prix() {
    return this.ajouterService.get('prix');
  }
  get titre() {
    return this.ajouterService.get('titre');
  }
  get cat() {
    return this.ajouterService.get('cat');
  }
  get image() {
    return this.ajouterService.get('image');
  }
  
  onSubmit(){
    this.serviceService.addService(this.ajouterService.value).subscribe(data=>{
      if(data["data"]!="Fail"){
        document.getElementById("result").innerHTML="Service ajouté.";
        document.getElementById("result").classList.add("alert-success");
        this.ajouterService.reset();
      }else{
        document.getElementById("result").innerHTML="Service non ajouté.";
        document.getElementById("result").classList.add("alert-danger");
      }

    })
  }

}
