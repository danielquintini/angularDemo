import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JokeService, RandomJoke } from '../shared/joke.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jokes: Array<RandomJoke>;
  isLoading: boolean;

  constructor(private JokeService: JokeService) {
    this.jokes = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.JokeService.getRandomJoke('dev')
      .finally(() => { this.isLoading = false; })
      .subscribe((joke: RandomJoke) => { this.jokes.push(joke); console.log(this.jokes[0].value); });
  }

}
