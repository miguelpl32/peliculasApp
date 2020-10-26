import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';


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
    };
  }

  resetCarteleraPage(): void {
    this.carteleraPage = 1;
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

  buscarPeliculas(texto: string): Observable<Movie[]> {

    const params = { ...this.params, page: '1', query: texto };

    return this.http.get<CarteleraResponse>(`${this.URL}/search/movie`, {
      params
    }).pipe(
      map(resp => resp.results)
    );
  }

  getPeliculaDetalle(id: string): any {
    return this.http.get<MovieResponse>(`${this.URL}/movie/${id} `, {
      params: this.params
    }).pipe(
      catchError(err => of(null))
    );
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${this.URL}/movie/${id}/credits`, {
      params: this.params
    }).pipe(
      catchError(err => of(null)),
      map(resp => resp.cast)
    );
  }
}
