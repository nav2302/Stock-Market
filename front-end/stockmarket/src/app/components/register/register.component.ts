import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: any;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      username: ['', [Validators.required, Validators.pattern(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/)]],
      age: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[2-9]{1}\d{9}$/)]],
      usertype: 'customer'
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.flashMessagesService.show('Invalid Details',
        {
          cssClass: 'alert-danger', timeout: 2000
        });
      return;
    }
    this.authService.register(this.registerForm.value).
      subscribe(res => {
        if (res.status == "400") {
          console.log("Details cannot be empty");
        }else if (res.status == "600"){

          Swal.fire('Oops...', 'Mail already Exists!', 'error')

        }
         else {
          this.router.navigate(['/login']);
          this.flashMessagesService.show('Registered Successfully, Please Verify Your Email before Login',
            {
              cssClass: 'alert-success', timeout: 6000
            });
        }
      },
        err => {
          this.flashMessagesService.show('Failed To Register. Please, Try again!!',
            {
              cssClass: 'alert-danger', timeout: 2000
            });
        });
  }

}
