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

  toastrSucess(msg: string, tipo: string): void {
    this.toastr.success(msg, tipo);
  }

  toastrInfo(msg: string, tipo: string): void {
    this.toastr.info(msg, tipo)
  }

  toastrWarning(msg: string, tipo: string): void {
    this.toastr.warning(msg, tipo);
  }

  jogar(linha: number, coluna: number): void {
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

  getJogadorX(): Jogador {
    return this.jogadorService.jogX;
  }

  getJogadorO(): Jogador {
    return this.jogadorService.jogO;
  }

  iniciarJogo(): void { // inicia o jogo buscando qual é o jogador que irá ser o primeiro(X)
    this.jogadorX = this.getJogadorX();
    this.jogadorO = this.getJogadorO();
    
    if (this.jogadorX === undefined || this.jogadorO === undefined) {
      this.toastrWarning("Escolha os jogadores antes de iniciar a partida!", "Aviso");
    } else {
      this.jogoIniciado = true;
      this.setInicioJogo(this.jogoIniciado);

      this.nomeJogX = this.jogadorX.name;
      this.thumbnailJogX = this.jogadorX.thumbnail["path"] + "." + this.jogadorX.thumbnail["extension"];
      
      this.nomeJogO = this.jogadorO.name;
      this.thumbnailJogO = this.jogadorO.thumbnail["path"] + "." + this.jogadorO.thumbnail["extension"];

      this.pageScrollService.scroll({
        document: this.document,
        scrollTarget: '#tabuleiro'
      });
    }
  }

  setInicioJogo(start: boolean): void {
    this.jogoService.setInicioJogo(start);
  }

  mostrarFinalizacao(): boolean {
    return this.jogoService.mostrarFinalizacao();
  }

  mostrarGanhador(): number {
    return this.jogoService.mostrarGanhador();
  }

  getPlacarJogX(): number{
    return this.jogoService.getPlacarJogX();
  }

  getPlacarJogO(): number {
    return this.jogoService.getPlacarJogO();
  }

  novoJogo(): void {
    this.jogoService.iniciarJogo();
  }
}
