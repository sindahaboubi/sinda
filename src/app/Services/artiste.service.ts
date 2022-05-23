import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artiste } from '../Class/artiste';
import { Commande } from '../Class/commande';

const URL= environment.baseURL;

const URL1 = 'http://localhost:3000/artistes'
@Injectable({
  providedIn: 'root'
})
export class ArtisteService {
  authURL = environment.baseURL+"authentificationArt.php";
  
  constructor(private http:HttpClient) { }

  getArtisteById(id:number){
    let payload=new HttpParams();
    payload=payload.append('id',id);
    return this.http.post(URL+'getArtisteById.php',payload);
  }
  public authentification(login:string,pwd:string){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('email',login);
    payLoad=payLoad.append("pwd",pwd);
    return this.http.post(URL+"authentificationArt.php",payLoad);
  }
  public inscription(c:Artiste){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('image',c.image);
    payLoad=payLoad.append('nom',c.nom);
    payLoad=payLoad.append('prenom',c.prenom);
    payLoad=payLoad.append('genre',c.genre);
    payLoad=payLoad.append('mail',c.email);
    payLoad=payLoad.append('etat',c.etat);
    payLoad=payLoad.append('pwd',c.password);
    payLoad=payLoad.append('choix',"artiste");
    return this.http.post(URL+"inscription.php",payLoad);
  }

  getCommandesById(id: number){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('id',id);
    return this.http.post(URL+"getCommandeById.php",payLoad);
  }

  putArtiste(data:Artiste, id:number)
  {
    let payload=new HttpParams();
    payload=payload.append("id",id)
    payload=payload.append("nom",data.nom)
    payload=payload.append("prenom",data.prenom)
    payload=payload.append("email",data.email)
    payload=payload.append("password",data.password)
    payload=payload.append("genre",data.genre)
    return this.http.put(URL+"putArtiste.php",payload)
  }

}
