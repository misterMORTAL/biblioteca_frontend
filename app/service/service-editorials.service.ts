import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceEditorialsService {
  emit(falsae: any) {
    throw new Error('Method not implemented.');
  }
  public api = "http://localhost:3000/"


  constructor(private http: HttpClient) { }
  // Metodos de authors
//Metodo para Enlistar datos
  public datos():Observable<any>{
    return this.http.get<any>(`${this.api}publisher`)
  };

  $modal = new EventEmitter<any>();
//Metodo para Agregar datos
  public agregarDato(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(`${this.api}publisher`, data, httpOptions)
    .pipe(
      catchError((error: any) => {
        console.error('Error al agregar el dato:', error);
        throw error;
      })
    );
  }
// Metodo para Eliminar datos
  eliminar(id: number): Observable<any> {
    const url = `${this.api}publisher/${id}/`;
    console.log('URL de eliminación:', url);
    return this.http.delete(url)
      .pipe(
        catchError((error: any) => {
          console.error('Error al eliminar la editorial:', error);
          throw error;
        })
      );
  }
 // Método para Editar datos

 public editarDato(id: number, data: any): Observable<any> { // Asegúrate de tener un endpoint que admita la actualización por ID

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  return this.http.put(`${this.api}publisher/${id}`, data, httpOptions)
    .pipe(
      catchError((error: any) => {
        console.error('Error al editar el dato:', error);
        throw error;
      })
    );
}
// Metodos de Books


}


