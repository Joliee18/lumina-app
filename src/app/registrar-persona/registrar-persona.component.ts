import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-persona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.css']
})
export class RegistrarPersonaComponent {
  captchaCheck: boolean = false;

  persona = {
    nombre: '',
    correo: '',
    edad: null,
    tel: '',
    pass: '',
    cpass: ''
  };

  // Objeto para almacenar estados de validación y mensajes de error
  errors = {
    nombre: { hasError: false, message: '' },
    correo: { hasError: false, message: '' },
    edad: { hasError: false, message: '' },
    tel: { hasError: false, message: '' },
    pass: { hasError: false, message: '' },
    cpass: { hasError: false, message: '' }
  };

  // Método para validar en tiempo real
  validateField(fieldName: keyof typeof this.persona, value: any): void {
    switch (fieldName) {
      case 'nombre':
        this.errors.nombre.hasError = !value || value.trim() === '';
        this.errors.nombre.message = this.errors.nombre.hasError ? 'El nombre es requerido' : '';
        
        // También validar patrón si hay valor
        if (value && !/^[^;\-]*$/.test(value)) {
          this.errors.nombre.hasError = true;
          this.errors.nombre.message = 'El nombre contiene caracteres no permitidos';
        }
        break;

      case 'correo':
        const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        this.errors.correo.hasError = !value || !emailPattern.test(value);
        this.errors.correo.message = this.errors.correo.hasError ? 'Correo electrónico inválido' : '';
        break;

      case 'edad':
        const age = Number(value);
        this.errors.edad.hasError = !value || age < 18 || age > 99;
        this.errors.edad.message = this.errors.edad.hasError ? 'La edad debe ser entre 18 y 99 años' : '';
        break;

      case 'tel':
        const telPattern = /^[0-9]{10}$/;
        this.errors.tel.hasError = !value || !telPattern.test(value);
        this.errors.tel.message = this.errors.tel.hasError ? 'El teléfono debe tener 10 dígitos' : '';
        break;

      case 'pass':
        this.errors.pass.hasError = !value || value.length < 8;
        this.errors.pass.message = this.errors.pass.hasError ? 'La contraseña debe tener al menos 8 caracteres' : '';
        
        // Validar que las contraseñas coincidan si cpass ya tiene valor
        if (this.persona.cpass && value !== this.persona.cpass) {
          this.errors.cpass.hasError = true;
          this.errors.cpass.message = 'Las contraseñas no coinciden';
        } else if (this.persona.cpass) {
          this.errors.cpass.hasError = false;
          this.errors.cpass.message = '';
        }
        break;

      case 'cpass':
        this.errors.cpass.hasError = !value || value !== this.persona.pass;
        this.errors.cpass.message = this.errors.cpass.hasError ? 'Las contraseñas no coinciden' : '';
        break;
    }
  }

  // Método para validar todo el formulario
  validateAll(): boolean {
    // Validar cada campo
    Object.keys(this.persona).forEach(field => {
      this.validateField(field as keyof typeof this.persona, this.persona[field as keyof typeof this.persona]);
    });

    // Verificar si hay algún error
    return !Object.values(this.errors).some(error => error.hasError);
  }

  onCaptchaChange(event: any): void {
    this.captchaCheck = event.target.checked;
  }

  finalizarRegistro(): void {
    if (this.validateAll() && this.captchaCheck) {
      alert("✅ Registro procesado exitosamente.");
      // Aquí podrías enviar los datos a tu backend
      console.log('Datos registrados:', this.persona);
    } else {
      alert("❌ Por favor corrige los errores en el formulario.");
    }
  }

  // Método para limpiar errores cuando el usuario comienza a escribir
  onFieldFocus(fieldName: keyof typeof this.errors): void {
    this.errors[fieldName].hasError = false;
    this.errors[fieldName].message = '';
  }

  // Verificar si el formulario está listo para enviar
  isFormReady(): boolean {
    const allFieldsFilled = Object.values(this.persona).every(value => 
      value !== null && value !== '' && value !== undefined
    );
    
    const noErrors = !Object.values(this.errors).some(error => error.hasError);
    
    return allFieldsFilled && noErrors && this.captchaCheck;
  }
}