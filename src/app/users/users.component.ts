import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public myData: any;
  public _UserFilter = "";
  public filteredUser: any[] = [];


  constructor(private userService: UserServiceService) { }

  ngOnInit(): void{
    this.afficher();
  }

  public get userFilter(): any {
    return this._UserFilter;
  }

  public nom :any= this._UserFilter

  public set userFilter(filter: string) {
    this._UserFilter = filter;
    this.filteredUser = this._UserFilter ? this.filterUsers(this.userFilter) : this.myData;
  }

  private filterUsers(criteria: string): any[]{
    criteria = criteria.toLocaleLowerCase();
    const res = this.myData.filter(
      (user: any) => user.name.toLocaleLowerCase().indexOf(criteria) !== -1
    );
    return res;
  }

  afficher() {
    this.userService.userData().subscribe((data) => {
      this.myData = data;
      this.filteredUser = this.myData
    });
  }
}
