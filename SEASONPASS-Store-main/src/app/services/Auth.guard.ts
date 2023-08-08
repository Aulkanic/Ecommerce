import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginComponent, private router: Router) { }

  async canActivate(): Promise<boolean>  {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      await  Swal.fire({
            icon: 'warning',
            title: 'Access Denied',
            text: 'Please Login first to continue',
          })
      this.router.navigate(['login']);
      return false;
    }
  }
}
