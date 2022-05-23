import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/Class/categorie';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';

@Component({
  selector: 'app-modifier-service',
  templateUrl: './modifier-service.component.html',
  styleUrls: ['./modifier-service.component.css']
})
export class ModifierServiceComponent implements OnInit {
  @Input() id:number
  s:Service;
  modifForm:FormGroup;
  categories:Categorie[]=[];
  constructor(private router:Router,private serviceService:ServiceService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.serviceService.getServiceById(this.id).subscribe(services=>{    
    this.s=new Service(services['data'].image,(Number)(services['data'].id),(Number)(services['data'].idartiste),services['data'].description,(Number)(services['data'].prix),services['data'].titre,new Date(services['data'].datecreation),services['data'].etatservice,(Number)(services['data'].idcategorie))
    this.modifForm = this.fb.group({
    idArtiste:[this.s.idArtiste],
    description:[this.s.description],
    prix:[this.s.prix],
    titre:[this.s.titre],
    dateCrea:[this.s.dateCrea],
    etat:[this.s.etat],
    cat:[this.s.cat],
    image:[this.s.image],
    });
    this.serviceService.getCategories().subscribe(categorie =>{
      for(let i=0;i<categorie['data'].length;i++){
        this.categories.push(new Categorie((Number)(categorie['data'][i].id),categorie['data'][i].libelle));
      }
    }
    )
  });

  }

  get description() {
    return this.modifForm.get('description');
  }
  get prix() {
    return this.modifForm.get('prix');
  }
  get titre() {
    return this.modifForm.get('titre');
  }
  get dateCrea() {
    return this.modifForm.get('dateCrea');
  }
  get etat() {
    return this.modifForm.get('etat');
  }
  get cat() {
    return this.modifForm.get('cat');
  }
  get image() {
    return this.modifForm.get('image');
  }
  get hauteur() {
    return this.modifForm.get('hauteur');
  }
  get largeur() {
    return this.modifForm.get('largeur');
  }

  onSubmit(){
    this.serviceService.updateService(this.modifForm.value,this.id).subscribe();
    this.router.navigate(['/liste']);
  
  }
}
