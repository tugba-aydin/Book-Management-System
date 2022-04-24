import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { BookModel } from '../../models/book-model';
import { BookApiService } from '../../services/book-api.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  public bookList: BookModel[] = [];
  public id: number;
  public deleteBookItem: BookModel;
  
  constructor(private bookApiService: BookApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  getAllBooks() {
    this.bookApiService.getAllBook().subscribe(
      (data) => this.bookList = data,
      (err) => this.alertify.error(err.status+' '+err.statusText)
    )
  }

  bookDetail(book: BookModel) {
    this.id = book.id
    this.router.navigateByUrl("/book-detail/" + this.id);
  }

  updateBook(book: BookModel) {
    this.id = book.id
    this.router.navigateByUrl("/book-update/" + this.id);
  }

  deleteBook(book: BookModel) {
    this.deleteBookItem = book;
  }

  deleteItemInView(id: number) {
   this.bookList=this.bookList.filter((x: any) => x.id != id);
  }
}
