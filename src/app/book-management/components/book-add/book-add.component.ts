import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { BookModel } from '../../models/book-model';
import { BookApiService } from '../../services/book-api.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  public addBookForm: FormGroup;
  public addBookModel: BookModel;

  constructor(private bookApiService: BookApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.createAddTaskForm();
  }

  createAddTaskForm() {
    this.addBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      createdAt: ['', Validators.required]
    })
  }

  addBook() {
    if (this.addBookForm.valid) {
      this.addBookModel = Object.assign({}, this.addBookForm.value)
      this.bookApiService.addBook(this.addBookModel);
      setTimeout(() => {
        this.router.navigateByUrl("/book-list")
      },
        2000);
    }
    else {
      this.alertify.error("Invalid data entry! Please enter the data correctly.")
    }
  }
}
