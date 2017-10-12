import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { JokeService, RandomJoke } from './joke.service';

describe('JokeService', () => {
	
	let jokeService: JokeService;
	let mockBackend: MockBackend;

	beforeEach(() => {
		TestBed.configureTestingModule({
		  providers: [
		    JokeService,
		    MockBackend,
		    BaseRequestOptions,
		    {
		      provide: Http,
		      useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
		        return new Http(backend, defaultOptions);
		      },
		      deps: [MockBackend, BaseRequestOptions]
		    }
		  ]
		});
	});

	beforeEach(inject([
		JokeService,
		MockBackend
		], (_jokeService: JokeService,
		  _mockBackend: MockBackend) => {

		jokeService = _jokeService;
		mockBackend = _mockBackend;
	}));

	afterEach(() => {
		mockBackend.verifyNoPendingRequests();
	});

	it('should be created', inject([JokeService], (service: JokeService) => {
		expect(service).toBeTruthy();
	}));

	describe('getRandomJoke', () => {

		it('should return a random joke from the Chuck Norris api', fakeAsync(() => {
		  // Arrange
		  const mockJoke:RandomJoke = {
		  	category:['sport'], 
		  	icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
		  	id:'bcwtccvqre-1l_68bxpjjq',
		  	url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
		  	value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
		  };

		  const responseOptions = new ResponseOptions({body: mockJoke});
		  const response = new Response(responseOptions);
		  const mockConnection = (connection: MockConnection) => connection.mockRespond(response);
		  mockBackend.connections.subscribe(mockConnection);

		  // Act
		  const randomJokeSubscription = jokeService.getRandomJoke('sport');
		  tick();

		  // Assert
		  randomJokeSubscription.subscribe((joke: RandomJoke) => {
		    expect(joke).toEqual(mockJoke);
		  });

		}));

		it('should return a joke with empty id and error message as value on any error status response', fakeAsync(() => {
		  // Arrange
		  const responseOptions = new ResponseOptions({ status: 500 });
		  const response = new Response(responseOptions);
		  const mockConnection = (connection: MockConnection) => connection.mockError(response as any);
		  mockBackend.connections.subscribe(mockBackend);

		  // Act
		  const randomJokeSubscription = jokeService.getRandomJoke('toto');
		  tick();

		  // Assert
		  randomJokeSubscription.subscribe((joke: RandomJoke) => {
		    expect(typeof joke.value).toEqual('string');
		    expect(joke.value).toContain('Error');
		  });

		}));

	});

	describe('saveJoke', () => {

		it('should save a given joke in our server and return the saved joke in the response body', fakeAsync(() => {

			// Arrange
			const mockJoke:RandomJoke = {
				category:['sport'], 
				icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
				id:'bcwtccvqre-1l_68bxpjjq',
				url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
				value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
			};

			const responseOptions = new ResponseOptions({body: mockJoke});
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockRespond(response);
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const savedJokeSubscription = jokeService.saveJoke(mockJoke);
			tick();

			// Assert
			savedJokeSubscription.subscribe((joke: RandomJoke) => {
			expect(joke).toEqual(mockJoke); // if everything went well, the server must return the same joke
			});

		}));

		it('should return a joke with empty id and error message as value on any error status response', fakeAsync(() => {
			// Arrange
			const mockJoke:RandomJoke = {
				category:['sport'], 
				icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
				id:'bcwtccvqre-1l_68bxpjjq',
				url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
				value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
			};

			const responseOptions = new ResponseOptions({ status: 500 });
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockError(response as any);
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const savedJokeSubscription = jokeService.saveJoke(mockJoke);
			tick();

			// Assert
			savedJokeSubscription.subscribe((joke: RandomJoke) => {
			expect(joke.id).toEqual('');
			expect(typeof joke.value).toEqual('string');
			expect(joke.value).toContain('Error');
			});

		})); 

	});

	describe('updateJoke', () => {

	  	it('should update a given joke and return the updated joke in the response body', fakeAsync(() => {

			// Arrange
	      const mockJoke:RandomJoke = {
	      	category:['sport'], 
	      	icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
	      	id:'bcwtccvqre-1l_68bxpjjq',
	      	url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
	      	value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
	      };

	      const responseOptions = new ResponseOptions({body: mockJoke});
	      const response = new Response(responseOptions);
	      const mockConnection = (connection: MockConnection) => connection.mockRespond(response);
	      mockBackend.connections.subscribe(mockConnection);

			// Act
	      const updatedJokeSubscription = jokeService.updateJoke(mockJoke);
	      tick();

			// Assert
	      updatedJokeSubscription.subscribe((joke: RandomJoke) => {
	        expect(joke).toEqual(mockJoke); // if everything went well, the server must return the same joke
	      });

	  	}));
  	
		it('should return a joke with empty id and error message as value on any error status response', fakeAsync(() => {
		
			// Arrange
			const mockJoke:RandomJoke = {
				category:['sport'], 
				icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
				id:'bcwtccvqre-1l_68bxpjjq',
				url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
				value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
			};

			const responseOptions = new ResponseOptions({ status: 500 });
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockError(response as any);
			
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const savedJokeSubscription = jokeService.updateJoke(mockJoke);
			tick();

			// Assert
			savedJokeSubscription.subscribe((joke: RandomJoke) => {
				expect(joke.id).toEqual('');
				expect(typeof joke.value).toEqual('string');
				expect(joke.value).toContain('Error');
			});

		}));

  	});

	describe('deleteJoke', () => {

		it('should delete a given joke and return the deleted joke in the response body', fakeAsync(() => {
			// Arrange
			const mockJoke:RandomJoke = {
				category:['sport'], 
				icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
				id:'bcwtccvqre-1l_68bxpjjq',
				url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
				value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
			};

			const responseOptions = new ResponseOptions({body: mockJoke});
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockRespond(response);
			
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const deletedJokeSubscription = jokeService.deleteJoke(mockJoke);
			tick();

			// Assert
			deletedJokeSubscription.subscribe((joke: RandomJoke) => {
				expect(joke).toEqual(mockJoke); // if everything went well, the server must return the same joke
			});
		}));
		
		it('should return a joke with empty id and error message as value on any error status response', fakeAsync(() => {
			// Arrange
			const mockJoke:RandomJoke = {
				category:['sport'], 
				icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
				id:'bcwtccvqre-1l_68bxpjjq',
				url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
				value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
			};

			const responseOptions = new ResponseOptions({ status: 500 });
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockError(response as any);
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const deletedJokeSubscription = jokeService.deleteJoke(mockJoke);
			tick();

			// Assert
			deletedJokeSubscription.subscribe((joke: RandomJoke) => {
				expect(joke.id).toEqual('');
				expect(typeof joke.value).toEqual('string');
				expect(joke.value).toContain('Error');
			});

		}));

	});

	describe('getSavedJokes', () => {

		it('should get all saved jokes', fakeAsync(() => {

			// Arrange
			const mockJokes:Array<RandomJoke> = [
				{
					category:['sport'], 
					icon_url:'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
					id:'bcwtccvqre-1l_68bxpjjq',
					url:'http://api.chucknorris.io/jokes/bcwtccvqre-1l_68bxpjjq',
					value:'Chuck Norris was banned from competitive bullriding after a 1992 exhibition in San Antonio, when he rode the bull 1,346 miles from Texas to Milwaukee Wisconsin to pick up his dry cleaning.'
				},
				{
					category: ["dev"],
					icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
					id: "espieyuysgeopdhgcdrmjw",
					url: "http://api.chucknorris.io/jokes/espieyuysgeopdhgcdrmjw",
					value: "Chuck Norris can't test for equality because he has no equal."
				},
				{
					category:["fashion"],
					icon_url: "https://assets.chucknorris.host/img/avatar/chuck-norris.png",
					id:"0wdewlp2tz-mt_upesvrjw",
					url:"http://api.chucknorris.io/jokes/0wdewlp2tz-mt_upesvrjw",
					value:"Chuck Norris does not follow fashion trends, they follow him. But then he turns around and kicks their ass. Nobody follows Chuck Norris."
				}
			];

			const responseOptions = new ResponseOptions({body: mockJokes});
			const response = new Response(responseOptions);
			const mockConnection = (connection: MockConnection) => connection.mockRespond(response);
			mockBackend.connections.subscribe(mockConnection);

			// Act
			const listOfJokesSubscription = jokeService.getSavedJokes();
			tick();

			// Assert
			listOfJokesSubscription.subscribe((jokes: Array<RandomJoke>) => {
				expect(jokes).toEqual(mockJokes); // if everything went well, the server must return our list of jokes
			});

		}));
		
		it('should return an array with a single joke with empty id and error message as value on any error status response', fakeAsync(() => {
		
			// Arrange
			const response = new Response(new ResponseOptions({ status: 500 }));
			mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

			// Act
			const savedJokeSubscription = jokeService.getSavedJokes();
			tick();

			// Assert
			savedJokeSubscription.subscribe((jokes: Array<RandomJoke>) => {
				expect(jokes.length).toEqual(1);
				expect(jokes[0].id).toEqual('');
				expect(jokes[0].value).toContain('Error');
			});

		}));

	});

});
