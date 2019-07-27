import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  books: Observable<IBook[]>;

  constructor(private store: Store<IAppState>) {
    this.books = this.store.select('books');
  }

  ngOnInit() {}
}
