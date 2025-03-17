import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";
import {ApiService} from "../../../core/services/api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    const credentials = { email: this.email, password: this.password };
    this.apiService.post('auth/login', credentials).subscribe({
      next: (response) => {
        console.log('Đăng nhập thành công:', response);
        // @ts-ignore
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Đăng nhập thất bại:', error);
        this.errorMessage = 'Email hoặc mật khẩu không chính xác';
      }
    });
  }
}
