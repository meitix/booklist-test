import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { ListComponent } from '../list.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { BookListReducer } from 'src/app/book-list/reducers/book-list.reducer';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        RatingComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        StoreModule.forRoot({
          books: BookListReducer
        })
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    component.book = {title: 'test book', rate: 1};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a select object', () => {
   expect(fixture.nativeElement.querySelector('select')).toBeTruthy();
  });

});
