import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.auth.isAuthenticated();
  }

}

