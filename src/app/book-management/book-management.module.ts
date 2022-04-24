import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookManagementRoutingModule } from './book-management-routing.module';
import { BookApiService } from './services/book-api.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BookAddComponent,
    BookDeleteComponent,
    BookListComponent,
    BookUpdateComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    BookManagementRoutingModule,
    ReactiveFormsModule
  ],
  providers:[
    BookApiService
  ],
  exports:[
    BookListComponent,
    BookAddComponent
  ]
})
export class BookManagementModule { }
