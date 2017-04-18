import { Component, OnInit } from '@angular/core';
import { pageTransition } from '../animations';

import { IUser } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [ pageTransition ]
})
export class UserListComponent implements OnInit {
  state = 'in';
  errorMessage: string;
  users: IUser[];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.state = (this.state === 'in' ? 'out' : 'in');

    this._userService.getUsers()
                     .subscribe(users => this.users = users.sort(this.compare),
                                error => this.errorMessage = <any>error);
  }

  compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

}
