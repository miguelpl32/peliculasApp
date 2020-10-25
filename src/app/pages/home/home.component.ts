import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.peliculasService.getCartelera().subscribe(resp => {
      // console.log(resp.results);
      this.movies = resp.results;
    });

  }

}
