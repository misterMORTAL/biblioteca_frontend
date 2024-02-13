import { Component, OnInit } from '@angular/core';
import { ServiceEditorialsService } from 'src/app/service/service-editorials.service';

 
@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent  implements OnInit {
  filtro: string = '';
  authService: any;
  editando: boolean = false;
  listar: any[] = [];
  publisher: string = '';
  datoEditado: any = { publisherName: '' };
  modoEdicion: boolean = false;
  constructor(private extraer: ServiceEditorialsService) {}

  ngOnInit() {
    this.traer();
  }
    //Funcion para Enlistar datos
    traer() {
      this.extraer.datos().subscribe(data => {
        this.listar = data.filter((dato: any) =>
          dato.publisherName.toLowerCase().includes(this.filtro.toLowerCase())
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
        publisherName: this.publisher,
      };
    
      this.extraer.agregarDato(data).subscribe(response => {
        console.log('Dato agregado', response);
        this.traer();
        this.publisher = '' 
        // Puedes agregar lógica adicional aquí si es necesario
      });
    }

    //modal nuevo

    displayDialog: boolean = false;
    exDialog: boolean = false;



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
          console.log('Editorial eliminado', response);
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

