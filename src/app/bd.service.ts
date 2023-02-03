import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  constructor(private progressoService: ProgressoService) { }

  publicar(publicacao:any): void {

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
      .push( { legenda: publicacao.legenda } )
      .then((resposta: any) => {
        let nomeImagem = resposta.key
        firebase.storage().ref()
          .child(`imagens/${nomeImagem}`)
          .put(publicacao.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            // acompanhamento do progresso de upload
            (snapshot: any) => {
              this.progressoService.status = 'em andamento'
              this.progressoService.estado! = snapshot
              // console.log('snapshot do on(): ', snapshot)
            },
            (error) => {
              this.progressoService.status = 'erro'
              // console.log(error)
            },
            () => {
              // finalização do processo
              this.progressoService.status = 'concluido'
              // console.log('upload completo')
            }

          )
      })
  }

  consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // consultar a publicacao (database)
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val())

          let publicacoes: Array<any> = []

          snapshot.forEach((childSnapshot: any) => {

            let publicacao  = childSnapshot.val()
            publicacao.key = childSnapshot.key

            publicacoes.push(publicacao)
          })

          // console.log(publicacoes)
          // resolve(publicacoes)

          return publicacoes.reverse()
        })
        .then((publicacoes: any) => {

          publicacoes.forEach((publicacao: any) => {

            // consultar a url da imagem (storage)
            firebase.storage().ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {

                  publicacao.url_imagem = url

                  // consultar o nome do usuario
                  firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                    .once('value')
                    .then((snapshot:any) => {

                      publicacao.nome_usuario = snapshot.val().nome_usuario

                    })
              })
          })

          resolve(publicacoes)
        });
    })

  }
}


