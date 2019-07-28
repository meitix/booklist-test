import { RateBook, LoadData, OrderData } from '../actions/book-list.actions';
import { BookListReducer } from './book-list.reducer';
import { IBook } from 'src/app/models/book.interface';
let state = [
  { title: 'harry potter', rate: 0 },
  { title: 'harry potter 2', rate: 1 }
];
describe('Rate Book', () => {
  it('Should not manipulate the current state object after creating new state', () => {
    const rateAction = new RateBook({ index: 1, rate: 5 });
    const newState = BookListReducer(state, rateAction);
    expect(newState).not.toEqual(state);
  });

  it('should set the new rate to the item with same index.', () => {
    const rateAction = new RateBook({ index: 0, rate: 5 });
    const newState = BookListReducer(state, rateAction);
    expect(newState[rateAction.payload.index].rate).toEqual(
      rateAction.payload.rate
    );
  });
});

const data: IBook[] = require('../../data/books.json');

describe('Initial data', () => {
  it('Should not manipulate the current state object after creating new state', () => {
    const loadData = new LoadData(data);
    const newState = BookListReducer(state, loadData);
    expect(newState).not.toEqual(state);
  });

  it('Should put the provided data to state', () => {
    const loadData = new LoadData(data);
    const newState = BookListReducer(state, loadData);
    // use new data if test passes successfully.
    if (expect(newState).toEqual(data)) {
      state = newState;
    }
  });
});

describe('Ordering the list', () => {
  it('should order the array based on item rates', () => {
    const orderData = new OrderData({ property: 'rate', orderType: 'desc' });
    const orderedBooks = BookListReducer(state, orderData);
    // check array is sorted or not.
    for (let i = 0; i < orderedBooks.length; i++) {
      if (i + 1 !== orderedBooks.length) {
        expect(orderedBooks[i].rate).toBeGreaterThanOrEqual(
          orderedBooks[i + 1].rate
        );
      }
    }
  });
});

// array length test.
it('Ordered array should have same length as unordered array after sorting.', () => {
  const orderData = new OrderData({ property: 'rate', orderType: 'desc' });
  const orderedBooks = BookListReducer(state, orderData);
  expect(orderedBooks.length).toEqual(state.length);
});
