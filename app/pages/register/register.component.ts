import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ServiceRegisterService } from 'src/app/service/service-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  filtro: string = '';
  name: string = '';
  lastname: string = '';
  address: string = '';
  email: string = '';
  password: string = '';
  authService: any;
  editando: boolean = false;
  listar: any[] = [];
  nuevoDato: string='';
  datoEditado: any = { name: '', lastname: '', address: '', email: '', password: '' };
  modoEdicion: boolean = false;
  datos:any;
  
  

  constructor(private extraer: ServiceRegisterService
    ) {

      this.datos= new FormGroup({
        correo: new FormGroup('',[Validators.required, Validators.email]),
        asunto: new FormGroup('',Validators.required),
        mensaje:new FormGroup('',Validators.required)
      })
    }

    enviocorreo(){
      let params= {
        email: this.datos.value.correo,
        asunto: this.datos.value.asunto,
        mensaje: this.datos.value.mensaje
      }
      console.log(params)
      //this.httpclien.post('http://localhost:3000/register')
    }
  
  ngOnInit() {
    this.traer();
  }
    //Funcion para Enlistar datos
    traer() {
      this.extraer.datos().subscribe(data => {
        this.listar = data.filter((dato: any) =>
          dato.name.toLowerCase().includes(this.filtro.toLowerCase()) ||
          dato.lastname.toLowerCase().includes(this.filtro.toLowerCase()) ||
          dato.address.toLowerCase().includes(this.filtro.toLowerCase()) ||
          dato.email.toLowerCase().includes(this.filtro.toLowerCase()) ||
          dato.password.toLowerCase().includes(this.filtro.toLowerCase())
        );
        console.log(this.listar);
      });
    }

  first: number = 0;

    rows: number = 10;

    onPageChange(event: any) {
      // Log the event to see its structure
      console.log(event);

      // Adjust this part based on the actual structure of the event
      this.first = event.first;
      this.rows = event.rows;
    }

    


    //Funcion para agregar datos:
    agregarDato(){
      const data = {
        name: this.name,
        lastname: this.lastname,
        address: this.address,
        email: this.email,
        password: this.password,
      };
    
      this.extraer.agregarDato(data).subscribe(response => {
        console.log('Dato agregado', response);
        this.traer(); 
        this.name = '' 
        this.lastname = '' 
        this.email = '' 
        this.address = '' 
        this.password = '' 
      });
    }

    //modal nuevo
    displayCorreo: boolean= false;
    displayDialog: boolean = false;
    exDialog: boolean = false;

    //modal de correo

    showCorreo(){
      this.displayCorreo= true;
      
    }

    showDialog() {
    this.displayDialog = true;
    
    }
    hideDialog() {
      this.displayDialog = false;
      }

    //Formulario de editar
    EditDialog() {
      this.exDialog = true;
      }
    exitDialog() {
      this.exDialog = false;
      }

    //Funcion para eliminar datos
    eliminar(dato: any) {
      if (confirm('¿Estas seguro de eliminar este registro?')) {
        this.extraer.eliminar(dato.id).subscribe(response => {
          console.log('Usuario eliminado', response);
          // Actualiza la lista después de eliminar
          this.traer();
        });
      }
    }
 
  
    editarDato(dato: any) {
      this.datoEditado = { ...dato };
      this.modoEdicion = true;
      this.exDialog = true;
    }
  
    guardarEdicion() {
      // Lógica para guardar la edición (puedes llamar al servicio correspondiente)
      this.extraer.editarDato(this.datoEditado.id, this.datoEditado).subscribe(response => {
        console.log('Dato editado', response);
        this.exDialog = true;
        this.traer(); // Actualizar la lista después de editar un dato
        this.exDialog = false;
      });
      this.exDialog = true;
    }
  
    cancelarEdicion() {
      this.modoEdicion = false;
    }
    
}