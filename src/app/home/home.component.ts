import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') publicacoes: any

  constructor(
    private autenticacaoService: AutenticacaoService
  ) { }

  ngOnInit(): void {
  }

  sair(): void{
    this.autenticacaoService.sair()
  }

  atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine()
  }
}
