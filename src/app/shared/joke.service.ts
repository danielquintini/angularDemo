import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


const routes = {
	// Retrieve a random chuck norris joke from a given category.
	joke: (category: string) => `/jokes/random?category=${category}`,
	
	// Free text search.
	search: (query:string) => `/jokes/search?query=${query}`,

	// Retrieve a list of available categories.
	categories: '/jokes/categories'
};

/**
 * Properties of a random joke that can be retrieved from the Chuck Norris api.
 * @param category  Can be any of the following: "explicit","dev","movie","food","celebrity","science","political","sport","religion","animal","music","history","travel","career","money","fashion".
 * @param icon_url An internet address pointing to a chuck norris icon.
 * @param id A unique identifier for a Chuck Norris joke retrieved from the Chuck Norris api. 
 * @param url A direct link to the joke under the Chuck Norris api.
 * @param value the actual joke
 */

export interface RandomJoke {	
	category ?: Array<string>;
	icon_url ?: string,
	id : string,
	url ?: string,
	value : string
}

/**
* Retrieve a random joke from the Chuck Norris api
* @param JokeService Service to retrieve Chuck Norris jokes.
*/

@Injectable()
export class JokeService {

  constructor(private http: Http) { }

  /**
   * Retrieve a random joke from the Chuck Norris api
   * @param category The category from which the joke should be retrieved.
   * @returns Observable<RandomJoke> The joke retrieved from the Chuck Norris api.
   */
  getRandomJoke(category: string): Observable<RandomJoke> {
    let errorResponse:RandomJoke = {id:'', value:'Error, could not load joke :-('};
    return this.http.get(routes.joke(category))
      .map((res: Response) => res.json())
      .catch(() => Observable.of(errorResponse));
  }

}
