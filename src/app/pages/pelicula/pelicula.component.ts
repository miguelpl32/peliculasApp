import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: MovieResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location) { }

  ngOnInit(): void {

    const { id } = this.activatedRoute.snapshot.params;
    // console.log(id);
    this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
      console.log(movie);
      this.pelicula = movie;
    });
  }

  onRegresar(): void {
    this.location.back();

  }

}
