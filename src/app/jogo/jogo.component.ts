import { Component, OnInit, Inject } from '@angular/core';
import { JogoService } from "./jogo.service";
import { JogadorService } from "./../jogador/jogador.service";
import { Jogador } from '../model/jogador';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from "@angular/common";
import { PageScrollService } from "ngx-page-scroll-core";

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogadorX: Jogador;
  jogadorO: Jogador;
  nomeJogX: string;
  nomeJogO: string;
  thumbnailJogX: string;
  thumbnailJogO: string;
  placarJogX: number;
  placarJogO: number;
  jogoIniciado: boolean;

  constructor(private jogoService: JogoService, 
              private jogadorService: JogadorService, 
              private toastr: ToastrService,
              private pageScrollService: PageScrollService,
              @Inject (DOCUMENT) private document: any) { 
              
  }

  ngOnInit() {
    this.jogoService.iniciarJogo();
    this.jogoService.zerarPlacar();
    this.placarJogX   = this.jogoService.getPlacarJogX();
    this.placarJogO   = this.jogoService.getPlacarJogO();
    this.jogoIniciado = false;
  }

  toastrSucess(msg: string, tipo: string): void {
    // mostra notificação de sucesso
    this.toastr.success(msg, tipo);
  }

  toastrInfo(msg: string, tipo: string): void {
    // mostra notificação de informação
    this.toastr.info(msg, tipo)
  }

  toastrWarning(msg: string, tipo: string): void {
    // mostra notificação de aviso
    this.toastr.warning(msg, tipo);
  }

  // inicia o jogo buscando qual é o jogador que irá ser o primeiro(X)
  iniciarJogo(): void {
    this.jogadorX = this.jogadorService.jogX;
    this.jogadorO = this.jogadorService.jogO;
    
    // valida se ambos os jogadores foram escolhidos antes de iniciar o jogo
    if (this.jogadorX == undefined || this.jogadorO == undefined) {
      this.toastrWarning("Escolha os jogadores antes de iniciar a partida!", "Aviso");
    } else {
      this.jogoIniciado = true;
      this.setInicioJogo(this.jogoIniciado);

      this.nomeJogX = this.jogadorX.name;
      this.thumbnailJogX = this.jogadorX.thumbnail["path"] + "." + this.jogadorX.thumbnail["extension"];
      
      this.nomeJogO = this.jogadorO.name;
      this.thumbnailJogO = this.jogadorO.thumbnail["path"] + "." + this.jogadorO.thumbnail["extension"];

      // animação que leva os jogadores até o tabuleiro quando iniciado o jogo
      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: '#tabuleiro'
      });
    }
  }

  // seta o jogo como iniciado para esconder os campos de busca dos personagens e cards
  setInicioJogo(start: boolean): void {
    this.jogoService.setInicioJogo(start);
  }

  jogar(linha: number, coluna: number): void {
    // chama o método do serviço do jogo realizando a jogada atual
    this.jogoService.jogar(linha, coluna);

    // retorna o placar para cada jogador
    this.placarJogX = this.jogoService.getPlacarJogX();
    this.placarJogO = this.jogoService.getPlacarJogO();
    
    this.mostrarGanhador();
  }

  // mostra o X na célula selecionada se o jogador da vez for o X
  mostrarX(linha: number, coluna: number): boolean {
    return this.jogoService.mostrarX(linha, coluna);
  }

  // mostra o O na célula selecionada se o jogador da vez for o O
  mostrarO(linha: number, coluna: number): boolean {
    return this.jogoService.mostrarO(linha, coluna);
  }
  
  // verifica se a partida foi finalizada e se sim desabilita o tabuleiro e mostra o botão para iniciar um novo jogo
  mostrarFinalizacao(): boolean {
    return this.jogoService.mostrarFinalizacao();
  }

  // verifica se a partida acabou e se teve um ganhador ou se o jogo deu velha
  mostrarGanhador(): void {
    let fim: boolean = false;
    let ganhador: number;

    fim       = this.jogoService.mostrarFinalizacao();
    ganhador  = this.jogoService.mostrarGanhador();
    
    if (fim) {
      switch(ganhador) {
        case 0: {
          this.toastrInfo("A partida deu velha!", "Empate");
          break;
        }
        case 1: {
          this.toastrSucess("Jogador X: " + this.jogadorService.jogX.name + " ganhou!", "Vitória");
          break;
        }
        case 2: {
          this.toastrSucess("Jogador O: " + this.jogadorService.jogO.name + " ganhou!", "Vitória");
          break;
        }
      }
    }
  }

  novoJogo(): void {
    this.jogoService.iniciarJogo();
  }
}
