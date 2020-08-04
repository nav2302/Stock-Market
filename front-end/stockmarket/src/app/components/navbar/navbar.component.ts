import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedType: string;

  constructor(private router:Router, private authService: AuthService ) { }

  ngOnInit(): void {
    if (this.authService.getAuthType() == null) {
      this.loggedType = "home";
    } else {
      if (this.authService.getAuthType() == "customer") {
        this.loggedType = "customer";
      } else if (this.authService.getAuthType() == "admin") {
        this.loggedType = "admin";
      }
    }
  }

  logout() {
    this.loggedType = "home";
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

}
