import { Injectable } from '@angular/core';
import { HEROIS } from './mock-herois';
import { Heroi } from './heroi';
import { Observable, of } from 'rxjs';
import { MensagemService } from './mensagem.service';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {
  private heroisUrl = 'api/herois';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** Obtém (GET) heróis do servidor */
  getHerois(): Observable<Heroi[]> {
    return this.http.get<Heroi[]>(this.heroisUrl)
      .pipe(
        tap(_ => this.log('heróis obtidos')),
        catchError(this.trataErro('getHerois', []))
      )
  }



  /** Obtem (GET) um herói pelo seu id. Gera erro 404 se não for encontrado */
  getHeroi(id: number): Observable<Heroi> {
    const url = `${this.heroisUrl}/${id}`;
    return this.http.get<Heroi>(url).pipe(
      tap(_ => this.log(`obtido o herói id=${id}`)),
      catchError(this.trataErro<Heroi>(`getHeroi id=${id}`))
    );
  }

  /** PUT: atualiza o herói no servidor */
  atualizaHeroi(heroi: Heroi): Observable<any> {
    return this.http.put(this.heroisUrl, heroi, this.httpOptions).pipe(
      tap(_ => this.log(`atualizado o id do herói=${heroi.id}`)),
      catchError(this.trataErro<any>('atualizaHeroi'))
    );
  }


  constructor(private mensagemService: MensagemService,
    private http: HttpClient) { }

  /** Fazendo log uma mensagem de HeroiService com MensagemService */
  private log(mensagem: string) {
    this.mensagemService.adicionar(`HeroiService: ${mensagem}`);
  }
  /**
   * Trata uma operação Http que falhou.
   * Permite que a aplicação continue.
   * @param operacao - nome da operação que falhou
   * @param resultado - valor opcional para retornar como o resultado observable
   */
  private trataErro<T>(operacao = 'operação', resultado?: T) {
    return (erro: any): Observable<T> => {
      // TODO: enviar o erro para a estrutura de log remota
      console.error(erro); // faz o log para o console
      // TODO: melhorar a transformação do erro para consumo do usuário
      this.log(`${operacao} falhou: ${erro.message}`);
      // Deixa a aplicação continuar rodando, retornando um resultado vazio
      return of(resultado as T);
    };
  }

  /** POST: adiciona um novo herói no servidor */
  adicionaHeroi(heroi: Heroi): Observable<Heroi> {
    return this.http.post<Heroi>(this.heroisUrl, heroi, this.httpOptions).pipe(
      tap((heroi: Heroi) => this.log(`adicionado herói com id=${heroi.id}`)),
      catchError(this.trataErro<Heroi>('adicionaHeroi'))
    );
  }

  /** DELETE: remove o herói do servidor */
  removerHeroi(heroi: Heroi | number): Observable<Heroi> {
    const id = typeof heroi === 'number' ? heroi : heroi.id;
    const url = `${this.heroisUrl}/${id}`;
    return this.http.delete<Heroi>(url, this.httpOptions).pipe(
      tap(_ => this.log(`removido o herói com id=${id}`)),
      catchError(this.trataErro<Heroi>('removeHeroi'))
    );
  }

  /* GET heróis cujo nome contém o termo de pesquisa */
  buscaHerois(termo: string): Observable<Heroi[]> {
    if (!termo.trim()) {
      // se nenhum termo de pesquisa, retorna array de heróis vazio.
      return of([]);
    }
    return this.http.get<Heroi[]>(`${this.heroisUrl}/?nome=${termo}`).pipe(
      tap(_ => this.log(`encontrados heróis compatíveis com "${termo}"`)),
      catchError(this.trataErro<Heroi[]>('buscaHerois', []))
    );
  }


}



