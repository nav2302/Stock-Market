import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Company } from '../../Model/Company';
import { Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  auth_token: string;
  map = new Map<String, Company[]>();
  isLoading = false;
  options: Company[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<Company[]>;


  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder,
    private adminService: AdminService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.adminService.getAllStocksAndCompanies(this.auth_token).subscribe(res => {
        for (var x in res.stockCompanyMap) {
          var value = res.stockCompanyMap[x];
          var flag = 0;
          for (var y in value) {
            flag = 1;
            break;
          }
          if (flag === 1) {
            this.map.set(x, value);
            this.options.push(...value);
          }
        }
      });
    }

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Company[] {
    return this.options.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }

  display(subject) {
    return subject ? subject : undefined;
  }

  onEnter(e) {
    e.preventDefault();
    if (this.myControl.value) {
      this.router.navigate(['/admin/company-details', this.myControl.value]);
    }
  }

  actdeact(company: Company) {
    company.active = !company.active;
    if (company.active) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Company Activated',
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Company Deactivated',
        showConfirmButton: false,
        timer: 1500
      });
    }
    this.adminService.updateCompany(company).subscribe(res => {
      if(res.status != "200"){
        Swal.fire('Sorry...', 'Unable to Perform the Operation!', 'warning');
      }
    },
    err => console.log(err));
  }

  addCompany(stockExchangeName: string){
    this.router.navigate(['/admin/addCompany',stockExchangeName]);
  }

  deleteCompany(id: number, stockName: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteCompany(id, stockName).subscribe(res => {
          console.log(res);
          if(res.status == "200"){
            this.map.set(stockName,this.map.get(stockName).filter(company => company.id !== id));
            Swal.fire({
              icon: 'success',
              title: 'Company Deleted',
              showConfirmButton: false,
              timer: 1500
            });
          }
          else{
            Swal.fire({
              icon: 'warning',
              title: 'Server Error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
      }
    })
  }

  editCompany(company: Company, stockExchangeName: string){
    this.adminService.setCompanyToEdit(company);
    this.router.navigate(['/admin/editCompany',stockExchangeName]);
  }

  uploadDataForCompany(id: number){
    this.router.navigate(['/admin/upload-data',id]);
  }

}
