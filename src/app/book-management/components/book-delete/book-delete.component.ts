import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { BookModel } from '../../models/book-model';
import { BookApiService } from '../../services/book-api.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {

  @Input() public book: BookModel;
  @Output() public deleteFunction: EventEmitter<any> = new EventEmitter();
  public modal: any;

  constructor(private bookApiService: BookApiService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.book) {
      var deleteModal = document.getElementById("deleteModal");
      this.modal = new (window as any).bootstrap.Modal(deleteModal);
      this.modal.show();
    }
  }

  deleteBook(id: number) {
    if (id > 0) {
      this.bookApiService.deleteBook(id).subscribe(
        (data) => { 
          this.alertify.success("The record successfully deleted.") 
          this.deleteFunction.emit({
            id
          });
        }
        ,
        (err) => this.alertify.error(err.status + ' ' + err.statusText)
      );
      this.modal.hide();
    }
  }
}
