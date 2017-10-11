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
      const response = new Response(new ResponseOptions({
        body: mockJoke
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomJokeSubscription = jokeService.getRandomJoke('sport');
      tick();

      // Assert
      randomJokeSubscription.subscribe((joke: RandomJoke) => {
        expect(joke).toEqual(mockJoke);
      });

    })); // end it

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const randomJokeSubscription = jokeService.getRandomJoke('toto');
      tick();

      // Assert
      randomJokeSubscription.subscribe((joke: RandomJoke) => {
        expect(typeof joke.value).toEqual('string');
        expect(joke.value).toContain('Error');
      });

    })); // end it
  }); // end describe for getRandomJoke
}); // end describe for JokeService
