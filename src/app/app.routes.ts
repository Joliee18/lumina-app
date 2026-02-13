import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';
import { RegistrarPersonaComponent } from './registrar-persona/registrar-persona.component';
import { PersonaPrincipalComponent } from './persona-principal/persona-principal';
import { MensajesBdComponent } from './mensajes-bd/mensajes-bd.component'; // <--- Verifica que el nombre sea exacto
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'registrar-persona', component: RegistrarPersonaComponent },
  { path: 'mensajes-bd', component: MensajesBdComponent }, // <--- Esta ruta debe coincidir con el botón
  { path: 'persona-principal', component: PersonaPrincipalComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: '**', component: PaginaNoEncontradaComponent } // <-- AQUÍ

];