import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Company } from '../../Model/Company';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {

  
  id: string;
  private sub: any;
  company: Company;
  auth_token: string;
  ipos: Array<any>;
  stockExchanges: [];
  date: any = new Date();
  stockInformation: any;
  category: any = [];
  data: any = [];
  dateForm: FormGroup;
  message: string;
  average: number;
  minimum: number;
  maximum: number;
  Growth: number;
  excelData:any =[];

  public barChartLabels: any = [];
  public barChartData: any = [{ data: [] }];
  public barChartOptions = {
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
          fontColor: 'green',
          userCallback: function (tick) {
            return tick % 40 == 0 ? null : tick;
          }
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
  public barChartColors: any = [
    {
      backgroundColor: 'rgba(255,255,0,0.5)',
      borderColor: '#f0ad4e',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: 'white',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ]
  public barChartType = 'line';
  public barChartLegend = true;


  constructor(private route: ActivatedRoute,
    private authService: AuthService, private userService: UserService,
    private formBuilder: FormBuilder, private zone: NgZone,
    private router: Router) { }



  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.findComapny();

    this.dateForm = this.formBuilder.group({
      startDate: '',
      endDate: ''
    });
  }

  findComapny() {
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.userService.getCompanyDetails(this.auth_token, this.id).subscribe(res => {
        if(res.company){
          this.company = res.company;
          this.ipos = res.ipos;
          this.stockExchanges = res.company.stockExchanges;
          this.findStockDetails('line');
        }
        else{
          Swal.fire('Invalid Search !', 'Company Does not Exists, May have been Removed :-(', "error");
          this.router.navigate(['/home']);  
        }
      });
    }
  }

  findStockDetails(barType: string) {
    var startDate = "2020-01-16";
    var endDate = '2020-08-30';
    if (this.dateForm.value.startDate !== '') {
      startDate = this.dateForm.value.startDate;
      endDate = this.dateForm.value.endDate;
    }
    if (startDate > endDate) {
      Swal.fire('Wrong Input!', 'Start Date cannot be greater than End Date', "error");
      return;
    }
    else {
      this.data = [];
      this.excelData = [];
      this.barChartLabels = [];
      this.barChartType = barType;
      this.average = 0;
      this.minimum = 0;
      this.maximum = 0;
      this.Growth = 0;
      var sum=0;
      this.userService.getCompanyStockDetails(this.company.id).subscribe(res => {
        if(typeof(res) == 'undefined' || res == null){
          Swal.fire('No Graph Available!', 'Graph Data for this company has not been Uploaded by Admin', "error");
          this.data.push(null);
          return;
        }
        res.forEach(objData => {
          if(objData.date >= startDate && objData.date <= endDate){
            this.barChartLabels.push(objData.date);
            sum = sum + objData.dayClose;
            this.data.push(objData.dayClose);
            this.excelData.push([objData.date, objData.dayOpen, objData.dayClose, objData.dayHigh, objData.dayLow,
              objData.volumeTraded]);
          }
        });
      },
        err => console.log(err),
        () => {
          this.barChartData = [{
            data: this.data,
            label: this.company.companyCode
          }]

          this.minimum = Math.min(...this.data);
          this.maximum = Math.max(...this.data);
          this.average = +((sum / this.data.length).toFixed(2));
          this.Growth = +(((this.data[0] - this.data[this.data.length-1])/this.minimum)*100).toFixed(2); 

        }
      );
    }
  }

  generateExcel(){
    const header = ["Date", "Day Open", "Day Close", "Day High", "Day Low", "Volume Traded"];
    const title = "Your Stock";
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Stock Data');

    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true }
    worksheet.addRow([]);
    worksheet.addRow(['Date : ' + new Date()]);
    worksheet.addRow(['Minimum : ' + this.minimum]);
    worksheet.addRow(['Maximum : ' + this.maximum]);
    worksheet.addRow(['Average : ' + this.average]);
    worksheet.addRow(['Growth : ' + this.Growth]);
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    this.excelData.forEach(d => { worksheet.addRow(d);});

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'StockData.xlsx');
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
