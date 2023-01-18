import { UsuarioService } from './services/usuario.service';
import { Usuario } from './models/Usuario';
import { Elemento } from './models/Elemento';
import { Component } from '@angular/core';
import { Elementoservice } from './services/elemento.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-http';

  usuario = {} as Usuario;
  usuarios!: Usuario[];

  elemento = {} as Elemento;
  elementos!: Elemento[];

  constructor(
    private elementoService: Elementoservice,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.getElementos();
  }


  saveElemento(form: NgForm) {
    this.elementoService.saveElemento(this.elemento).subscribe(() => {
      this.cleanFormElemento(form);
    });
  }

  // Chama o serviço para obter todos os elementos
  getElementos() {
    this.elementoService.getElementos().subscribe((elementos: Elemento[]) => {
      this.elementos = elementos;
    });
  }

  // Chama o serviço para obter todos os usuarios
  getUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  

  // deleta um elemento
  deleteElemento(elemento: Elemento) {
    this.elementoService.deleteElemento(elemento).subscribe(() => {
      this.getElementos();
    });
  }

  // limpa o formulario
  cleanFormElemento(form: NgForm) {
    this.getElementos();
    form.resetForm();
    this.elemento = {} as Elemento;
  }
}
