import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ Importa environment

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private apiUrl = `${environment.apiUrl}/Mensajes`;

  constructor(private http: HttpClient) {
    console.log('Modo producción:', environment.production);
    console.log('API URL:', this.apiUrl);
  }

  enviarMensaje(texto: string): Observable<any> {
    return this.http.post(this.apiUrl, { contenido: texto });
  }
}