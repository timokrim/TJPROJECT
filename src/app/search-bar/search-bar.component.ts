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

  constructor(private http: Http) { }

   searchMovie = (formValues: any) => {
    this.http.get('http://www.omdbapi.com/?t=' + formValues.title)
    .subscribe(
      (res: Response) => {
        const json = res.json();
        this.result = json;
        console.log(this.result);
      });
      if (this.result.Response === 'True') {
        document.getElementById('search-result').style.display = 'block';
      } else {
        console.log('ERROR');
      }
   }

  ngOnInit() {
  }
}
