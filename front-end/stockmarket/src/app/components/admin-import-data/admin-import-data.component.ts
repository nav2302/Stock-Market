import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { HttpEventType } from '@angular/common/http';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-admin-import-data',
  templateUrl: './admin-import-data.component.html',
  styleUrls: ['./admin-import-data.component.css']
})
export class AdminImportDataComponent implements OnInit {

  private sub: any;
  companyId: number;
  auth_token: string;
  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  constructor(private route: ActivatedRoute,
    private authService: AuthService, private router: Router,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.companyId = params['id'];
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress = 0;
  
    this.currentFile = this.selectedFiles.item(0);
    this.adminService.uploadExcelData(this.currentFile,this.companyId).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        }
        else if(event.type === HttpEventType.Response) {
          console.log('File successfully created!', event.body);
          if(event.body.status == "600"){
            this.progress = 0;
            this.message = event.body.message;
            this.currentFile = undefined;
          }
          else{
            this.progress = 0;
            this.message = 'File Uploaded Successfully';
            this.currentFile = undefined;
          }
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });
  
    this.selectedFiles = undefined;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
