import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { InMemCarOwnersService } from './services/in-mem-car-owners.service';
import { AppComponent } from './app.component';
import { OwnersListComponent } from './owners-list/owners-list.component';
import { OwnerComponent } from './owner/owner.component';
import { CarComponent } from './car/car.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnersListComponent,
    OwnerComponent,
    CarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemCarOwnersService)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
