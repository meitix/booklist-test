import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from '../reducers/book-list.reducer';
import { BOOKS } from '../../data/books.js';
import { orderBy } from 'lodash';

describe('BookService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({
        books: BookListReducer
      })
    ]
  }));

  let service: BookService;
  beforeEach(() => {
     service = TestBed.get(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data' , async () => {
    service.loadData(BOOKS);
    service.getBooks({orderBy: '' , orderType: 'desc'}).subscribe(books => {
      expect(books).toEqual(BOOKS);
    }, (err) => {
      expect(err).not.toBeTruthy();
    });
  });

  it('should order loaded date' , () => {
    service.loadData(BOOKS);
    service.getBooks({orderBy: 'rate' , orderType: 'desc'}).subscribe(books => {
      expect(books).toEqual(orderBy(BOOKS, 'rate' , 'desc'));
    }, err => {
      expect(err).not.toBeTruthy();
    });
  });

  it('should rate a book' , () => {
    service.rateBook(0 , 5);
    service.getBooks({orderBy: 'rate' , orderType: 'desc'}).subscribe(books => expect(books[0].rate).toEqual(5)).unsubscribe();
    service.rateBook(0 , 3);
    service.getBooks({orderBy: 'rate' , orderType: 'desc'}).subscribe(books => expect(books[0].rate).toEqual(3)).unsubscribe();
    service.rateBook(0 , 1);
    service.getBooks({orderBy: 'rate' , orderType: 'desc'}).subscribe(books => expect(books[0].rate).toEqual(1)).unsubscribe();
  });
});
