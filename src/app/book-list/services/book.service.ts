import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { LoadData, RateBook, OrderData } from '../actions/book-list.actions';
import { IBook } from 'src/app/models/book.interface';
import { RandomExecuter } from './random-timer.service';
import { max } from 'lodash';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private autoRater: RandomExecuter;
  constructor(private store: Store<IAppState>) {}

  loadData(data: IBook[]) {
    this.store.dispatch(new LoadData(data));
  }

  rateBook(id: number, rate: number) {
    this.store.dispatch(new RateBook({ index: id, rate }));
    this.store.dispatch(new OrderData({ property: 'rate', orderType: 'desc' }));
  }

  getBooks(orderConfig?: { orderBy: string; orderType: 'asc' | 'desc' }) {
    if (orderConfig) {
      this.store.dispatch(
        new OrderData({
          property: orderConfig.orderBy,
          orderType: orderConfig.orderType
        })
      );
    }
    return this.store.select<IBook[]>('books');
  }

  getValidRates() {
    return [1, 2, 3, 4, 5];
  }

  // toggle autoRating worker.
  toggleAutoRating() {
    if (!this.autoRater || this.autoRater.isStopped) {
      this.startAutoRating();
    } else {
      this.autoRater.stop();
    }
  }

  // helpers are here to make code cleaner.//

  private startAutoRating() {
    // initial autoRater if it is not initialized yet.
    this.autoRater = this.autoRater
      ? this.autoRater
      : new RandomExecuter({ min: 0, max: 1000 }, this.rateRandomly.bind(this));
    // start the autoRater.
    this.autoRater.start();
  }

  private rateRandomly() {
      this.getBooks().pipe(take(1)).subscribe(books => {
        // generate random index and rate.
        const rateData = {
          index: Math.floor(Math.random() * (books.length)),
          rate: Math.floor(Math.random() * (max(this.getValidRates()) + 1))
        };

        // call rate book function with generated values.
        this.rateBook(rateData.index, rateData.rate);
      });
    }
}
