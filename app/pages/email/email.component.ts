import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/service/login.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  newPassword: string = '';
  token: string | null = null;
  resetError: boolean = false;
  resetSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  onResetPassword(): void {
    if (this.token && this.newPassword) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(
        () => {
          console.log('Contraseña restablecida con éxito');
          // Puedes redirigir a la página de inicio de sesión u otra página según tu aplicación
          // y mostrar un mensaje de éxito
          this.resetSuccess = true;

          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error al restablecer la contraseña', error);
          // Maneja el error, muestra un mensaje al usuario, etc.
          this.resetError = true;
        }
      );
    }
  }
}
