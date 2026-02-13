  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-persona-principal',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './persona-principal.html',
    styleUrls: ['./persona-principal.css']
  })
  export class PersonaPrincipalComponent implements OnInit {
    titulo: string = 'Panel de Control';
    descripcion: string = 'Bienvenido al sistema de gestión LÚMINA. Aquí puedes monitorear la actividad global.';
    fechaActual: string = '';

    usuario = {
      nombre: 'Melani Silva',
      rol: 'Administradora de Sistemas',
      email: 'melani.admin@lumina.com'
    };

    ngOnInit(): void {
      const hoy = new Date();
      this.fechaActual = hoy.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }

    mostrarMensaje(): void {
      alert('Iniciando proceso de verificación de registros pendientes...');
    }
  }