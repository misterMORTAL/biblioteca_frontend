import { Component, OnInit } from '@angular/core';
import { ServiceAuthors } from 'src/app/service/service.authors';
import { BooksComponent } from '../books/books.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  filtro: string = '';
  author:  string='';
  authService: any;
  editando: boolean = false;
  listar: any[] = [];
  datoEditado: any = { authorName: '', };
  modoEdicion: boolean = false;
  constructor(private extraer: ServiceAuthors) {}

  ngOnInit() {
    this.traer();
  }
    //Funcion para Enlistar datos
    traer() {
      this.extraer.datos().subscribe(data => {
        this.listar = data.filter((dato: any) =>
        dato.authorName.toLowerCase().includes(this.filtro.toLowerCase())
        );
        console.log(this.listar);
      });
    }
  // Paginador
  first: number = 0;

    rows: number = 10;

    onPageChange(event: any): void {
      // Log the event to see its structure
      console.log(event);

      // Adjust this part based on the actual structure of the event
      this.first = event.first;
      this.rows = event.rows;
    }

    //Funcion para agregar datos:
    agregarDato(){
      const data = {
        authorName: this.author
      };
    
      this.extraer.agregarDato(data).subscribe(response => {
        console.log('Dato agregado', response);
        this.traer(); 
        // Puedes agregar lógica adicional aquí si es necesario
        this.author ='';
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
          console.log('Author eliminado', response);
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