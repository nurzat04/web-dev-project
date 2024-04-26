import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GenreComponent } from './genre/genre.component';
import { HelpServiceComponent } from './help-service/help-service.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { AuthService } from './auth.service'; // Import AuthService
import { MeComponent } from './me/me.component';
import { About2Component } from './about2/about2.component';
import { About3Component } from './about3/about3.component';
import { FavoriteComponent } from './favorite/favorite.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule, 
    RouterModule.forRoot([
      { path:'', component: BarComponent},
      { path:'signup', component: SignupComponent},
      //{path: '', redirectTo: '/', pathMatch: 'full'},      
      // { path:'bar', component: BarComponent},
      { path: 'book/:id', component: BookDetailsComponent },
      { path: 'login', component: LoginComponent},
      { path: 'genre', component: GenreComponent},
      { path: 'help/:username', component: HelpServiceComponent},
      { path: 'about', component: AboutComponent},
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'me', component: MeComponent},
      { path: 'about2', component: About2Component},
      { path: 'about3', component: About3Component},
      { path: 'favorite', component: FavoriteComponent},

    ])
  ],
  declarations: [
    BookDetailsComponent,
    AppComponent,
    BarComponent,
    LoginComponent,
    SignupComponent,
    GenreComponent,
    HelpServiceComponent,
    AboutComponent,
    CartComponent,
    MeComponent,
    About2Component,
    About3Component,
    FavoriteComponent,
  ],
  providers: [
    AuthService // Provide AuthService at the root level
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy } // Provide your custom reuse strategy
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
