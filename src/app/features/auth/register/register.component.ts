import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../../../core/services/auth.service";
import {ApiService} from "../../../core/services/api.service";
import {FormsModule} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router, private toast: ToastrService) {}

  onSubmit(): void {
    this.errorMessage = '';
    const credentials = { email: this.email, password: this.password ,firstName: this.firstName, lastName: this.lastName};
    this.apiService.post('auth/register', credentials).subscribe({
      next: (response) => {
        console.log('dang ky thanh cong:', response);
        // @ts-ignore
        this.router.navigate(['/auth']);
        this.toast.success('Đăng ký thành công', 'Thành công', {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          closeButton: true
        });
      },
      error: (error) => {
        console.error('Đăng ký thất bại:', error);
        this.errorMessage = error;
      }
    });
  }
}
