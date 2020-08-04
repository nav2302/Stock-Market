import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../services/user.service';
import { Company } from '../../Model/Company';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-admin-ipos',
  templateUrl: './admin-ipos.component.html',
  styleUrls: ['./admin-ipos.component.css']
})
export class AdminIposComponent implements OnInit {

  auth_token: string;
  searchControl = new FormControl();
  stockNameControl = new FormControl();
  isLoading = false;
  filteredOptions: any;
  hasNext: boolean;
  hasPrevious: boolean;
  ipos: any[] = [];
  page: any;
  companyName: any;
  show = false;
  addIpoForm: FormGroup;
  editIpoForm: FormGroup;
  count: number = 0;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
    private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500), tap(() => this.isLoading = true),
      switchMap(value => this.userService.search({ name: value }, 1, 'BSE')
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    )
      .subscribe(data => this.filteredOptions = data.companies);

    this.createForm();
  }

  createForm() {
    this.addIpoForm = this.formBuilder.group({
      'companyName': ['', Validators.required],
      'stockExchange': ['', Validators.required],
      'price': ['', Validators.required],
      'totalShares': ['', Validators.required],
      'remarks': ''
    });

    this.editIpoForm = this.formBuilder.group({
      'price': ['', Validators.required],
      'totalShares': ['', Validators.required],
      'remarks': ''
    });
  }

  getErrorCompanyName() {
    return this.addIpoForm.get('companyName').hasError('required') ? 'Field is required' : '';
  }
  getErrorStockExchange() {
    return this.addIpoForm.get('stockExchange').hasError('required') ? 'Field is required' : '';
  }
  getErrorPrice() {
    return this.addIpoForm.get('price').hasError('required') ? 'Field is required' : '';
  }
  getErrorTotalShares() {
    return this.addIpoForm.get('totalShares').hasError('required') ? 'Field is required' : '';
  }

  getEditErrorPrice() {
    return this.editIpoForm.get('price').hasError('required') ? 'Field is required' : '';
  }
  getEditErrorTotalShares() {
    return this.editIpoForm.get('totalShares').hasError('required') ? 'Field is required' : '';
  }


  displayFn(company: Company): string {
    return company && company.name ? company.name : '';
  }

  onSubmit() {
    this.count = 1;
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.show = true;
      this.userService.getIpoDetails(this.auth_token, this.searchControl.value.id).subscribe(res => {
        this.hasNext = res.hasNext;
        this.page = res.ipos;
        this.hasPrevious = res.hasPrevious;
        this.ipos = res.ipos.content;
        console.log(this.ipos);
        for (var ipo in this.ipos) {
          this.companyName = this.ipos[ipo];
          break;
        }
      })
    }
  }

  getIpoPaging(formpage: number, formsize: number) {
    this.userService.getIpoDetailsWithPaging(this.auth_token, this.searchControl.value.id, formpage, formsize).subscribe(res => {
      this.hasNext = res.hasNext;
      this.page = res.ipos;
      this.hasPrevious = res.hasPrevious;
      this.ipos = res.ipos.content;
    })
  }

  addIpo() {
    if (this.addIpoForm.invalid) {
      Swal.fire('Oops...', 'Invalid Form Data!', 'warning');
      return;
    }
    if (this.authService.isAuthenticated()) {
      console.log(this.addIpoForm.value);
      this.auth_token = this.authService.getToken();
      this.adminService.addIpo(this.auth_token, this.addIpoForm.value).subscribe(res => {
        if (res.status == "200") {
          this.ipos.unshift(res.object);
          Swal.fire({
            icon: 'success',
            title: 'IPO added Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
  }

  editIpo(ipoId: number) {
    if (this.editIpoForm.invalid) {
      Swal.fire('Oops...', 'Invalid Form Data!', 'warning');
      return;
    }
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.adminService.editIpo(this.auth_token, ipoId, this.editIpoForm.value).subscribe(res => {
        if (res.status == "200") {
          let objIndex = this.ipos.findIndex((obj => obj.id == ipoId));
          this.ipos[objIndex].price = this.editIpoForm.value.price;
          this.ipos[objIndex].totalShares = this.editIpoForm.value.totalShares;
          this.ipos[objIndex].remarks = this.editIpoForm.value.remarks;
          Swal.fire({
            icon: 'success',
            title: 'IPO edited Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
        }
        else{
          Swal.fire('Server Error!', 'Try Again Later', 'warning');
        }
      })
    }
  }

}
