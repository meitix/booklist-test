import { Component, OnInit } from '@angular/core';
import { BookService } from './book-list/services/book.service';
import { BOOKS } from './data/books.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'booklist-test';
  constructor(private bookService: BookService) {}
ngOnInit() {
this.bookService.loadData(BOOKS);
}
}
