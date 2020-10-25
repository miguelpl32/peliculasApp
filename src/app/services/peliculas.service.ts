import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private URL = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  cargando = false;

  constructor(private http: HttpClient) { }

  get params(): any {
    return {
      api_key: 'a9efc41c74697a458503e23a65b092ed',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http.get<CarteleraResponse>(`${this.URL}/movie/now_playing`, {
      params: this.params
    }).pipe(
      map((resp) => resp.results),
      tap(() => {
        this.carteleraPage += 1;
        this.cargando = false;
      })

    );
  }
}
