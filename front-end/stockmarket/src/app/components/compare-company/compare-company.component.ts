import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Company } from '../../Model/Company';
import { UserService } from '../../services/user.service';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-compare-company',
  templateUrl: './compare-company.component.html',
  styleUrls: ['./compare-company.component.css']
})
export class CompareCompanyComponent implements OnInit {

  auth_token: string;
  stockExchanges: any = [];
  companyForm: FormGroup;
  post: any = '';
  filteredOptions: any;
  filteredOptions1: any;
  isLoading: boolean = false;
  hideGraphDiv: boolean = true;
  isGraphLoading: boolean = false;
  isClicked = false;
  graph1Data: any = [];
  graph2Data: any = [];
  public barChartLabelsGraph: any = [];

  // #################################
  //        THIS IS GRAPH 1
  //##################################
  public barChartDataGraph1: any = [{ data: [] }];
  public barChartOptionsGraph1 = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Share Price ----->'
        },
        stacked: true,
        ticks: {
          fontColor: 'green'
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true
        },
        ticks: {
          fontColor: 'green',
        },
        type: 'time',
        time: {
          unit: 'day'
        },
        stacked: true,
      }]
    }
  };
  public barChartColorsGraph1: any = [
    {
      backgroundColor: 'rgba(255,255,0,0.5)',
      borderColor: '#f0ad4e',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ]
  public barChartTypeGraph = 'line';
  public barChartLegendGraph1 = true;


  // #################################
  //        THIS IS GRAPH 2
  //##################################
  public barChartDataGraph2: any = [{ data: [] }];
  public barChartOptionsGraph2 = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Share Price ----->'
        },
        ticks: {
          fontColor: 'green',
          stepValue: 200,
          min: 0
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true
        },
        ticks: {
          fontColor: 'green',
        },
        type: 'time',
        time: {
          unit: 'day'
        },
      }]
    }
  };
  public barChartColorsGraph2: any = [
    {
      backgroundColor: 'rgba(255,255,0,0.5)',
      borderColor: '#f0ad4e',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ]
  public barChartLegendGraph2 = true;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.userService.getCompanies(this.auth_token).subscribe(res => {
        for (var x in res.stockCompanyMap) {
          this.stockExchanges.push(x);
        }
        this.createForm();
      });
    }
  }

  createForm() {
    this.companyForm = this.formBuilder.group({
      'company1': [null, Validators.required],
      'company2': [null, Validators.required],
      'exchange': [this.stockExchanges[0], Validators.required],
      'startDate': '',
      'endDate': ''
    });

    this.companyForm.get('company1').valueChanges.pipe(debounceTime(500), tap(() => this.isLoading = true),
      switchMap(value => this.userService.search({ name: value }, 1, this.companyForm.value.exchange)
        .pipe(
          finalize(() => this.isLoading = false),
        )
      )
    )
      .subscribe(data => this.filteredOptions = data.companies);

      this.companyForm.get('company2').valueChanges.pipe(debounceTime(500), tap(() => this.isLoading = true),
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

  getErrorCompany1() {
    return this.companyForm.get('company1').hasError('required') ? 'Field is required' : '';
  }

  getErrorCompany2() {
    return this.companyForm.get('company2').hasError('required') ? 'Field is required' : '';
  }

  makeGraph1(barType) {
    console.log(this.companyForm.value);
    this.isGraphLoading = true;
    var startDate = "2020-02-16";
    var endDate = '2020-07-16';
    if (this.companyForm.value.startDate !== '' && this.companyForm.value.endDate != '') {
      startDate = this.companyForm.value.startDate;
      endDate = this.companyForm.value.endDate;
    }
    if (startDate > endDate) {
      Swal.fire('Wrong Input!', 'Start Date cannot be greater than End Date', "error");
      return;
    }
    else {
      this.graph1Data = [];
      this.barChartTypeGraph = barType;
      console.log(this.companyForm.value.company1.id);
      this.userService.getCompanyStockDetails(this.companyForm.value.company1.id).subscribe(res => {
        if(res == null){
          this.isGraphLoading = false;
          Swal.fire('No Data!', 'The company'+ this.companyForm.value.company1.name+' has no Data', "error");
          return;
        }
        res.forEach(objData => {
          if(objData.date >= startDate && objData.date <= endDate){
            this.barChartLabelsGraph.push(objData.date);
            this.graph1Data.push(objData.dayClose);
          }
        });
      },
        err => console.log(err),
        () => {
          this.makeGraph2(startDate, endDate);
        }
      );
    }
  }

  makeGraph2(startDate, endDate) {
    this.graph2Data = [];
    this.userService.getCompanyStockDetails(this.companyForm.value.company2.id).subscribe(res => {
      if(res == null){
        this.isGraphLoading = false;
        Swal.fire('No Data!', 'The company'+ this.companyForm.value.company2.name+' has no Data', "error");
        return;
      }
      res.forEach(objData => {
        if(objData.date >= startDate && objData.date <= endDate){
          this.barChartLabelsGraph.push(objData.date);
          this.graph2Data.push(objData.dayClose);
        }
      });
    },
      err => console.log(err),
      () => {
        this.barChartDataGraph2 = [
          {
            data: this.graph2Data,
            label: this.companyForm.value.company2.code
          },
          {
            data: this.graph1Data,
            label: this.companyForm.value.company1.code
          }
        ];
        this.isGraphLoading = false;
      }
    );
  }

  onSubmit() {
    if (!this.companyForm.valid) {
      Swal.fire('Invalid Input !', 'Please check the values provided by you', "error");
    }
    else {
      this.isGraphLoading = true;
      this.isClicked = true;
      //call the method for making graph1
      this.makeGraph1('bar');
      //call the method for making graph2
    }
  }

  viewCompany1Details(){
    this.router.navigate(['/company-details',this.companyForm.value.company1]);
  }

  viewCompany2Details(){
    this.router.navigate(['/company-details',this.companyForm.value.company2]);
  }
}
