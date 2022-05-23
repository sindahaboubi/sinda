import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Class/service';
import { ServiceService } from 'src/app/Services/service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Categorie } from 'src/app/Class/categorie';
import { Artiste } from 'src/app/Class/artiste';
@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent implements OnInit {
  tabService:Service[]=[];
  tabServiceFiltre:Service[]=[];
  tab:Service[];
  FormTri:FormGroup;
  categories:Categorie[]=[];
  id_artiste :String;
  constructor(private serviceSer:ServiceService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.id_artiste = sessionStorage.getItem('idArtiste');
    if(sessionStorage.getItem('idArtiste')!=null){
      this.afficherServices(Number(sessionStorage.getItem('idArtiste')));
    }
    else
    this.afficherServices();

    this.serviceSer.getCategories().subscribe(categorie =>{
      for(let i=0;i<categorie['data'].length;i++){
        this.categories.push(new Categorie((Number)(categorie['data'][i].id),categorie['data'][i].libelle));
      }
    })
    this.FormTri=this.formBuilder.group({
      categorie:[],
      prixMax:[0],
      prixMin:[0],
      choix:[]
    });
    this.FormTri.reset();

  }

  onSubmit()
  {
    if(this.FormTri.value['categorie']!=null){
      var cat=this.FormTri.value['categorie'];
      this.tabServiceFiltre=this.tabService.filter(service =>service.cat==this.FormTri.value['categorie']);
    }
    if(this.FormTri.value['prixMax']!=null){
      this.tabServiceFiltre=this.tabService.filter(service =>service.prix<=this.FormTri.value['prixMax']);
    }
    if(this.FormTri.value['prixMin']!=null){
      this.tabServiceFiltre=this.tabService.filter(service =>service.prix>=this.FormTri.value['prixMin']);
    }
    
    if(this.FormTri.value['choix']==1){
      this.tabServiceFiltre=this.tabService;
    }

    this.FormTri.reset();
    this.FormTri.value['categorie']=cat;
  }

  afficherServices(id:number=null){
     if(id!=null){
      this.serviceSer.getServices().subscribe( services => {
        for(let i=0;i<services['data'].length;i++){
          this.tabService.push(new Service(services['data'][i].image,(Number)(services['data'][i].id),(Number)(services['data'][i].idartiste),services['data'][i].description,(Number)(services['data'][i].prix),services['data'][i].titre,new Date(services['data'][i].datecreation),services['data'][i].etatservice,(Number)(services['data'][i].idcategorie)));
        }
        this.tabService=this.tabService.filter(service => service.idArtiste==id);
        this.tabServiceFiltre=this.tabService;
        })
     }else
     this.serviceSer.getServices().subscribe( services => {
      for(let i=0;i<services['data'].length;i++){
        let s=new Service(services['data'][i].image,(Number)(services['data'][i].id),(Number)(services['data'][i].idartiste),services['data'][i].description,(Number)(services['data'][i].prix),services['data'][i].titre,new Date(services['data'][i].datecreation),services['data'][i].etatservice,(Number)(services['data'][i].idcategorie))
        this.tabService.push(s);
        this.tabServiceFiltre.push(s);
      }
     })
      }
}
