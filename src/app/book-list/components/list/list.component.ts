import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/models/book.interface';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  books: Observable<IBook[]>;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    // get books.
    this.books = this.bookService.getBooks({orderBy: 'rate' , orderType: 'desc'});
  }
}
