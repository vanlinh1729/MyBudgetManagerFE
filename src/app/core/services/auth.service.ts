import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Lưu JWT vào localStorage
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Lấy JWT từ localStorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Xóa JWT khỏi localStorage (đăng xuất)
  removeToken(): void {
    localStorage.removeItem('access_token');
  }

  // Kiểm tra xem JWT có hợp lệ không
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Chuyển đổi sang giây
      return decodedToken.exp > currentTime; // Kiểm tra thời gian hết hạn
    } catch (error) {
      console.error('Lỗi giải mã JWT:', error);
      return false;
    }
  }

  // Lấy thông tin người dùng từ JWT
  getUserInfo(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken; // Trả về payload của JWT
    } catch (error) {
      console.error('Lỗi giải mã JWT:', error);
      return null;
    }
  }

  // Đăng xuất
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }
}
