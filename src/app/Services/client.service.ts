import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Class/client';

const URL= environment.baseURL;
const URL1="http://localhost:3000/clients";
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  authURL = environment.baseURL+"authentification.php";
  constructor(private http: HttpClient) { }
  public authentification(login:string,pwd:string){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('email',login);
    payLoad=payLoad.append("pwd",pwd);
    return this.http.post(URL+"authentification.php",payLoad);
  }
  public inscription(c:Client){
    let payLoad=new HttpParams();
    payLoad=payLoad.append('image',c.image);
    payLoad=payLoad.append('date',c.dateNaissance.toString());
    payLoad=payLoad.append('nom',c.nom);
    payLoad=payLoad.append('prenom',c.prenom);
    payLoad=payLoad.append('genre',c.genre);
    payLoad=payLoad.append('mail',c.email);
    payLoad=payLoad.append('etat',c.etat);
    payLoad=payLoad.append('pwd',c.password);
    payLoad=payLoad.append('choix',"client");
    return this.http.post<Client>(URL+"inscription.php",payLoad);
  }

  getClientById(id: number) {
    let payload=new HttpParams();
    payload=payload.append("id",id)
    return this.http.post(URL+"getClientById.php",payload);
  } 

  putClient(data:Client, id:number)
  {
    let payload=new HttpParams();
    payload=payload.append("id",id)
    payload=payload.append("nom",data.nom)
    payload=payload.append("prenom",data.prenom)
    payload=payload.append("email",data.email)
    payload=payload.append("password",data.password)
    payload=payload.append("genre",data.genre)
    return this.http.put(URL+"putClient.php",payload)
  }

}
