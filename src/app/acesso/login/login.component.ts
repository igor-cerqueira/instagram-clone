import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() exibirPainel: EventEmitter<string> = new EventEmitter<string>() //uma boa pratica tipar tanto na infrencia do tipo quanto na instancia da classe quanto na

  formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
  }

  exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  autenticar(): void {
    this.autenticacao.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    )
  }
}
