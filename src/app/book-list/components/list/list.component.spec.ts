import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { ListComponent } from './list.component';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from '../../reducers/book-list.reducer';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        StoreModule.forRoot({
          books: BookListReducer
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
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
      expect(compiled.children.length).toEqual(books.length);
    });
  });

  it('should the books title in each list item element', () => {
    const compiled = fixture.debugElement;
    component.books.pipe(take(1)).subscribe(books => {
      compiled.children.forEach((el, i) => {
        expect(el.nativeElement.innerText).toContain(books[i].title);
      });
    });
  });
});
