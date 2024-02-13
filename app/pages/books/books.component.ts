import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { ServiceBooksService } from 'src/app/service/service-books.service';
import { ServiceAuthors } from 'src/app/service/service.authors';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [DialogService, MessageService]
})
export class BooksComponent  implements OnInit {
  filtro: string = '';
  title:  string='';
  publicationDate: string='';
  // author:  string='';
  // category:  string='';
  // publisher:  string='';
  language:  string='';
  pages:  string='';
  description:  string='';
  authService: any;
  editando: boolean = false;
  listar: any[] = [];
  listarAuthors: any[] = [];
  listarCompleto: any[] = []; 
  datoEditado: any = { title: '', publicationDate: '', author: '', category: '',publisher: '', language: '', pages: '', description: ''};
  modoEdicion: boolean = false;
  constructor(private extraer: ServiceBooksService ) {}

  ngOnInit() {
    this.traer();
  }
    //Funcion para Enlistar datos
    traer() {
      forkJoin([
        this.extraer.datos(),
        this.extraer.datosCategory(),
        this.extraer.datosEditorial(),
        this.extraer.datosAuthor(),
      ]).subscribe(responses => {
        const data1 = responses[0];
        const data2 = responses[1]; 
        const data3 = responses[2];
        const data4 = responses[3];
    
        // Combina los datos de ambas solicitudes
        this.listar = [];
    
        for (let i = 0; i < Math.max(data1.length, data2.length, data3.length, data4.length); i++) {
          const combinedData = {
            title: data1[i]?.title || '',
            publicationDate: data1[i]?.publicationDate || '',
            authorName: data4[i]?.authorName || '',  
            categoryName: data2[i]?.categoryName || '',
            publisherName: data3[i]?.publisherName || '',
            language: data1[i]?.language || '',
            pages: data1[i]?.pages || '',
            description: data1[i]?.description || ''
          };
    
          this.listar.push(combinedData);
        }
        
        this.listar = this.listar.filter((dato: any) =>
        dato.title.toLowerCase().includes(this.filtro.toLowerCase()) ||
        dato.categoryName.toLowerCase().includes(this.filtro.toLowerCase()) ||
        dato.authorName.toLowerCase().includes(this.filtro.toLowerCase()) ||
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
        title: this.title,
        publicationDate: this.publicationDate,
        // author: this.author,
        // category: this.category,
        // publisher: this.publisher,
        language: this.language,
        pages: this.pages,
        description: this.description,
      };
    
      this.extraer.agregarDato(data).subscribe(response => {
        console.log('Dato agregado', response);
        this.traer(); 
        this.exDialog = false;
        this.title = '';
        this.publicationDate ='';
        // this.author ='';
        // this.category ='';
        // this.publisher ='';
        this.language ='';
        this.pages = '';
        this.description ='';
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
          console.log('Libro eliminado', response);
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