import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { IBook } from '../../../models/book.interface';

export const RATE_BOOK = '[BOOK] Rate';
export const ORDER_BOOK_LIST = '[BOOK] Order';

export class RateBook implements Action {
    readonly type = RATE_BOOK;
    constructor(public payload: IBook) {}
}

export type BookActions = RateBook;