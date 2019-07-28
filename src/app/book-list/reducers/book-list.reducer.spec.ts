import { RateBook } from '../actions/book-list.actions';
import { BookListReducer } from './book-list.reducer';
const state = [
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
    expect(newState[rateAction.payload.index].rate).toEqual(rateAction.payload.rate);
  });
});


describe('Initial data', () => {
  it('Should put the provided data to state', () => {
    const data = JSON.parse(require('../../data/books.json'));
    const loadData = new LoadData({data});
    const newState = BookListReducer(state, loadData);
    expect(newState).toEqual(data);
  });
});

