import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = false;
  userName: string | undefined;
  userLastName: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedData().subscribe(
      (userInfo: any) => {
        this.userName = userInfo.name; 
        this.userLastName = userInfo.lastname;
      },
      (error: any) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
