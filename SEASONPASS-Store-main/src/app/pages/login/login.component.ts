import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../../services/store.service';
import { UserStore } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData: any = {};
  loginfrm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar,
    private storeddata: StoreService,
    private useraction: UserStore
    ) { }

  ngOnInit(): void {
    this.loginfrm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    if (this.loginfrm.invalid) {
      return;
    }

    const loader = this.snackBar.open('Logging in...', undefined, { duration: -1 });
    const formData = this.loginfrm.value;
    this.useraction.login(formData.email,formData.password)
      .subscribe((res)=>{
        console.log(res)
        if(res.success === 1){
          this.userData = res.user
          localStorage.setItem('User',JSON.stringify(this.userData));
          this.useraction.updateUser(res.user);
          this.snackBar.open(res.message, 'Close', { duration: 5000 });
          this.loginfrm.reset();
          this.storeddata.sendData(res.user)
          setTimeout(() => {
            Swal.fire({
              title: `Welcome ${res.user.name}`,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
            this.router.navigate(['home']);
          }, 1000);
  
        }else{
          this.snackBar.open(res.message, 'Close', { duration: 5000 });
          this.loginfrm.reset();
          this.router.navigate(['login'])  
        }

      },err=>{
        this.snackBar.open('Error', 'Close', { duration: 5000 });
        alert('Error')

      },
      () => {
        // Hide the spinner loader on completion
        loader.dismiss();
      }
      )

  }

  logout() {
    // Remove the token from local storage on logout
    localStorage.removeItem('User');
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in based on the token presence
    return !!localStorage.getItem('User');
  }

  getUser(): string | null {
    return localStorage.getItem('User');
  }

}
