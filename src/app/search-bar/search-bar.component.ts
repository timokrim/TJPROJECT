import { WatchlistComponent } from './../watchlist/watchlist.component';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  private title: any = '';
  private result: any = [];
  private movieID: any = '';

  private recentMovies: Array<string> = [];
  private watchList: Array<string> = [];
  private noMovies: Array<string> = [];

  constructor(private http: Http) { }

   searchMovie = (formValues: any) => {
    this.http.get('http://www.omdbapi.com/?t=' + formValues.title)
    .subscribe(
      (res: Response) => {
        const json = res.json();
        this.result = json;
        console.log(this.result);
      });
      // Näytetään hakutulos vain jos Response === True
      if (this.result.Response === 'True') {
        document.getElementById('search-result').style.display = 'block';
      } else {
        console.log('ERROR');
      }
      // Otetaan hakutuloksen ID talteen muuttujaan, jotta se voidaan tarvittaessa lisätä local storageen
      this.movieID = this.result.imdbID;
      return this.movieID;
   }

   addToListWM() {
      if (localStorage.getItem('watchedMovies') === null) {
        this.recentMovies.push(this.movieID);
      } else {
        this.recentMovies = JSON.parse(localStorage.getItem('watchedMovies'));
        this.recentMovies.push(this.movieID);
      }
      localStorage.setItem('watchedMovies', JSON.stringify(this.recentMovies));
      console.log(localStorage.getItem('watchedMovies'));
      location.reload();
   }

   addToListWL() {
      if (localStorage.getItem('watchList') === null) {
        this.watchList.push(this.movieID);
      } else {
        this.watchList = JSON.parse(localStorage.getItem('watchList'));
        this.watchList.push(this.movieID);
      }
      localStorage.setItem('watchList', JSON.stringify(this.watchList));
      console.log(localStorage.getItem('watchList'));
      location.reload();
   }

   addToListNM() {
      if (localStorage.getItem('noMovies') === null) {
        this.noMovies.push(this.movieID);
      } else {
        this.noMovies = JSON.parse(localStorage.getItem('noMovies'));
        this.noMovies.push(this.movieID);
      }
      localStorage.setItem('noMovies', JSON.stringify(this.noMovies));
      console.log(localStorage.getItem('noMovies'));
      location.reload();
   }

  ngOnInit() {
  }
}
