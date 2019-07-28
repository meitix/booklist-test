import { Action } from '@ngrx/store';
import { IBook } from 'src/app/models/book.interface';

export const RATE_BOOK = '[BOOK] Rate';
export const LOAD_DATA = '[BOOK] Load';
export const ORDER_DATA = '[BOOK] Order';

export class RateBook implements Action {
    readonly type = RATE_BOOK;
    constructor(public payload: {index: number , rate: number}) {}
}

export class LoadData implements Action {
    readonly type = LOAD_DATA;
    constructor(public payload: IBook[]) {}
}

export class OrderData implements Action {
    readonly type = ORDER_DATA;
    constructor(public payload: {property: string , orderType: 'asc' | 'desc'}) {}
}


export type BookListActions = RateBook | LoadData | OrderData;
