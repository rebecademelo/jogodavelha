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

  toastrSucess(msg: string) {
    this.toastr.success(msg, "Vitória");
  }

  toastrWarning(msg: string) {
    this.toastr.warning(msg, "Empate");
  }

  jogar(linha: number, coluna: number) {
    this.jogoService.jogar(linha, coluna);
    this.placarJogX = this.jogoService.getPlacarJogX();
    this.placarJogO = this.jogoService.getPlacarJogO();

    let fim: boolean = false;
    let ganhador: number;

    fim       = this.jogoService.mostrarFinalizacao();
    ganhador  = this.jogoService.mostrarGanhador();
    console.log(fim);
    console.log(ganhador);
    if (fim) {
      switch(ganhador) {
        case ganhador = 1: {
          this.toastrSucess("Jogador X: " + this.jogadorService.jogX.name + " ganhou!");
          break;
        }
        case ganhador = 2: {
          this.toastrSucess("Jogador O: " + this.jogadorService.jogO.name + " ganhou!");
          break;
        }
        case ganhador = 0: {
          this.toastrWarning("O jogo deu velha!");
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
    this.jogoIniciado = true;
    this.jogadorX = this.getJogadorX();
    this.jogadorO = this.getJogadorO();
    this.nomeJogX = this.jogadorX.name;
    this.nomeJogO = this.jogadorO.name;
    this.thumbnailJogX = this.jogadorX.thumbnail["path"] + "." + this.jogadorX.thumbnail["extension"];
    this.thumbnailJogO = this.jogadorO.thumbnail["path"] + "." + this.jogadorO.thumbnail["extension"];
    console.log("thumbnail");
    console.log(this.thumbnailJogX);
    console.log(this.jogadorX);
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
