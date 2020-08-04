import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService) {
  }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.flashMessagesService.show('Invalid Email or Password',
        {cssClass: 'alert-danger', timeout: 2000});
      return;
    }
    this.authService.userLogin(this.loginForm.value).
      subscribe(res => {
        if (res.status == "200") {
          this.authService.storeToken(res.auth_TOKEN, "customer");
          this.router.navigate(['/home']);
          this.flashMessagesService.show('Logged in Successfully',
            {
              cssClass: 'alert-success', timeout: 4000
            });
          this.error = false;
        }else if(res.status == "600"){

          Swal.fire('Oops...', 'Email Not Verified!', 'warning');

        } else if (res.status == "500") {
          this.authService.adminLogin(this.loginForm.value).
            subscribe(res => {
              if (res.status == "200") {
                this.authService.storeToken(res.auth_TOKEN, "admin");
                this.router.navigate(['/admin/home']);
                this.flashMessagesService.show('Logged in Successfully',
                  {
                    cssClass: 'alert-success', timeout: 4000
                  });
              } else {
                Swal.fire('Invalid Credentials!', 'Please Try Again!', 'error');
                this.router.navigate(['/login']);
              }
              this.error = false;
            },
              err => {
                this.flashMessagesService.show('Login Failure',
                  {
                    cssClass: 'alert-danger', timeout: 2000
                  });
                console.log(err.message);
              });
        }
      },
        err => {
          this.flashMessagesService.show('Login Failure',
            {
              cssClass: 'alert-danger', timeout: 2000
            });
          console.log(err);
        });
  }

}
