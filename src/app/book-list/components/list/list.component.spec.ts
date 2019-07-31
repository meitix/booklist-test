import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { take, tap } from 'rxjs/operators';
import { ListComponent } from './list.component';
import { RatingComponent } from './rating/rating.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from '../../reducers/book-list.reducer';
import { BookService } from '../../services/book.service';
import { BOOKS } from '../../../data/books.js';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, RatingComponent],
      imports: [
        BrowserModule,
        FormsModule,
        StoreModule.forRoot({
          books: BookListReducer
        })
      ],
      providers: [
        BookService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    component.bookService.loadData(BOOKS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a ul element', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ul')).toBeTruthy();
  });

  it('should contain a list item for each book item', () => {
    const compiled = fixture.debugElement;
    component.books.pipe(take(1)).subscribe(books => {
      expect(compiled.query(By.css('ul')).children.length).toEqual(
        books.length
      );
    });
  });

  it('each list item should contain book title of book in the books array with same index', () => {
    const compiled = fixture.debugElement;
    component.books.pipe(take(1)).subscribe(books => {
      compiled.queryAll(By.css('li')).forEach((el, i) => {
        expect(el.nativeElement.innerText).toContain(books[i].title);
      });
    });
  });

  it('should start the automatic rating by clicking on toggle button', fakeAsync(() => {
    const compiled = fixture.debugElement;
    const button = compiled.query(By.css('button'));
    button.triggerEventHandler('click', {});
    let booksChanges = 0;
    component.books
      .pipe(
        take(4),
        tap(() => booksChanges++)
      )
      .subscribe();
    tick(5000);
    // stop automatic rating.
    button.triggerEventHandler('click', {});
    expect(booksChanges).toEqual(4);
  }));
});
