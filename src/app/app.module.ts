import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroisComponent } from './herois/herois.component';

import { FormsModule } from '@angular/forms';
import { HeroiDetalheComponent } from './heroi-detalhe/heroi-detalhe.component';
import { MensagensComponent } from './mensagens/mensagens.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroisComponent,
    HeroiDetalheComponent,
    MensagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
