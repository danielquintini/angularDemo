import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * A series of routes to be consumed by the JokeService
 *
 */
const routes = {
	// Implemented as get request only. Retrieve a random chuck norris joke from a given category.
	joke: (category: string) => `/jokes/random?category=${category}`,
	
	// Implemented as get request only. Free text search.
	search: (query:string) => `/jokes/search?query=${query}`,

	// Implemented as get, post, put and delete requests. Get will pull all saved jokes from our own server, post will save a given joke into our own server, put will update a given joke in our own server and delete will delete a given joke from our own server
	myJokes: (joke:RandomJoke = {id:'',value:''}) => '/jokes/myjokes',

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
*/

@Injectable()
export class JokeService { 
  
  	private defaultErrorResponse:RandomJoke;
	
	constructor(private http: Http) { 
		this.defaultErrorResponse = {id:'', value:'Error, could not load joke :-('};
	}

  /**
   * Retrieve a random joke from the Chuck Norris api
   * @param category The category from which the joke should be retrieved.
   * @returns Observable<RandomJoke> The joke retrieved from the Chuck Norris api. Note that a RandomJoke object with id='' means that an error occurred and the error message will be in RandomJoke.value 
   */
	getRandomJoke(category: string): Observable<RandomJoke> {   
		return this.http.get(routes.joke(category))
		.map((res: Response) => res.json())
		.catch(() => Observable.of(this.defaultErrorResponse));
	}

  /**
   * Saves a random joke into our own server
   * @param joke The joke that should be saved.
   * @returns Observable<RandomJoke> The joke that was saved from the Chuck Norris api. Note that a RandomJoke object with id='' means that an error occurred and the error message will be in RandomJoke.value
   */
	saveJoke(joke: RandomJoke): Observable<RandomJoke> {
    
		let body:string = JSON.stringify(joke);
		let headers:Headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(routes.myJokes(joke), body, options)
		  .map((res: Response) => res.json())
		  .catch(() => Observable.of(this.defaultErrorResponse));
	}

  /**
   * Update a random joke in our own server
   * @param joke The joke that should be updated.
   * @returns Observable<RandomJoke> The joke that was updated. Note that a RandomJoke object with id='' means that an error occurred and the error message will be in RandomJoke.value
   */
	updateJoke(joke: RandomJoke): Observable<RandomJoke> {
    
		let body = JSON.stringify(joke);
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.put(routes.myJokes(joke), body, options)
		  .map((res: Response) => res.json())
		  .catch(() => Observable.of(this.defaultErrorResponse));
	}

  /**
   * Deletes a random joke from our own server
   * @param joke The joke that should be deleted.
   * @returns Observable<RandomJoke> The joke that was deleted. Note that a RandomJoke object with id='' means that an error occurred and the error message will be in RandomJoke.value
   */
	deleteJoke(joke: RandomJoke): Observable<RandomJoke> {

		return this.http.delete(routes.myJokes(joke), { cache: false })
		  .map((res: Response) => res.json())
		  .catch(() => Observable.of(this.defaultErrorResponse));
	}

  /**
   * Saves a random joke into our own server
   * @returns Observable<Array<RandomJoke>> An array with all the jokes saved in our own server. Note that an array with a single RandomJoke object with id='' means that an error occurred and the error message will be in RandomJoke.value
   */
	getSavedJokes(): Observable<Array<RandomJoke>>{

		return this.http.get(routes.myJokes(), { cache: false })
		  .map((res: Response) => res.json())
		  .catch(() => Observable.of([this.defaultErrorResponse]));
	}

}
