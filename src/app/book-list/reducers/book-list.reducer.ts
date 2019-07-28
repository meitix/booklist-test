import { Action } from '@ngrx/store';
import { IBook } from '../../models/book.interface';
import { produce } from 'immer';
import { orderBy } from 'lodash';
import {
  BookListActions,
  RATE_BOOK,
  LOAD_DATA,
  ORDER_DATA
} from '../actions/book-list.actions';

const initialState: IBook[] = [{ title: 'Harry Potter', rate: 0 }];

export const BookListReducer = (
  state: IBook[] = initialState,
  action: BookListActions
) => {
  switch (action.type) {
    // rate a book.
    case RATE_BOOK:
      return produce(state, draft => {
        draft[action.payload.index].rate = action.payload.rate;
      });
    // load data.
    case LOAD_DATA:
      return action.payload.slice();
    // order data.
    case ORDER_DATA:
      return orderBy(
        state.slice(),
        action.payload.property,
        action.payload.orderType
      ) as IBook[];
    default: {
      return state;
    }
  }
};
