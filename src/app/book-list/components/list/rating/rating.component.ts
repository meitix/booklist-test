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

  validRates = [1, 2, 3, 4, 5];
  constructor(private bookService: BookService) {}

  ngOnInit() {}

  rateItem(value: number) {
    this.bookService.rateBook(this.id , value);
  }
}
