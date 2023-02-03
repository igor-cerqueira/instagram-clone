import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
      // os operadores <=> significa a direção de ida e volta o mesmo de:
      // transition('visivel => escondido', animate('1s ease-in'))
      // o parametro animate espera 3 strings: duração, delay e aceleração
    ])

  ]
})
export class BannerComponent implements OnInit {

  estado: string = 'visivel'

  imagens: Imagem[] = [
    { estado: 'visivel', url: '/assets/banner-acesso/img_1.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_2.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_3.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_4.png' },
    { estado: 'escondido', url: '/assets/banner-acesso/img_5.png' }
  ]

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 3000)
  }

  logicaRotacao(): void {
    // auxilia na exibição da imagem seguinte
    let idx: number

    // ocultar imagem
    for(let i = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido'

        idx = i === 4 ? 0 : i + 1
        break
      }
    }

    // exibir imagem
    this.imagens[idx!].estado = 'visivel'

    setTimeout(() => this.logicaRotacao(), 3000)
  }

}
