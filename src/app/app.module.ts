import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroisComponent } from './herois/herois.component';

import { FormsModule } from '@angular/forms';
import { HeroiDetalheComponent } from './heroi-detalhe/heroi-detalhe.component';
import { MensagensComponent } from './mensagens/mensagens.component';
import { PainelComponent } from './painel/painel.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroiBuscaComponent } from './heroi-busca/heroi-busca.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroisComponent,
    HeroiDetalheComponent,
    MensagensComponent,
    PainelComponent,
    HeroiBuscaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientInMemoryWebApiModule,
    HttpClientModule,
    // O módulo HttpClientInMemoryWebApiModule intercepta requisições HTTP
    // e retorna respostas de servidor simuladas.
    // Remova-o quando um servidor real estiver pronto para receber requisições.
    HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
