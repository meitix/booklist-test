import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RandomExecuter } from './random-timer.service';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from '../reducers/book-list.reducer';

describe('AutoRatingService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          books: BookListReducer
        })
      ]
    })
  );

  it('should create', () => {
    const randomExecuter = new RandomExecuter({ min: 0, max: 1000 }, () => {});
    expect(randomExecuter).toBeTruthy();
  });

  it('should start scheduler and run job multiple times and stop.', fakeAsync(() => {
    let callCount = 0;
    const sampleJob = new RandomExecuter({ min: 0, max: 500 }, () => {
      callCount++;
    });

    expect(sampleJob.isStopped).toBe(true);
    sampleJob.start();
    expect(sampleJob.isStopped).toBe(false);

    tick(1700);
    sampleJob.stop();


    expect(callCount).toBeGreaterThanOrEqual(3);
    expect(sampleJob.isStopped).toBe(true);
  }));
});
