import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { BookModel } from '../../models/book-model';
import { BookApiService } from '../../services/book-api.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public id: number;
  public book: BookModel;
  public bookList: BookModel[];
  public deleteBookItem: BookModel;

  constructor(private activatedRoute: ActivatedRoute,
    private bookApiService: BookApiService,
    private router: Router,
    private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getBookDetail();
    this.getAllBooks();
  }

  getBookDetail() {
    this.bookApiService.getBookById(this.id).subscribe(
      (data) => this.book = data,
      (err) => this.alertify.error(err.status + ' ' + err.statusText)
    )
  }

  getAllBooks() {
    this.bookApiService.getAllBook().subscribe(
      (data) => this.bookList = data,
      (err) => this.alertify.error(err.status+' '+err.statusText)
    )
  }

  updateBook() {
    this.router.navigateByUrl("/book-update/" + this.id);
  }

  deleteBook(book: BookModel) {
    this.deleteBookItem = book;
  }

  deleteItemInView() {
    this.getAllBooks();
    this.router.navigateByUrl("/book-list");
  }
}
