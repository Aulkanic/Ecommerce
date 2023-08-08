import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStore } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private useraction: UserStore
    ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [''],
      mobileNumber: [''],
      email: [''],
      password: ['']
    });
  }
  signup() {
    if (this.signupForm.invalid) {
      return;
    }

    const loader = this.snackBar.open('Logging in...', undefined, { duration: -1 });
    const formData = this.signupForm.value;
    this.useraction.signup(formData.name,formData.mobileNumber,formData.email,formData.password)
      .subscribe(res=>{
        if(res.success === 1){
          this.snackBar.open(res.message, 'Close', { duration: 5000 });
          this.signupForm.reset();
          this.router.navigate(['login'])
        }else{
          this.snackBar.open(res.message, "close", { duration: 5000 });
          this.router.navigate(['signup'])
        }

      },err=>{
        this.snackBar.open('Error', 'Close', { duration: 5000 });
      },
      () => {
        // Hide the spinner loader on completion
        loader.dismiss();
      })
  }
  }
