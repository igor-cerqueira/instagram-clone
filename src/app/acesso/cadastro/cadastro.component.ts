import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AutenticacaoService } from 'src/app/autenticacao.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
  }

  exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  cadastrarUsuario(): void {
    // console.log(this.formulario)

    let usuario: Usuario = new Usuario()
    usuario.email = this.formulario.value.email
    usuario.nome_completo = this.formulario.value.nome_completo
    usuario.nome_usuario = this.formulario.value.nome_usuario
    usuario.senha = this.formulario.value.senha

    this.autenticacaoService.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin())

  }


}
