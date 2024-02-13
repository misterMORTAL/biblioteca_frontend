import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el módulo Router
import { AuthService } from 'src/app/service/login.service';
import { LoginModel } from 'src/app/pages/login/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: LoginModel = { email: '', password: '' };
  loginError: boolean = false;
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.credentials = { email: '', password: '' };
  }

  onSubmit(): void {
    console.log('Intentando iniciar sesión con credenciales:', this.credentials);

    this.authService.login(this.credentials.email, this.credentials.password).subscribe(
      (response) => {
        // Manejar la respuesta exitosa del servidor aquí
        console.log('Inicio de sesión exitoso', response);

        // Almacena el token después de una autenticación exitosa
        this.authService.setToken(response.token);

        // Marcar como éxito y redirigir al dashboard
        this.loginSuccess = true;

        // Redirige al usuario al dashboard después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        });
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error en el inicio de sesión', error);

        // Verificar si el error contiene información adicional
        if (error.error && error.error.message) {
          console.error('Mensaje de error:', error.error.message);
        }

        // Marcar como error
        this.loginError = true;

        // Oculta el mensaje de error después de 5 segundos
        setTimeout(() => {
          this.loginError = false;
        }, 2000);
      }
    );
  }
  onForgotPassword(): void {
    this.authService.sendResetEmail(this.credentials.email).subscribe(
      () => {
        // Mostrar un mensaje de éxito o redirigir a una página de éxito
        console.log('Correo electrónico de restablecimiento enviado con éxito');
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al enviar el correo electrónico de restablecimiento', error);
      }
    );}


    displayDialog: boolean = false;

  showDialog() {
    this.displayDialog = true;
  }

  hideDialog() {
    this.displayDialog = false;
  }
  
}
