import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private httpClient: HttpClient) {}

  public apiListAllPokemons(offset: number, limit = 15): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return this.httpClient.get<any>(url).pipe(
      switchMap((res) => {
        const details$ = res.results.map((pokemon: any) => {
          return this.getPokemonDetails(pokemon.url);
        });
        return forkJoin(details$).pipe(
          map((details: any) =>
            res.results.map((pokemon: any, index: number) => ({
              ...pokemon,
              details: details[index],
            })),
          ),
        );
      }),
    );
  }

  public getPokemonDetails(url: string) {
    return this.httpClient.get<any>(url).pipe(map((res) => res));
  }
}
