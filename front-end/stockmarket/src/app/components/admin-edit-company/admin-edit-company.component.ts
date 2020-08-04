import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Company } from 'src/app/Model/Company';

@Component({
  selector: 'app-admin-edit-company',
  templateUrl: './admin-edit-company.component.html',
  styleUrls: ['./admin-edit-company.component.css']
})
export class AdminEditCompanyComponent implements OnInit {

  stockName: string;
  private sub: any;
  editCompanyForm: FormGroup;
  auth_token: string;
  error: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private adminService: AdminService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.stockName = params['name'];
    });
    if(typeof(this.adminService.getCompanyToEdit()) != 'undefined'){
      this.error = false;
      this.createForm();
    }
  }

  createForm(){
    this.editCompanyForm = this.formBuilder.group({
      'id': [this.adminService.getCompanyToEdit().id],
      'name': [this.adminService.getCompanyToEdit().name, Validators.required],
      'turnOver': [this.adminService.getCompanyToEdit().turnOver, Validators.required],
      'ceo': [this.adminService.getCompanyToEdit().ceo, Validators.required],
      'boardOfDirector': [this.adminService.getCompanyToEdit().boardOfDirector, Validators.required],
      'breif': this.adminService.getCompanyToEdit().breif,
      'companyCode': [this.adminService.getCompanyToEdit().companyCode, Validators.required]
    });
  }

  getErrorCompanyName(){
    return this.editCompanyForm.get('name').hasError('required') ? 'Field is required' : '';
  }

  onSubmit(){
    if(this.editCompanyForm.invalid){
      Swal.fire('Oops...', 'Invalid Form Data!', 'warning');
    }
    else{
      if (this.authService.isAuthenticated()) {
        this.auth_token = this.authService.getToken();
        this.adminService.editCompany(this.auth_token, this.editCompanyForm.value, this.stockName)
        .subscribe(res => {
          console.log(res);
          if(res.status == "200"){
            Swal.fire({
              icon: 'success',
              title: 'Company Edited Successfully',
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
