import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookManagementModule } from '../book-management/book-management.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BookManagementModule
  ],
  exports:[
    NavbarComponent
  ]
})
export class CoreModule { }
