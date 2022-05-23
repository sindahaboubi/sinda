import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorie } from '../Class/categorie';
import { Commande } from '../Class/commande';
import { Commentaire } from '../Class/commentaire';
import { Facture } from '../Class/facture';
import { Service } from '../Class/service';
import { SignalementC } from '../Class/signalement-c';
import { SignalementS } from '../Class/signalementS';

const URL = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  servicesURL=environment.baseURL+"getServices.php";
  serviceURL=environment.baseURL+"getServiceById.php";
  categoriesURL=environment.baseURL+"getCategories.php";
  commentaireURL=environment.baseURL+"getCommentaires.php";
  addCommURL=environment.baseURL+"addCommentaires.php";
  getCommandeURL=environment.baseURL+"commanderId.php"
  constructor(private http: HttpClient) { }
  getServices(){
    return this.http.get(this.servicesURL);
  }
  
  getServiceById(id: number){
    let payload=new HttpParams();
    payload=payload.append("id",id);
    return this.http.post(this.serviceURL,payload);
  } 

  getCategories(){
    return this.http.get(this.categoriesURL);
  }
  getCommentairesById(){
    return this.http.get(this.commentaireURL);
  }
  addComm(c:Commentaire){
    let payload=new HttpParams();
    payload=payload.append("idClient",c.idClient);
    payload=payload.append("idService",c.idService);
    payload=payload.append("description",c.description);
    return this.http.post(this.addCommURL,payload);
  }

deleteComm(id:number){
    let payLoad=new HttpParams();
    payLoad=payLoad.append("id",id);
    return this.http.post(URL+"deleteCommentaire.php",payLoad);
  }
  updateComm(id:number, c:Commentaire)
  {
    let payLoad=new HttpParams();
    payLoad=payLoad.append("id",id);
    payLoad=payLoad.append("description",c.description);
    payLoad=payLoad.append("idclient",c.idClient);
    payLoad=payLoad.append("idservice",c.idService);

    return this.http.post<Commentaire>(URL+"updateCommentaire.php",payLoad);
  }
addSignalementService(s:SignalementS){
  let payLoad=new HttpParams();
  payLoad=payLoad.append("idService",s.idService);
  payLoad=payLoad.append("idClient",s.idClient);
  payLoad=payLoad.append("description",s.description);
  return this.http.post<SignalementS>(URL+"signalerService.php",payLoad);
  }

  addSignalementCommentaire(s:SignalementC){
    let payLoad=new HttpParams();
    payLoad=payLoad.append("idCommentaire",s.idCommentaire);
    payLoad=payLoad.append("idClient",s.idClient);
    payLoad=payLoad.append("description",s.description);
    return this.http.post<SignalementC>(URL+"signalerCommentaire.php",payLoad);
    }
    /*getProduct(id:number) {
      return this.http.get(`${URL}/${productId}`)
    }*/
addCommande(com:Commande){
  let payLoad=new HttpParams();
  payLoad=payLoad.append("idClient",com.idClient);
  payLoad=payLoad.append("idService",com.idService);
  payLoad=payLoad.append("description",com.description);
  return this.http.post(URL+"addCommande.php",payLoad);

}
    // addCommande(cmd:Commande):Observable<Commande>{
    //   return this.http.post<Commande>(URL,cmd);
    // }

    getCommandeById(id:number){
      let httParams = new HttpParams();
      httParams =  httParams.append("id",id);
      return this.http.post(this.getCommandeURL,httParams);
    }

addFacture(fact:Facture,id:number,idService:number){
  console.log(fact.idCommande);
  let payLoad=new HttpParams();
    payLoad=payLoad.append("idCommande",fact.idCommande);
    payLoad=payLoad.append("idUser",id);
    payLoad=payLoad.append("idService",idService);
    return this.http.post(URL+"addFacture.php",payLoad);
}
    // addFacture(fact:Facture):Observable<Facture>{
    //   return this.http.post<Facture>(URL6,fact);
    // }
    addService(s:Service){
      let payLoad = new HttpParams();
      payLoad = payLoad.append("idartiste",s.idArtiste);
      payLoad = payLoad.append("description",s.description);
      payLoad = payLoad.append("prix",s.prix);
      payLoad = payLoad.append("titre",s.titre);
      payLoad = payLoad.append("datecreation",s.dateCrea.toString());
      payLoad = payLoad.append("etatservice",s.etat);
      payLoad = payLoad.append("idcategorie",s.cat);
      payLoad = payLoad.append("image",s.image);
      return this.http.post(URL+"addService.php",payLoad);
    }
  
    updateService(s:Service,id:number){
      let payLoad=new HttpParams();
      payLoad=payLoad.append("id",id);
      payLoad=payLoad.append("idartiste",s.idArtiste);
      payLoad=payLoad.append("description",s.description);
      payLoad = payLoad.append("prix",s.prix);
      payLoad = payLoad.append("titre",s.titre);
      payLoad = payLoad.append("datecreation",s.dateCrea.toString());
      payLoad = payLoad.append("etatservice",s.etat);
      payLoad = payLoad.append("idcategorie",s.cat);
      payLoad = payLoad.append("image",s.image);
      return this.http.post(URL+"updateService.php",payLoad);
    }
  
    deleteService(id:number){
      let payLoad=new HttpParams();
      payLoad=payLoad.append("id",id);
      return this.http.post(URL+"deleteService.php",payLoad);
    }
  
}
