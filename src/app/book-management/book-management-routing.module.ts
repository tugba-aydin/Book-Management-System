import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookAddComponent } from "./components/book-add/book-add.component";
import { BookDeleteComponent } from "./components/book-delete/book-delete.component";
import { BookDetailsComponent } from "./components/book-details/book-details.component";
import { BookListComponent } from "./components/book-list/book-list.component";
import { BookUpdateComponent } from "./components/book-update/book-update.component";

const routes: Routes = [
    {
        path: 'book-list',
        component: BookListComponent
    }
    ,{
        path: 'book-detail/:id',
        component: BookDetailsComponent,
    },
    {
        path: 'book-update/:id',
        component: BookUpdateComponent
    },
    {
        path: 'book-add',
        component: BookAddComponent
    },
    { 
        path: '', 
        redirectTo: '/book-list', 
        pathMatch: 'full' 
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class BookManagementRoutingModule {
   }