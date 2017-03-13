import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  private movies: Array<string> = JSON.parse(localStorage.getItem('watchList'));
  private watchList: any = [];

 constructor(private http: Http) { }

 clearList() {
  localStorage.removeItem('watchList');
  location.reload();
 }

  ngOnInit() {
    for (const movie in this.movies) {
      if (this.movies[movie] !== 'null') {
      this.http.get('http://www.omdbapi.com/?i=' + this.movies[movie])
      .subscribe(
        (res: Response) => {
          const json = res.json();
          this.watchList = json;
          console.log('A: ' + JSON.stringify(this.watchList));
          // LUODAAN HTML ELEMENTIT:
          const node = document.createElement('li');
          node.innerHTML = this.watchList.Title + ' (' + this.watchList.Year + ') <br> Genres: ' + this.watchList.Genre;
          node.setAttribute('style',
            'border-bottom:1px solid #ddd;padding:0.5em;');
          document.getElementById('watchListList').appendChild(node);
        });
      }
    }
    // document.getElementById('clear').innerHTML = '<button (click)="clearList()">Clear</button>';
  }

}
