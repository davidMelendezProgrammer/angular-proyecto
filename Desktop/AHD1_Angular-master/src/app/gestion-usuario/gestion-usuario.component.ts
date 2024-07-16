// gestion-usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  nombre: string;
  edad: number;
  dpi: string;
}

@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.css']
})
export class GestionUsuarioComponent implements OnInit {
  usuario: Usuario = { nombre: '', edad: 0, dpi: '' };
  usuarios: Usuario[] = [];
  editIndex: number = -1;

  ngOnInit() {
    this.cargarUsuarios();
  }

  onSubmit() {
    if (this.validateUsuario(this.usuario)) {
      if (this.editIndex === -1) {
        this.usuarios.push({ ...this.usuario });
      } else {
        this.usuarios[this.editIndex] = { ...this.usuario };
        this.editIndex = -1;
      }
      this.guardarUsuarios();
      this.usuario = { nombre: '', edad: 0, dpi: '' };
    } else {
      alert('Por favor, corrige los errores en el formulario.');
    }
  }

  guardarUsuarios() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }
  }

  cargarUsuarios() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('usuarios');
      if (data) {
        this.usuarios = JSON.parse(data);
      }
    }
  }

  onEdit(index: number) {
    this.usuario = { ...this.usuarios[index] };
    this.editIndex = index;
  }

  onDelete(index: number) {
    this.usuarios.splice(index, 1);
    this.guardarUsuarios();
  }

  validateUsuario(usuario: Usuario): boolean {
    if (!usuario.nombre || usuario.nombre.length === 0) {
      return false;
    }
    if (usuario.edad < 18 || !usuario.edad) {
      return false;
    }
    const dpiPattern = /^\d{13}$/;
    if (!dpiPattern.test(usuario.dpi)) {
      return false;
    }
    return true;
  }
}
