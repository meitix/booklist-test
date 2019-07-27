import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

export const RATE_BOOK = '[BOOK] Rate';
export const ORDER_BOOK_LIST = '[BOOK] Order';
@Injectable()
export class RateBook implements Action {
    readonly type = RATE_BOOK;
    constructor(public payload: {index: number , rate: number}) {}
}

export type BookListActions = RateBook;
