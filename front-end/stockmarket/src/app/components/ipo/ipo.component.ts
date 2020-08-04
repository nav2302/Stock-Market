import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.css']
})
export class IpoComponent implements OnInit {

  id: number;
  private sub: any;
  auth_token: string;
  hasNext:boolean;
  hasPrevious: boolean;
  ipos:[];
  companyName:any;
  page:any;

  constructor(private route: ActivatedRoute, 
    private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
   });
   this.findIpos();
  }


  findIpos(){
    if (this.authService.isAuthenticated()) {
      this.auth_token = this.authService.getToken();
      this.userService.getIpoDetails(this.auth_token, this.id).subscribe(res => {
        this.hasNext = res.hasNext;
        this.page = res.ipos;
        this.hasPrevious = res.hasPrevious;
        this.ipos = res.ipos.content;
        console.log(this.ipos);
        for(var ipo in this.ipos){
          this.companyName = this.ipos[ipo];
          break;
        }
      })
    }
  }

  getIpoPaging(formpage:number, formsize:number){
    this.userService.getIpoDetailsWithPaging(this.auth_token, this.id, formpage, formsize).subscribe(res => {
        this.hasNext = res.hasNext;
        this.page = res.ipos;
        this.hasPrevious = res.hasPrevious;
        this.ipos = res.ipos.content;
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
