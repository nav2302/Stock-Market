import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { IpoComponent } from './components/ipo/ipo.component';
import { CompareCompanyComponent } from './components/compare-company/compare-company.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminCompanyComponent } from './components/admin-company/admin-company.component';
import { AdminEditCompanyComponent } from './components/admin-edit-company/admin-edit-company.component'; 
import { AdminIposComponent } from './components/admin-ipos/admin-ipos.component';
import { AdminImportDataComponent } from './components/admin-import-data/admin-import-data.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'company-details/:id', component: CompanyDetailsComponent },
  { path: 'ipo/:id', component: IpoComponent, canActivate: [AuthGuardGuard] },
  { path: 'compare-companies', component: CompareCompanyComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin/addCompany/:name', component: AdminCompanyComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin/editCompany/:name', component: AdminEditCompanyComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin/updateipos', component: AdminIposComponent, canActivate: [AuthGuardGuard] },
  { path: 'admin/upload-data/:id', component: AdminImportDataComponent, canActivate: [AuthGuardGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
