import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.state';
import { LoadData, RateBook, OrderData } from '../actions/book-list.actions';
import { IBook } from 'src/app/models/book.interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private store: Store<IAppState>) { }

  loadData(data: IBook[]) {
    this.store.dispatch(new LoadData(data));
  }

  rateBook(id: number, rate: number) {
    this.store.dispatch(new RateBook({index: id, rate}));
    this.store.dispatch(new OrderData({property: 'rate' , orderType: 'desc'}));
  }

  getBooks(orderConfig: {orderBy: string , orderType: 'asc' | 'desc' }) {
    this.store.dispatch(new OrderData({property: orderConfig.orderBy , orderType: orderConfig.orderType}));
    return this.store.select('books');
  }
}
