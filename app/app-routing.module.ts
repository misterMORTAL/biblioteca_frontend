import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './layout/nav/nav.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { BooksComponent } from './pages/books/books.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { EditorialsComponent } from './pages/editorials/editorials.component';
import { RegisterComponent } from './pages/register/register.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { EmailComponent } from './pages/email/email.component';
import { RolesComponent } from './pages/roles/roles.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'category', component:CategoriesComponent },
  { path: 'book', component:BooksComponent },
  { path: 'author', component:AuthorsComponent },
  { path: 'editorial', component:EditorialsComponent },
  { path: 'register', component:RegisterComponent },
  { path: 'rental', component:RentalsComponent },
  { path: 'reset-password', component: EmailComponent },
  { path: 'termino', component:RolesComponent },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
