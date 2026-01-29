import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PokeApiService } from '../../service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit, AfterViewInit {
  @ViewChild('anchor') anchor!: ElementRef;

  private allPokemons: any[] = [];
  public visiblePokemons: any[] = [];
  private searchTerm = '';
  private offset = 0;
  private limit = 15;
  private loading = false;

  constructor(private pokemonService: PokeApiService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.loading) {
        this.loadPokemons();
      }
    });

    observer.observe(this.anchor.nativeElement);
  }

  loadPokemons() {
    this.loading = true;
    this.pokemonService
      .apiListAllPokemons(this.offset, this.limit)
      .subscribe((pokemons) => {
        this.allPokemons = [...this.allPokemons, ...pokemons];
        this.applyFilter();
        this.offset += this.limit;
        this.loading = false;
      });
  }

  search(value: string) {
    this.searchTerm = value.toLowerCase();
    this.applyFilter();
  }

  private applyFilter() {
    if (!this.searchTerm) {
      this.visiblePokemons = [...this.allPokemons];
      return;
    }

    this.visiblePokemons = this.allPokemons.filter((pokemon) =>
      pokemon.name.includes(this.searchTerm),
    );
  }
}
