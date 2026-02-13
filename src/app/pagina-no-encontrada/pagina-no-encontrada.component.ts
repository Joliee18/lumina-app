import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagina-no-encontrada',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pagina-no-encontrada.component.html',
  styleUrls: ['./pagina-no-encontrada.component.css']
})
export class PaginaNoEncontradaComponent implements OnInit {
  attemptedUrl: string = '';
  currentTime: string = '';
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.updateTime();
    
    // Actualizar hora cada minuto
    setInterval(() => {
      this.updateTime();
    }, 60000);
    
    // Capturar la URL que intentó acceder
    this.route.url.subscribe(urlSegments => {
      this.attemptedUrl = urlSegments.join('/');
    });
    
    // También intentar obtener de los query params
    this.route.queryParams.subscribe(params => {
      if (params['from']) {
        this.attemptedUrl = params['from'];
      }
    });
    
    // Efecto de partículas (opcional)
    this.createParticles();
  }

  // Actualizar la hora actual
  private updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Volver a la página anterior
  goBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  // Ir a la página de inicio
  goHome(): void {
    this.router.navigate(['/inicio']);
  }

  // Recargar la página
  reloadPage(): void {
    window.location.reload();
  }

  // Crear efecto de partículas (opcional)
  private createParticles(): void {
    const container = document.querySelector('.error-container');
    if (!container) return;

    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición aleatoria
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Tamaño aleatorio
      const size = Math.random() * 10 + 5;
      
      // Duración de animación aleatoria
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      
      // Aplicar estilos
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      
      // Color aleatorio
      const colors = [
        'rgba(255, 107, 107, 0.3)',
        'rgba(108, 92, 231, 0.3)',
        'rgba(0, 184, 148, 0.3)',
        'rgba(253, 121, 168, 0.3)',
        'rgba(9, 132, 227, 0.3)',
        'rgba(253, 203, 110, 0.3)'
      ];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);
    }
  }

  // Método para obtener todas las rutas disponibles (opcional)
  getAvailableRoutes(): string[] {
    return [
      '/inicio',
      '/registrar-persona',
      '/mensajes-bd',
      '/persona-principal'
    ];
  }
}