import { Component } from '@angular/core';
import { GestionUsuarioComponent } from './gestion-usuario/gestion-usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GestionUsuarioComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corregido: styleUrls en vez de styleUrl
})
export class AppComponent {}