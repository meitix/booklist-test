import { Action } from '@ngrx/store';
import { IBook } from 'src/app/models/book.interface';

export const RATE_BOOK = '[BOOK] Rate';
export const ORDER_BOOK_LIST = '[BOOK] Order';
export const LOAD_DATA = '[BOOK] Load';

export class RateBook implements Action {
    readonly type = RATE_BOOK;
    constructor(public payload: {index: number , rate: number}) {}
}

export class LoadData implements Action {
    readonly type = LOAD_DATA;
    constructor(public payload: IBook[]) {}
}


export type BookListActions = RateBook | LoadData;
