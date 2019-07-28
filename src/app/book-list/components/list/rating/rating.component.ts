import { Component, OnInit, Input } from '@angular/core';
import { IBook } from 'src/app/models/book.interface';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() book: IBook;
  validRates = [1, 2, 3, 4, 5];
  constructor() {}

  ngOnInit() {}
}
