import { Action } from '@ngrx/store';
import { IBook } from '../../models/book.interface';
import { produce } from 'immer';
import {
  RateBook,
  BookListActions,
  RATE_BOOK
} from '../actions/book-list.actions';

const initialState: IBook[] = [{ title: 'Harry Potter', rate: 0 }];

export const BookListReducer = (
  state: IBook[] = initialState,
  action: BookListActions
) => {
  switch (action.type) {
    case RATE_BOOK:
      return produce(state, draft => {
        draft[action.payload.index].rate = action.payload.rate;
      });

    default: {
      return state;
    }
  }
};
