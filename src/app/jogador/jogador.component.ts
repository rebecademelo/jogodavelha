import { Component, OnInit } from '@angular/core';
import { JogadorService } from "./jogador.service";
import { Jogador } from '../model/jogador';
import { ToastrService } from 'ngx-toastr';
import { JogoService } from "./../jogo/jogo.service";

@Component({
  selector: 'app-jogador',
  templateUrl: './jogador.component.html',
  styleUrls: ['./jogador.component.css']
})
export class JogadorComponent implements OnInit {
  jog1Selecionado: boolean;
  jog2Selecionado: boolean;
  retornou: boolean;

  constructor(private service: JogadorService, 
              private jogoService: JogoService, 
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.jog1Selecionado  = false;
    this.jog2Selecionado  = false;
  }

  toastrError(msg: string, tipo: string): void {
    // mostra notificação de erro
    this.toastr.error(msg, tipo);
  }

  buscarPersonagem(personagem: string, tipo: number): void {
    // chama o metódo do serviço do jogador que busca o personagem buscado na API da Marvel
    this.service.getNomeJogador(personagem).subscribe(
      data => {
        this.service.jogador = data["data"]["results"]["0"];

        if (this.service.jogador == undefined) {
          this.toastrError("Personagem não encontrado, favor buscar outro.", "Erro");
          return;
        }

        this.setJogadores(this.service.jogador, tipo);

        // verifica se os dois jogadores já foram selecionados para sortear a ordem de jogo
        if (this.service.isJog1 && this.service.isJog2) {
          this.sorteiaOrdem();
        }
      }
    );
  }

  setJogadorX(jogX: Jogador): void {
    this.service.jogX = jogX;
  }
  
  setJogadorO(jogO: Jogador): void {
    this.service.jogO = jogO;
  }

  // seta o prmeiro e o segundo jogador de acordo com o que foi escolhido
  setJogadores(jogador: Jogador, tipo: number): void {
    // verifica se é o primeiro jogador buscado e retorna seu nome e thumbnail
    if (tipo === 1) {
      this.service.jogador1 = jogador;
      this.service.isJog1 = true;//
      this.service.jog1.name = this.service.jogador1.name;
      this.service.jog1.thumbnail = this.service.jogador1.thumbnail;
      this.jog1Selecionado = true;
    }

    // verifica se é o segundo jogador buscado e retorna seu nome e thumbnail
    if (tipo === 2) {
      this.service.jogador2 = jogador;
      this.service.isJog2 = true;//
      this.service.jog2.name = this.service.jogador2.name;
      this.service.jog2.thumbnail = this.service.jogador2.thumbnail;
      this.jog2Selecionado = true;
    }
  }

  // se os dois jogadores já tiverem sido escolhidos sorteia qual será o primeiro(X) e qual será o segundo(O)
  sorteiaOrdem() {
    let picker = Math.floor((Math.random() * 2) + 1);

    if (picker === 1) {
      this.service.jogadorX = this.service.jogador1;
      this.service.jogadorO = this.service.jogador2;
    } else if (picker === 2) {
      this.service.jogadorX = this.service.jogador2;
      this.service.jogadorO = this.service.jogador1;
    }
    
    this.setJogadorX(this.service.jogadorX);
    this.setJogadorO(this.service.jogadorO);
  }

  // verifica se o jogo começou, se sim esconde os campos de busca e os cards com os nomes e thumbnails dos personagens
  jogoIniciado(): boolean {
    return this.jogoService.getInicioJogo();
  }
}
