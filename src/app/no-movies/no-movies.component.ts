import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-no-movies',
  templateUrl: './no-movies.component.html',
  styleUrls: ['./no-movies.component.scss']
})
export class NoMoviesComponent implements OnInit {

  private movies: Array<string> = JSON.parse(localStorage.getItem('noMovies'));
  private noMovies: any = [];

  constructor(private http: Http) { }

  ngOnInit() {
  for (const movie in this.movies) {
      if (this.movies[movie] !== 'null') {
      this.http.get('http://www.omdbapi.com/?i=' + this.movies[movie])
      .subscribe(
        (res: Response) => {
          const json = res.json();
          this.noMovies = json;
          console.log('A: ' + JSON.stringify(this.noMovies));
          // LUODAAN HTML ELEMENTIT:
          const node = document.createElement('li');
          node.innerHTML = this.noMovies.Title + ' (' + this.noMovies.Year + ') <br> Genres: ' + this.noMovies.Genre;
          node.setAttribute('style',
            'border-bottom:1px solid #ddd;padding:0.5em;');
          document.getElementById('noMoviesList').appendChild(node);
        });
      }
    }
  }

}
