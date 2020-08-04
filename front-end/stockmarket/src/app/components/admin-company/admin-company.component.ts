import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-company',
  templateUrl: './admin-company.component.html',
  styleUrls: ['./admin-company.component.css']
})
export class AdminCompanyComponent implements OnInit {

  stockName: string;
  private sub: any;
  addCompanyForm: FormGroup;
  auth_token: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.stockName = params['name'];
    });
    this.createForm();
  }

  createForm(){
    this.addCompanyForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'turnOver': ['', Validators.required],
      'ceo': ['', Validators.required],
      'boardOfDirector': ['', Validators.required],
      'breif': '',
      'companyCode': ['', Validators.required]
    });
  }

  getErrorCompanyName(){
    return this.addCompanyForm.get('name').hasError('required') ? 'Field is required' : '';
  }

  onSubmit(){
    if(this.addCompanyForm.invalid){
      Swal.fire('Oops...', 'Invalid Form Data!', 'warning');
    }
    else{
      if (this.authService.isAuthenticated()) {
        this.auth_token = this.authService.getToken();
        this.adminService.addNewCompany(this.auth_token, this.addCompanyForm.value, this.stockName)
        .subscribe(res => {
          console.log(res);
          if(res.status == "200"){
            Swal.fire({
              icon: 'success',
              title: 'Company Addedd Successfully',
              showConfirmButton: false,
              timer: 1500
            });
          }
          else if(res.status == "600"){
            Swal.fire({
              icon: 'warning',
              title: 'Company Already Exists',
              showConfirmButton: false,
              timer: 1500
            });
          }
          else{
            Swal.fire({
              icon: 'warning',
              title: 'Sorry!, Server Error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        },
        err => console.log(err)
        )
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
