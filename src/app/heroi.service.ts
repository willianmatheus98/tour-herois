import { Injectable } from '@angular/core';
import { HEROIS } from './mock-herois';
import { Heroi } from './heroi';
import { Observable, of } from 'rxjs';
import { MensagemService } from './mensagem.service';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {

  getHerois(): Observable<Heroi[]> {
    this.mensagemService.adicionar('HeroisService: heróis obtidos');
    return of(HEROIS);
  }

  getHeroi(id: number): Observable<Heroi> {
    this.mensagemService.adicionar(`HeroiService: obtido herói com id=${id}`);
    return of(HEROIS.find(heroi => heroi.id === id));
  }

  constructor(private mensagemService: MensagemService) { }
}
