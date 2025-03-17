import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5273/api'; // Thay bằng URL API của bạn

  constructor(private http: HttpClient) {}

  /**
   * Tạo headers mặc định (có thể thêm JWT token nếu cần)
   */
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Lấy JWT token từ localStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  /**
   * Xử lý lỗi chung cho các request
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Đã xảy ra lỗi!';
    if (error.error instanceof ErrorEvent) {
      // Lỗi phía client
      errorMessage = `Lỗi: ${error.error.message}`;
    } else {
      // Lỗi phía server
      errorMessage = `Mã lỗi: ${error.status}, Thông báo: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  /**
   * Phương thức GET
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    const headers = this.getHeaders();
    const httpParams = new HttpParams({ fromObject: params });
    return this.http
      .get<T>(`${this.baseUrl}/${endpoint}`, { headers, params: httpParams })
      .pipe(catchError(this.handleError));
  }

  /**
   * Phương thức POST
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Phương thức PUT
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http
      .put<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Phương thức DELETE
   */
  delete<T>(endpoint: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http
      .delete<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Phương thức PATCH
   */
  patch<T>(endpoint: string, body: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http
      .patch<T>(`${this.baseUrl}/${endpoint}`, body, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Phương thức tải lên file (Upload)
   */
  uploadFile<T>(endpoint: string, file: File): Observable<T> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    });
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post<T>(`${this.baseUrl}/${endpoint}`, formData, { headers })
      .pipe(catchError(this.handleError));
  }
}
