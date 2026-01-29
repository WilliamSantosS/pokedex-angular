import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  private urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
  private urlName = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public name: any;
  public apiError: boolean = false;

  constructor(
    private pokemonService: PokeApiService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    const id = this.activatedRoute.snapshot.params['id'];
    const pokemon$ = this.pokemonService.getPokemonDetails(
      `${this.urlPokemon}/${id}`,
    );

    const name$ = this.pokemonService.getPokemonDetails(
      `${this.urlName}/${id}`,
    );

    return forkJoin([pokemon$, name$]).subscribe({
      next: ([pokemon, name]) => {
        this.pokemon = pokemon;
        this.name = name;
      },
      error: (error) => {
        this.apiError = true;
      },
    });
  }
}
