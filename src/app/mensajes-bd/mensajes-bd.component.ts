import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <--- Esto arregla el error NG8002
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-mensajes-bd',
  standalone: true,
  imports: [CommonModule, FormsModule], // <--- Verifica que esté FormsModule aquí
  templateUrl: './mensajes-bd.component.html',
  styleUrl: './mensajes-bd.component.css'
})
export class MensajesBdComponent {
  nuevoContenido: string = '';

  constructor(private mensajeService: MensajeService) {}

  guardarEnBD(): void {
    if (this.nuevoContenido.trim()) {
      // Nombre exacto del método en el servicio
      this.mensajeService.enviarMensaje(this.nuevoContenido).subscribe({
        next: (res: any) => {
          alert('✅ ¡Dato guardado en SQL Server!');
          this.nuevoContenido = ''; // Esto limpia el cuadro de texto
        },
        error: (err: any) => {
          alert('❌ Error: El backend no responde o hay problemas de CORS.');
          console.error(err);
        }
      });
    }
  }
}