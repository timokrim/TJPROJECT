import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-recent-movies',
  templateUrl: './recent-movies.component.html',
  styleUrls: ['./recent-movies.component.scss']
})
export class RecentMoviesComponent implements OnInit {

  private movies: Array<string> = JSON.parse(localStorage.getItem('watchedMovies'));
  private watchedMovie: any = [];

  constructor(private http: Http) { }

  ngOnInit() {
    for (const movie in this.movies) {
      if (this.movies[movie] !== 'null') {
      this.movies.reverse(); // Uusin ensimmäiseksi
      this.http.get('http://www.omdbapi.com/?i=' + this.movies[movie])
      .subscribe(
        (res: Response) => {
          const json = res.json();
          this.watchedMovie = json;
          console.log('A: ' + JSON.stringify(this.watchedMovie));
          // LUODAAN HTML ELEMENTIT:
          const node = document.createElement('li');
          // const img = '<img calss="img" src="' + this.recentMovie.Poster + '" height="80">';
          node.innerHTML = this.watchedMovie.Title + ' (' + this.watchedMovie.Year + ')<br> Genres: ' + this.watchedMovie.Genre;
          node.setAttribute('style',
            'border-bottom:1px solid #ddd; padding:0.5em;');
          document.getElementById('watchedMovieList').appendChild(node);
        });
      }
    }
  }

}
