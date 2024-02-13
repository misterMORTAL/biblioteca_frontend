import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ServiceRentalsService } from 'src/app/service/service-rentals.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.css']
})
export class RentalsComponent implements OnInit {
  filtro: string = '';
  readers:  string='';
  books:  string='';
  departureDates: Date = new Date();
  entryDates:  Date = new Date();
  authService: any;
  editando: boolean = false;
  listar: any[] = [];
  datoEditado: any = { reader: '', book: '', departureDate: '', entryDate: '', };
  modoEdicion: boolean = false;
  constructor(private extraer: ServiceRentalsService) {}

  ngOnInit() {
    this.traer();
  }
    //Funcion para Enlistar datos
    traer() {
      forkJoin([
        this.extraer.datos(),
        this.extraer.datosBook()
      ]).subscribe(responses => {
        const data1 = responses[0];
        const data2 = responses[1];
    
        // Combina los datos de ambas solicitudes
        this.listar = [];
    
        for (let i = 0; i < Math.max(data1.length, data2.length); i++) {
          const combinedData = {
        
            title: data2[i]?.title || '',
            departureDate: data1[i]?.departureDate || '',
            entryDate: data1[i]?.entryDate || ''
          };
    
          this.listar.push(combinedData);
        }
          
        this.listar = this.listar.filter((dato: any) =>
        dato.readers.toLowerCase().includes(this.filtro.toLowerCase()) ||
        dato.book.toLowerCase().includes(this.filtro.toLowerCase()) ||
        dato.departureDate.toLowerCase().includes(this.filtro.toLowerCase()) ||
        dato.entryDate.toLowerCase().includes(this.filtro.toLowerCase())
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
        reader: this.readers,
        book: this.books,
        departureDate: this.departureDates,
        entryDate: this.entryDates,
      };
    
      this.extraer.agregarDato(data).subscribe(response => {
        console.log('Dato agregado', response);
        this.traer(); 
        this.readers = '';
        this.books ='';
        this.departureDates = new Date();
        this.entryDates = new Date();
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
          console.log('Alquiler eliminado', response);
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