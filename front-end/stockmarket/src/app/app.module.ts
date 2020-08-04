import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDialogModule} from "@angular/material/dialog";
import { MatSelectModule } from '@angular/material/select';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LoaderService } from './services/loader.service';
import { HomeComponent } from './components/home/home.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { StockExchangeComponent } from './components/stock-exchange/stock-exchange.component';
import { IpoComponent } from './components/ipo/ipo.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { CompareCompanyComponent } from './components/compare-company/compare-company.component';
import { AdminImportDataComponent } from './components/admin-import-data/admin-import-data.component';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { AdminExchangeComponent } from './components/admin-exchange/admin-exchange.component';
import { AdminIposComponent } from './components/admin-ipos/admin-ipos.component';
import { AdminService } from './services/admin.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminEditCompanyComponent } from './components/admin-edit-company/admin-edit-company.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    HomeComponent,
    CompanyDetailsComponent,
    StockExchangeComponent,
    IpoComponent,
    LoaderComponent,
    CompareCompanyComponent,
    AdminImportDataComponent,
    AdminCompanyComponent,
    AdminExchangeComponent,
    AdminIposComponent,
    AdminHomeComponent,
    AdminEditCompanyComponent
  ],
  imports: [
    BrowserModule,ChartsModule,MatToolbarModule,
    AppRoutingModule,HttpClientModule,MatIconModule,
    StorageServiceModule,FormsModule,MatCardModule,
    ReactiveFormsModule,MatProgressSpinnerModule,
    BrowserAnimationsModule,MatAutocompleteModule,MatButtonModule,MatInputModule,
    MatTabsModule,MatExpansionModule,MatDialogModule,MatSelectModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AdminService, UserService, LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
