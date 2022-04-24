import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookModel } from '../models/book-model';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private httpClient: HttpClient,
    private alertify: AlertifyService) { }

  public bookUrl: string = 'https://62125283f43692c9c6e7c136.mockapi.io/api/v1/books';

  getAllBook(): Observable<BookModel[]> {
    return this.httpClient.get<BookModel[]>(this.bookUrl);
  }

  getBookById(id: number): Observable<BookModel> {
    return this.httpClient.get<BookModel>(`${this.bookUrl}/${id}`);
  }

  addBook(book: BookModel) {
    return this.httpClient.post(this.bookUrl, book).subscribe(
      (data) => this.alertify.success("The new record has been successfully added.")
      ,
      (err) => this.alertify.error(err.status + ' ' + err.statusText)
    );
  }

  updateBook(book: BookModel) {
    return this.httpClient.put(this.bookUrl + '/' + book.id, book).subscribe(
      (data) => this.alertify.success("The record successfully updated.")
      ,
      (err) => this.alertify.error(err.status + ' ' + err.statusText)
    );
  }

  deleteBook(id: number) {
    return this.httpClient.delete(`${this.bookUrl}/${id}`);
  }
}
