// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <--- Verifica esta importación

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // <--- ESTO ACTIVA LOS CLICS
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }