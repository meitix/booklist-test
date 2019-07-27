import { IBook } from './models/book.interface';

export interface IAppState {
   readonly Books: IBook[];
}
