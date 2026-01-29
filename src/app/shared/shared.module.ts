import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokeHeadComponent } from './poke-head/poke-head.component';
import { PokeListComponent } from './poke-list/poke-list.component';
import { PokeSearchComponent } from './poke-search/poke-search.component';

@NgModule({
  declarations: [PokeHeadComponent, PokeSearchComponent, PokeListComponent],
  exports: [PokeHeadComponent, PokeSearchComponent, PokeListComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
