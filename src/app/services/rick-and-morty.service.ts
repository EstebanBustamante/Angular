import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  obtenerPersonajes(name: string = '', pageUrl: string = ''): Observable<any> {
    let url = pageUrl ? pageUrl : `${this.apiUrl}`;
    if (name) {
      url += url.includes('?') ? `&name=${name}` : `?name=${name}`;
    }
    return this.http.get<any>(url);  // Asegurar que el tipo de retorno es `any`
  }

  irAPagina(url: string): Observable<any> {
    return this.http.get<any>(url);  // Asegurar que el tipo de retorno es `any`
  }
}
