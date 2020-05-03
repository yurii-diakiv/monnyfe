import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ExpensePageComponent } from './components/expense-page/expense-page.component';
import { StatisticPageComponent } from './components/statistic-page/statistic-page.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';

import { RouterModule } from '@angular/router';
import { ExpenseDialogComponent } from './components/expense-dialog/expense-dialog.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth-guard/auth.guard';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { CustomExpenseDialogComponent } from './components/custom-expense-dialog/custom-expense-dialog.component';
import { ChartsModule } from 'ng2-charts';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    ExpensePageComponent,
    StatisticPageComponent,
    ExpenseDialogComponent,
    HomePageComponent,
    AboutPageComponent,
    LoginPageComponent,
    SignUpPageComponent,
    AccountPageComponent,
    CustomExpenseDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatRippleModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'expense-page', component: ExpensePageComponent, canActivate: [AuthGuard]},
      { path: 'statistic-page', component: StatisticPageComponent, canActivate: [AuthGuard]},
      { path: 'account-page', component: AccountPageComponent, canActivate: [AuthGuard]},
      { path: 'login-page', component: LoginPageComponent },
      { path: 'sign-up-page', component: SignUpPageComponent },
      { path: 'about-page', component: AboutPageComponent }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5001", "monnybe.herokuapp.com"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
