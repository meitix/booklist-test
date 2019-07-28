import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from './book-list/reducers/book-list.reducer';
import { ListComponent } from './book-list/components/list/list.component';
import { RatingComponent } from './book-list/components/list/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({
      books: BookListReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
