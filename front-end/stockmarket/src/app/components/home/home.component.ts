import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../Model/Company';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  auth_token: string;
  map = new Map<String, Company[]>();
  isLoading = false;
  options: Company[] = [];
  filteredOptions: Observable<Company[]>;
  stockExchanges: any = [];
  companyForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router, private userService: UserService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.userService.getCompanies(this.auth_token).subscribe(res => {
        
        for (var x in res.stockCompanyMap) {
          this.stockExchanges.push(x);
          var value = res.stockCompanyMap[x]; 
          var flag=0;
          for(var y in value){
            flag=1;
            break;
          }
          if(flag === 1){
            this.map.set(x, value);
            this.options.push(...value);
          }
        }
        this.createForm();
      });
    }
  }

  createForm() {
    this.companyForm = this.formBuilder.group({
      'company1': '',
      'exchange': this.stockExchanges[0]
    });

    this.companyForm.get('company1').valueChanges.pipe(debounceTime(500), tap(() => this.isLoading = true),
    switchMap(value => this.userService.search({ name: value }, 1, this.companyForm.value.exchange)
      .pipe(
        finalize(() => this.isLoading = false),
      )
    )
  )
    .subscribe(data => this.filteredOptions = data.companies);
  }

  displayFn(company: Company): string {
    return company && company.name ? company.name : '';
  }

  onEnter() {
    if(this.companyForm.value.company1.id){
      this.router.navigate(['/company-details',this.companyForm.value.company1.id]);
    }
  }

}