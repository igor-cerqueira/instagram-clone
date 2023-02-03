import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  token_id!: any

  constructor(
    private router: Router
  ) { }

  cadastrarUsuario(usuario: Usuario): Promise<any> {
    // console.log('chegou no servico', usuario)
    let removerSenha

    return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha!)
      .then((resposta: any) => {

        // remover a senha do atributo do objeto usuário
        // delete usuario.senha
        removerSenha = delete usuario.senha


        // registrando dados complemtnares do usuário na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
        .set( usuario )


      })
      .catch((error: Error) => {
        console.log(error)
      })
  }
  autenticar(email: string, senha: string):void {

    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((resposta: any) => {
        firebase.auth().currentUser?.getIdToken()
          .then((idToken: string) => {
            this.token_id = idToken
            localStorage.setItem('idToken', idToken)
            this.router.navigate(['/home'])
          })
      })
      .catch((error: Error) => console.log())
  }

  autenticado(): boolean{

    if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
      this.token_id = localStorage.getItem('idToken')
    }

    if(this.token_id === undefined){
      this.router.navigate([''])
    }

    // lógica que eu tinha utilizado para redirecionar a página de login
    // if(localStorage.getItem('idToken') === null){
    //   this.router.navigate([''])
    // }

    return this.token_id !== undefined
    // utilizando o retorno dessa forma o interpretador do js entende que o que deve ser retornado é o valor lógico da expressão, não a expressão
  }

  sair(): void {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('idToken')
        this.token_id = undefined
      })
  }

}
