import { timer, Subject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

export class RandomExecuter {
  private sbj: Subject<void>;
  private lastTimer: Subscription;

  constructor(
    private time: { min: number; max: number },
    job: () => void
  ) {
    this.sbj = new Subject();
    this.sbj.subscribe(job);
  }

  private randomInterval() {
    const delay = Math.floor(this.time.min + Math.random() * this.time.max);
    this.lastTimer = timer(delay)
      .pipe(tap(this.randomInterval.bind(this)))
      .subscribe(() => this.sbj.next());
  }

  get isStopped() {
    return !this.lastTimer || this.lastTimer.closed;
  }

  start() {
    this.randomInterval();
    console.log('random timer started...');
  }

  stop() {
    this.lastTimer.unsubscribe();
    console.log('random timer stopped...');
  }
}
