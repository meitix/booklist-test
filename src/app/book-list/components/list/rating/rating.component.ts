import { Component, OnInit, Input } from '@angular/core';
import { IBook } from 'src/app/models/book.interface';
import { BookService } from 'src/app/book-list/services/book.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() book: IBook;
  @Input() id: number;

  validRates: number[];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.validRates = this.bookService.getValidRates();
  }

  rateItem(value: number) {
    this.bookService.rateBook(this.id, value);
  }
}
