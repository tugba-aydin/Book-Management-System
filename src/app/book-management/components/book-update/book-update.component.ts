import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { BookModel } from '../../models/book-model';
import { BookApiService } from '../../services/book-api.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  public updateBookForm: FormGroup;
  public updateBookModel: BookModel;
  public id: number;

  constructor(private bookApiService: BookApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
    this.getBookDetail();
    this.updateForm();
  }

  updateForm() {
    this.updateBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      createdAt: ['', Validators.required]
    })
  }

  getBookDetail() {
    this.bookApiService.getBookById(this.id).subscribe((data) =>
      this.updateBookModel = data,
      (err) => this.alertify.error(err.status+' '+err.statusText)
      )
  }

  editBook() {
    if (this.updateBookForm.valid) {
      this.updateBookModel = Object.assign({}, this.updateBookForm.value)
      this.updateBookModel.id = this.id
      this.bookApiService.updateBook(this.updateBookModel)
      setTimeout(() => {
        this.router.navigateByUrl("/book-list")
      },
        3000);
    }
    else {
      this.alertify.error("Failed to update record. Please try again.")
    }
  }
}
