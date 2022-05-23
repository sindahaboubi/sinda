import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechercherComponent } from './Components/rechercher/rechercher.component';
import { ServiceComponent } from './Components/service/service.component';
import { ErrorComponent } from './Components/error/error.component';
import { IndexComponent } from './Components/index/index.component'; 
import { ListeServicesComponent } from './Components/liste-services/liste-services.component';
import { ClientComponent } from './Components/client/client.component';
import { CommanderComponent } from './Components/commander/commander.component';
import { CommandesComponent } from './Components/artiste/commandes/commandes.component';
import { PosterServiceComponent } from './Components/poster-service/poster-service.component';
import { ArtisteComponent } from './Components/artiste/artiste.component';
import { AboutComponent } from './Components/about/about.component';

const routes: Routes = [
  {path:'index', component:IndexComponent},
  {path:'liste', component:ListeServicesComponent},
  {path:'poster', component:PosterServiceComponent},
  {path:'liste/:id', component:ServiceComponent},
  {path:'poster', component:PosterServiceComponent},
  {path:'client/:id', component:ClientComponent},
  {path:'artiste/:id', component:ArtisteComponent},
  {path:'service',component:ServiceComponent},
  {path:'about',component:AboutComponent},
  {path:'search',component:RechercherComponent},
  {path:'commander', component:CommanderComponent},
  {path:'liste/:id/commandes', component:CommandesComponent},
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'**', component:ErrorComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
