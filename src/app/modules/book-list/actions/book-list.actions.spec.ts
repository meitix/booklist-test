import { RATE_BOOK, RateBook } from './book-list.actions';

describe('Rate book action class', () => {
  it('it should have type of ' + RATE_BOOK, () => {
    const rateBook = new RateBook({ index: 0, rate: 5 });
    expect(rateBook.type).toEqual(RATE_BOOK);
  });

  it('it should have same payload as pas ses in constructor after initialization', () => {
    const payload = { index: 0 , rate: 5 };
    const rateBook = new RateBook(payload);
    expect(rateBook.payload).toEqual(payload);
  });
});
