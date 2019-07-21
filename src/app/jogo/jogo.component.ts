import { Component, OnInit } from '@angular/core';
import { JogoService } from "./jogo.service";
import { JogadorService } from "./../jogador/jogador.service";
import { Jogador } from '../model/jogador';
import { ToastrService } from 'ngx-toastr';

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
              private toastr: ToastrService) { 
                
    this.jogoService    = jogoService;
    this.jogadorService = jogadorService;
    this.toastr         = toastr;
   }

  ngOnInit() {
    this.jogoService.iniciarJogo();
    this.jogoService.zerarPlacar();
    this.placarJogX   = this.jogoService.getPlacarJogX();
    this.placarJogO   = this.jogoService.getPlacarJogO();
    this.jogoIniciado = false;
  }

  toastrSucess(msg: string, tipo: string) {
    this.toastr.success(msg, tipo);
  }

  toastrInfo(msg: string, tipo: string){
    this.toastr.info(msg, tipo)
  }

  toastrWarning(msg: string, tipo: string) {
    this.toastr.warning(msg, tipo);
  }

  jogar(linha: number, coluna: number) {
    this.jogoService.jogar(linha, coluna);
    this.placarJogX = this.jogoService.getPlacarJogX();
    this.placarJogO = this.jogoService.getPlacarJogO();

    let fim: boolean = false;
    let ganhador: number;

    fim       = this.jogoService.mostrarFinalizacao();
    ganhador  = this.jogoService.mostrarGanhador();
    
    if (fim) {
      switch(ganhador) {
        case ganhador = 1: {
          this.toastrSucess("Jogador X: " + this.jogadorService.jogX.name + " ganhou!", "Vitória");
          break;
        }
        case ganhador = 2: {
          this.toastrSucess("Jogador O: " + this.jogadorService.jogO.name + " ganhou!", "Vitória");
          break;
        }
        case ganhador = 0: {
          this.toastrInfo("A partida deu velha!", "Empate");
          break;
        }
      }
    }
  }

  mostrarX(linha: number, coluna: number): boolean {
    return this.jogoService.mostrarX(linha, coluna);
  }

  mostrarO(linha: number, coluna: number): boolean {
    return this.jogoService.mostrarO(linha, coluna);
  }

  getJogadorX() {
    return this.jogadorService.jogX;
  }

  getJogadorO() {
    return this.jogadorService.jogO;
  }

  iniciarJogo() { // inicia o jogo buscando qual é o jogador que irá ser o primeiro(X)
    this.jogadorX = this.getJogadorX();
    this.jogadorO = this.getJogadorO();
    
    if (this.jogadorX === undefined || this.jogadorO === undefined) {
      this.toastrWarning("Escolha os jogadores antes de iniciar a partida!", "Aviso");
    } else {
      this.jogoIniciado = true;

      this.nomeJogX = this.jogadorX.name;
      this.thumbnailJogX = this.jogadorX.thumbnail["path"] + "." + this.jogadorX.thumbnail["extension"];
      
      this.nomeJogO = this.jogadorO.name;
      this.thumbnailJogO = this.jogadorO.thumbnail["path"] + "." + this.jogadorO.thumbnail["extension"];
    }
  }

  mostrarFinalizacao() {
    return this.jogoService.mostrarFinalizacao();
  }

  mostrarGanhador() {
    return this.jogoService.mostrarGanhador();
  }

  getPlacarJogX() {
    return this.jogoService.getPlacarJogX();
  }

  getPlacarJogO() {
    return this.jogoService.getPlacarJogO();
  }

  novoJogo() {
    this.jogoService.iniciarJogo();
  }
}
