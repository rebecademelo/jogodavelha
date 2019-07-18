import { Component, OnInit } from '@angular/core';
import { JogoService } from "./jogo.service";
import { JogadorService } from "./../jogador/jogador.service";
import { Jogador } from '../model/jogador';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {
  jogadorX: Jogador;

  constructor(private jogoService: JogoService, private jogadorService: JogadorService) { 
    this.jogoService    = jogoService;
    this.jogadorService = jogadorService;
   }

  ngOnInit() {
    this.jogoService.iniciarJogo();
    this.jogoService.zerarPlacar();
  }

  jogar(linha: number, coluna: number) {
    this.jogoService.jogar(linha, coluna);
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

  buscarPersonagem() {
    this.jogadorX = this.getJogadorX();
    console.log(this.jogadorX);
  }

  mostrarFinalizacao() {
    return this.jogoService.mostrarFinalizacao();
  }

  novoJogo() {
    this.jogoService.iniciarJogo();
  }
}
