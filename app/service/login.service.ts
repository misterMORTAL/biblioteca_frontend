import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private token: string = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  setToken(token: string): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  // Agrega lógica para enviar el token con las solicitudes al backend
  // Puedes agregar un interceptor HTTP para manejar esto de manera más centralizada
  // Pero por ahora, aquí hay un ejemplo básico:
  getAuthenticatedData(): Observable<any> {
    console.log('Token:', this.getToken());
    const headers = { Authorization: `Bearer ${this.getToken()}` };
    return this.http.get(`${this.apiUrl}/user-info`, { headers });
  }
  

  //envia email desde el front al backend
  sendResetEmail(email: string): Observable<any> {
    const resetUrl = `${this.apiUrl}/send-reset-email`;
    return this.http.post(resetUrl, { email });
  }

  // Restablece la contraseña con el token y la nueva contraseña
  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
}
