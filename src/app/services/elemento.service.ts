import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Elemento } from '../models/Elemento';

@Injectable({
  providedIn: 'root'
})
export class Elementoservice {

  url = 'http://localhost:3000/elementos'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os carros
  getElementos(): Observable<Elemento[]> {
    return this.httpClient.get<Elemento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um carro pelo id
  getElementoById(id: number): Observable<Elemento> {
    return this.httpClient.get<Elemento>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um carro
  saveElemento(elemento: Elemento): Observable<Elemento> {
    return this.httpClient.post<Elemento>(this.url, JSON.stringify(elemento), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // deleta um carro
  deleteElemento(elemento: Elemento) {
    return this.httpClient.delete<Elemento>(this.url + '/' + elemento.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}