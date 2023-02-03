import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase';
import { BdService } from './../../bd.service';
import { ProgressoService } from 'src/app/progresso.service';
import { Observable, interval, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>()

  email: any
  private imagem: any

  progressoPublicacao: string = 'pendente'
  porcetagemUpload: number = 0

  formulario: FormGroup = new FormGroup({
    'legenda':  new FormControl(null)
  })

  constructor(
    private bdService: BdService,
    private progressoService: ProgressoService
    ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user!.email
    })
  }

  publicar(): void {
    this.bdService.publicar({
      email: this.email,
      legenda: this.formulario.value.legenda,
      imagem: this.imagem[0]
    })

    let acompanhamentoUpload = interval(1500)

    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload.pipe(
      takeUntil(continua)
    ).subscribe(() => {
      // console.log(this.progressoService.status)
      // console.log(this.progressoService.estado)
      this.progressoPublicacao = 'andamento'

      // calcular a porcentagem de upload:
      this.porcetagemUpload = Math.round((this.progressoService.estado.bytesTransferred/this.progressoService.estado.totalBytes) * 100)

      if (this.progressoService.status === 'concluido'){
        this.progressoPublicacao = 'concluido'
        // emitir um evento do componente parent (home)
        this.atualizarTimeLine.emit()

        continua.next(false)
      }
    })
  }

  preparaImagemUpload(event: Event):void{
    this.imagem = (<HTMLInputElement>event.target).files
  }

}
