import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ListeServicesComponent } from './Components/liste-services/liste-services.component';
import {HttpClientModule} from "@angular/common/http";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './Components/index/index.component';
import { ErrorComponent } from './Components/error/error.component';
import {MatMenuModule} from '@angular/material/menu';
import {ArtisteComponent} from './Components/artiste/artiste.component';
import {CommandesComponent} from './Components/artiste/commandes/commandes.component';
import { CommanderComponent } from './Components/commander/commander.component';
import { ServiceComponent } from './Components/service/service.component';
import {MatDialogModule} from '@angular/material/dialog';
import { RechercherComponent } from './Components/rechercher/rechercher.component';
import { CardServiceComponent } from './Components/card-service/card-service.component';
import { ClientComponent } from './Components/client/client.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ModifierServiceComponent } from './Components/modifier-service/modifier-service.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import { PosterServiceComponent } from './Components/poster-service/poster-service.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AboutComponent } from './Components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListeServicesComponent,
    ArtisteComponent,
    CommandesComponent,
    IndexComponent,
    ErrorComponent,
    CardServiceComponent,
    CommanderComponent,
    ServiceComponent,
    RechercherComponent,
    ClientComponent,
    AuthentificationComponent,
    ModifierServiceComponent,
    InscriptionComponent,
    PosterServiceComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMenuModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
