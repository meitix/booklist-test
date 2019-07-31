import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { BookService } from './book.service';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from '../reducers/book-list.reducer';
import { BOOKS } from '../../data/books.js';
import { orderBy } from 'lodash';
import { take, tap } from 'rxjs/operators';
import { isEqual } from 'lodash';

describe('BookService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          books: BookListReducer
        })
      ]
    })
  );

  let service: BookService;
  beforeEach(() => {
    service = TestBed.get(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data', async () => {
    service.loadData(BOOKS);
    service.getBooks().subscribe(
      books => {
        expect(books).toEqual(BOOKS);
      },
      err => {
        expect(err).not.toBeTruthy();
      }
    );
  });

  it('should order loaded date', () => {
    service.loadData(BOOKS);
    service.getBooks({ orderBy: 'rate', orderType: 'desc' }).subscribe(
      books => {
        expect(books).toEqual(orderBy(BOOKS, 'rate', 'desc'));
      },
      err => {
        expect(err).not.toBeTruthy();
      }
    );
  });

  it('should rate a book', () => {
    service.rateBook(0, 5);
    service
      .getBooks({ orderBy: 'rate', orderType: 'desc' })
      .subscribe(books => expect(books[0].rate).toEqual(5))
      .unsubscribe();
    service.rateBook(0, 3);
    service
      .getBooks({ orderBy: 'rate', orderType: 'desc' })
      .subscribe(books => expect(books[0].rate).toEqual(3))
      .unsubscribe();
    service.rateBook(0, 1);
    service
      .getBooks({ orderBy: 'rate', orderType: 'desc' })
      .subscribe(books => expect(books[0].rate).toEqual(1))
      .unsubscribe();
  });

  it('should start random rating and stop', fakeAsync(() => {
    service.toggleAutoRating();
    let changesCount = 0;
    service
      .getBooks()
      .pipe(
        take(4),
        tap(() => changesCount++)
      )
      .subscribe(null, null, () => service.toggleAutoRating());
    tick(4000);
    expect(changesCount).toEqual(4);
  }));

  it('random rating should change item rating', fakeAsync(() => {
    const booksHistory = [];
    service.loadData(BOOKS);
    service.getBooks().subscribe(books => {
      booksHistory.push(books);
    });
    // start rating.
    service.toggleAutoRating();
    // wait 2 seconds.
    tick(2000);
    // stop rating.
    service.toggleAutoRating();

    let truthyCount = 0;
    // check changes.
    for (let i = 0; i < booksHistory.length - 1; i++) {
      if (isEqual(booksHistory[i], booksHistory[i + 1])) {
        truthyCount++;
      }
    }
    expect(truthyCount).not.toEqual(booksHistory.length - 1);
  }));

  it('random rating should run codes at different time periods', fakeAsync(() => {
    const dates = [];
    // load books.
    service.loadData(BOOKS);
    service.getBooks().subscribe(() => dates.push(Date.now()));
    // start random rater.
    service.toggleAutoRating();
    // wait 5 seconds.
    tick(5000);
    // stop random rater.
    service.toggleAutoRating();

    let truthyCount = 0;
    // check time periods.
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] && dates[i + 1] && dates[i + 2]) {
        if (dates[i + 1] - dates[i] === dates[i + 2] - dates[i + 1]) {
          truthyCount++;
        }
      }
    }

    expect(truthyCount).not.toEqual(dates.length - 2);
  }));
});
