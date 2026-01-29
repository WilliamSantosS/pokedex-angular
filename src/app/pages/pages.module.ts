import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DetailsComponent } from './details/details.component';
import { AppHomeRoutingModule } from './home/app-routing-home.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, DetailsComponent],
  imports: [CommonModule, AppHomeRoutingModule, SharedModule],
})
export class PagesModule {}
